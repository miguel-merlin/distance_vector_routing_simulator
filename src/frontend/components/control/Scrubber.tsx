import { RStateHook } from "+/util/react-aliases";

export interface ScrubberProps {
    pausedState: RStateHook<boolean>
}

export default function Scrubber({ pausedState }: ScrubberProps) {
    const [paused, setPaused] = pausedState;

    return (
        <div className="flex justify-center gap-2">
            <button onClick={() => setPaused(!paused)}>
                { paused ? "⏵" : "⏸" }
            </button>
        </div>
    )
}