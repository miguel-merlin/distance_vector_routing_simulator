import { Simulator } from "./frontend/Simulator"
import ControlUI from "./frontend/ControlUI"
import { useState } from "react"
import { EntityMap } from "./frontend/util/entity"

function App() {
  const envState = useState<EntityMap>(new Map())  
  const [entMap] = envState

  return (
    <div className="w-screen h-screen grid content-center place-content-center">
      <div className="flex border-2 w-[750px] h-min">
        <div className="border-r-2">
          <Simulator env={entMap}/>
        </div>
        <div className="w-[250px] h-[500px]">
          <ControlUI envState={envState}/>
        </div>
      </div>
    </div>
  )
}

export default App
