import { Group, Rect } from "react-konva"
import { ET_EMIT } from "+/util/typings"
import { HighlightConfigProps, VisiblityControl } from "../HighlightGroup"

export interface RectHighlightProps extends HighlightConfigProps {
    type: ET_EMIT
    size: number
}

export default function RectHighlight({ size, color, visible }: RectHighlightProps & VisiblityControl) {
    const scaled = size + 10
    return (
        <Group offsetX={size/2} offsetY={size/2}>
            <Rect fill={color} width={scaled} height={scaled} 
                strokeEnabled={false} visible={visible}
                offsetX={5} offsetY={5}/>
        </Group>
    )
}