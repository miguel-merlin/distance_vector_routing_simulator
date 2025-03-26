import { Simulator } from "./frontend/Simulator"
import ControlUI from "./frontend/ControlUI"
function App() {
  return (
    <div className="flex border-2 w-[750px]">
      <div className="border-r-2">
        <Simulator/>
      </div>
      <div className="w-[250px] h-[500px]">
        <ControlUI/>
      </div>
    </div>
  )
}

export default App
