import { ReactNode } from "react"

export interface PanelWrapperProps {
    children?: ReactNode | ReactNode[]
}

export default function PanelWrapper({children}: PanelWrapperProps) {
    return (
        <form className="w-full h-full flex flex-col gap-y-2 p-5">
            { children }
            <button>Submit</button>
        </form>
    )
}