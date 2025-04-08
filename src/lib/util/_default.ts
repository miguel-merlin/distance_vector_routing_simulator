import { Util } from "konva/lib/Util";
import { ET, ATR } from "./typings";
import { ColorAttr } from "./attributes";
import { BaseEntity, Entity } from "./entity";

type Value = string | number | undefined
type Resolver = Value | ((e: Entity) => Value)
type DefaultMap = Record<string, Resolver>

const attrMaps: Record<ET, ATR[]> = {
    ET_NODE: ["ATR_COLOR", "ATR_LABEL"],
    ET_EDGE: ["ATR_COLOR"],
    ET_EMIT: ["ATR_COLOR", "ATR_LABEL"]
}

const defaultResolvers: Record<ATR, DefaultMap> = {
    ATR_COLOR: {
        fillClr: (e: Entity) => e.is("ET_EMIT") ? Util.getRandomColor() : "lightgrey",
        strokeClr: 'black',
        highlightClr: (e: Entity) => e.is("ET_EDGE") || e.is("ET_NODE") ? "yellow" : (e.getAttr<ColorAttr>().fillClr),
        labelClr: 'black'
    },
    ATR_LABEL: {
        label: (e: Entity) => (e.getAs<BaseEntity>()).name,
        fontSize: 16,
        fontFamily: undefined
    },
    ATR_POSITION: {},
    ATR_SHAPE: {}
}

export function fillWithDefaults(e: Entity, ty: ET) : Entity {
    const attrs = attrMaps[ty];
    const ent: Record<string, Value> = e.ent as Record<string, Value>

    for(const atr of attrs) {
        const resolvers = defaultResolvers[atr]

        for(const k in resolvers) {
            if(k in ent) continue;

            const resolver = resolvers[k];
            if(typeof resolver === "function") {
                ent[k] = resolver(e)
            }
            else {
                ent[k] = resolver
            }
        }
    }

    e.ent = ent;
    return e
}