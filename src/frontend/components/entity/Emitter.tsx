import { BaseAttr, ColorAttr, LabelAttr, PositionAttr, ShapeAttr } from "+/util/attributes";
import { BaseEntity, EntityNetwork, EntityProp } from "+/util/entity";
import { Rect } from "react-konva";
import Label from "./util/Label";
import HighlightGroup from "./util/HighlightGroup";
import { useContext, useMemo } from "react";
import { ET_EMIT } from "+/util/typings";
import { EntityContext, PacketContext, TimeContext } from "+/util/contexts";

export interface EmitterAttr extends BaseAttr {
    type: ET_EMIT
    spawnRate: number
    disabled?: boolean
}

export type EmitterEntity = BaseEntity
    & EmitterAttr
    & PositionAttr
    & ShapeAttr
    & ColorAttr
    & LabelAttr

export default function Emitter({ ent, network }: EntityProp & EntityNetwork) {
    const t = useContext(TimeContext)
    const env = useContext(EntityContext)
    const packetController = useContext(PacketContext)
    const targets = useMemo(() => {
        const nodelike = []
        const id = ent.getAs().id
        for(const e of env.values()) {
            const eid = e.getAs().id
            if(eid != id && e.is("ET_EMIT"))
                nodelike.push(eid)
        }
        return nodelike
    }, [env])

    const { spawnRate, disabled, id } = ent.getAs<EmitterEntity>()
    const { x, y } = ent.getAttr<PositionAttr>()
    const { size } = ent.getAttrReq<ShapeAttr>()
    const { fillClr, highlightClr, strokeClr, labelClr } = ent.getAttrReq<ColorAttr>()
    const { label, fontFamily, fontSize } = ent.getAttrReq<LabelAttr>()

    if(!disabled && targets.length >= 1 && t % spawnRate === 0) {
        const destId = targets[Math.floor(Math.random() * targets.length)]
        console.log(`${t}: Emitter ${id} picked destination ${destId}`)
        const path = network.getShortestPath(id, destId)

        if(path) {
            const pid = `PACKET_${id}-${destId}:${Date.now()}`
            const jumps = path.path
            jumps.shift()

            packetController.pushPacket(pid, {
                id: pid,
                source: id,
                dest: destId,
                at: id,
                jumps: jumps
            })
        }
    }

    return (
        <HighlightGroup for={ent} x={x} y={y} style={{ type: "ET_EMIT", color: highlightClr, size: size }}>
            <Rect offsetX={size/2} offsetY={size/2} 
                fill={fillClr} stroke={strokeClr} strokeEnabled
                width={size} height={size}/>
            <Label label={label} color={labelClr} fontFamily={fontFamily} fontSize={fontSize}/>
        </HighlightGroup>
    )
}