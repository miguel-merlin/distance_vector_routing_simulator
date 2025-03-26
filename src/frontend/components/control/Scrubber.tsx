import { useState } from "react"

export default function Scrubber() {
    const [isPlaying, setPlaying] = useState<boolean>(false);

    return (
        <div className="flex justify-center gap-2">
            <button>⏪</button>
            <button onClick={() => setPlaying(!isPlaying)}>
                { isPlaying ? "⏸" : "⏵" }
            </button>
            <button>⏩</button>
        </div>
    )
}