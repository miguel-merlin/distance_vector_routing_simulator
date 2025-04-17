import { Entity } from "+/util/entity";
import { Vector2d } from "konva/lib/types";

const CLICK_EVENT_ID = "SIM_CLICK"

export class ClickRecord {
    private _clickEvent: CustomEvent
    private _cancelController: AbortController
    target: Entity | null
    pos: Vector2d | null

    constructor() {
        this._clickEvent = new CustomEvent(CLICK_EVENT_ID)
        this._cancelController = new AbortController()

        this.target = null
        this.pos = null
    }

    getPosition(): Vector2d | null {
        return this.pos
    }

    getTarget(): Entity | null {
        return this.target
    }

    setPosition(pos: Vector2d) {
        this.pos = pos
    }

    setTarget(ent: Entity) {
        this.target = ent
        
    }

    fireUpdate() {
        dispatchEvent(this._clickEvent)
    }

    cancel() {
        this._cancelController.abort()
    }

    async waitForUpdate() : Promise<{ target: Entity | null, pos: Vector2d | null }> {
        return new Promise((resolve, reject) => {
            const cleanupController = new AbortController()
            const canceled = this._cancelController.signal
            const cleanup = cleanupController.signal

            const finished = AbortSignal.any([canceled, cleanup])

            addEventListener(CLICK_EVENT_ID, () => {
                cleanupController.abort()
                resolve({ target: this.target, pos: this.pos })
            }, { signal: finished })

            canceled.addEventListener("abort", () => {
                cleanupController.abort()
                reject("Canceled by user")
            }, { signal: finished })
        })
    }
}