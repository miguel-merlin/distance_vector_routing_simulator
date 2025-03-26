import { Simulator } from "./frontend/Simulator"
import ControlUI from "./frontend/ControlUI"
function App() {
  return (
    <div className="w-screen h-screen grid content-center place-content-center">
      <div className="flex border-2 w-[750px] h-min">
        <div className="border-r-2">
          <Simulator/>
        </div>
        <div className="w-[250px] h-[500px]">
          <ControlUI/>
        </div>
      </div>
    </div>
  )
}

export default App
