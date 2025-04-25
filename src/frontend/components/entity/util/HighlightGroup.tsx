import LineHighlight, { LineHighlightProps } from "./highlight/LineHighlight"
import CircleHighlight, { CircleHighlightProps } from "./highlight/CircleHighlight"
import RectHighlight, { RectHighlightProps } from "./highlight/RectHighlight"
import { useContext, useState } from "react"
import { Group } from "react-konva"
import { Entity } from "+/util/entity"
import { ClickContext } from "+/util/contexts"

export interface HighlightConfigProps {
    color: string
}

export interface VisiblityControl {
    visible: boolean
}

type HighlightStyleProps =
    LineHighlightProps | CircleHighlightProps | RectHighlightProps


function getHighlight(props: HighlightStyleProps, visible: boolean) {
    switch(props.type) {
        case "ET_NODE": 
            return <CircleHighlight {...props as CircleHighlightProps} visible={visible}/>
        case "ET_EDGE":
            return <LineHighlight {...props as LineHighlightProps} visible={visible}/>
        case "ET_EMIT":
            return <RectHighlight {...props as RectHighlightProps} visible={visible}/>
    }
}

export interface HighlightProps {
    for: Entity
    style: HighlightStyleProps
    x?: number,
    y?: number
    children?: React.ReactNode | React.ReactNode[]
}

export default function HighlightGroup({ for: ent, style, x, y, children}: HighlightProps) {
    const [hovered, setHovered] = useState(false)
    const record = useContext(ClickContext)

    return (
        <Group x={x} y={y}
            onMouseEnter={() => setHovered(true)} 
            onMouseLeave={() => setHovered(false)}
            onMouseUp={() => record.setTarget(ent)} >
            { getHighlight(style, hovered) }
            { children }
        </Group>
    )
}