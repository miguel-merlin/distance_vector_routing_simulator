import { useState } from "react"

export default function Scrubber() {
    const [isPlaying, setPlaying] = useState<boolean>(false);

    return (
        <div>
            <button>Step Back</button>
            <button onClick={() => setPlaying(!isPlaying)}>
                { isPlaying ? "Pause" : "Play" }
            </button>
            <button>Step Forward</button>
        </div>
    )
}