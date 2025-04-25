import { uid } from "+/util/entity"

export interface Packet {
    id: uid
    source: uid
    dest: uid
    at: uid
    jumps: uid[]
}

export class PacketController {
    packets: Map<uid, Packet>

    constructor() {
        this.packets = new Map()
    }

    map<T>(f: (p: Packet, idx: number) => T) : T[] {
        const mapped: T[] = []
        let i = 0

        for(const p of this.packets.values()) {
            mapped.push(f(p, i++))
        }
        return mapped
    }

    getPackets() {
        return Array(...this.packets.values())
    }

    pushPacket(id: uid, p: Packet) {
        this.packets.set(id, p)
    }

    popPacket(id: uid) {
        this.packets.delete(id)
    }

    updatePacket(id: uid, p: Partial<Packet>) {
        const old = this.packets.get(id)
        if(old) {
            this.packets.set(id, { ...old, ...p })
            return
        }
        console.warn(`Attempt to update nonexistent packet ${id}`)
    }
}