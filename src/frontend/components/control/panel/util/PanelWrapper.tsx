import { ReactNode } from "react"

export interface PanelWrapperProps {
    children?: ReactNode | ReactNode[]
}

export default function PanelWrapper({children}: PanelWrapperProps) {
    return (
        <form>
            { children }
            <button>Submit</button>
        </form>
    )
}