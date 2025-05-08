import { Simulator } from "@/Simulator"
import ControlUI from "@/ControlUI"
import { useState } from "react"
import { EntityMap } from "+/util/entity"
import Network from "+/interfaces/Network"

function prettyPrint(str: string) {
  const matches = str.match(/\n?.+\n?/g)
  if(!matches) return <></>

  return (
    <div>
      { matches.map((s, idx) => <p key={idx}>{ s }</p>)}
    </div>
  )
}

function App() {
  const envState = useState<EntityMap>(new Map())
  const pausedState = useState<boolean>(true);
  const networkState = useState<Network | null>(null)
  const [entMap] = envState
  const [paused] = pausedState
  const [network] = networkState

  return (
    <div className="w-screen h-screen grid content-center place-content-center">
      <h1 className="text-center text-2xl font-bold mb-2">Distance Vector Algorithm Network Simulator</h1>
      <div className="flex border-2 w-[750px] h-min">
        <div className="border-r-2">
          <Simulator paused={paused} env={entMap} netState={networkState}/>
        </div>
        <div className="w-[250px] h-[500px]">
          <ControlUI envState={envState} pausedState={pausedState}/>
        </div>
      </div>
      <div className="my-10">
        { network ? prettyPrint(network.printNetworkRoutingTables()) : "" }
      </div>
    </div>
  )
}

export default App
