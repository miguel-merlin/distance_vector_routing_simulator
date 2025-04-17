import { Entity } from "+/util/entity";
import { Vector2d } from "konva/lib/types";

const CLICK_EVENT_ID = "SIM_CLICK"

export class ClickRecord {
    private _clickEvent: Event
    target: Entity | null
    pos: Vector2d | null

    constructor() {
        this._clickEvent = new Event(CLICK_EVENT_ID)
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

    waitForUpdate() : [Promise<ClickRecord>, AbortController] {
        const thisRef = this
        const cancelController = new AbortController()
        return [
            new Promise((resolve, reject) => {
                const cleanupController = new AbortController()
                const finished = AbortSignal.any([cancelController.signal, cancelController.signal])

                addEventListener(CLICK_EVENT_ID, () => {
                    cleanupController.abort()
                    resolve(thisRef)
                }, { signal: finished })
    
                cancelController.signal.addEventListener("abort", () => {
                    cleanupController.abort()
                    reject("Canceled by user")
                }, { signal: finished })
            }),
            cancelController
        ]
    }
}