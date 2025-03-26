import { ReactNode } from "react"

export interface PanelWrapperProps {
    children?: ReactNode | ReactNode[]
    onSubmit: React.FormEventHandler<HTMLFormElement>
}

export default function PanelWrapper({children, onSubmit}: PanelWrapperProps) {
    return (
        <form className="w-full h-full flex flex-col gap-y-2 p-5" onSubmit={onSubmit}>
            { children }
            <button>Submit</button>
        </form>
    )
}