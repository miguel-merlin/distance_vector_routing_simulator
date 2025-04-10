import { Entity } from "+/util/entity";
import { Vector2d } from "konva/lib/types";

export class ClickRecord {
    target: Entity | null
    pos: Vector2d | null

    constructor() {
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
}