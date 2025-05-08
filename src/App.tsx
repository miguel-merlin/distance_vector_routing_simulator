import { Simulator } from "@/Simulator"
import ControlUI from "@/ControlUI"
import { useState } from "react"
import { Entity, EntityMap } from "+/util/entity"
import { NodeEntity } from "@/components/entity/Node"
import { EmitterEntity } from "@/components/entity/Emitter"
import { EdgeEntity } from "@/components/entity/Edge"
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
  const envState = useState<EntityMap>(new Map([
    ["A", Entity.of<EmitterEntity>({type: "ET_EMIT", id: "A", name: "A", x: 50, y: 50, size: 50, spawnRate: 5})],
    ["B", Entity.of<EmitterEntity>({type: "ET_EMIT", id: "B", name: "B", x: 400, y: 400, size: 50, spawnRate: 5, disabled: true})],
    ["R1", Entity.of<NodeEntity>({type: "ET_NODE", id: "R1", name: "R1", x: 150, y: 250, size: 25})],
    ["e1", Entity.of<EdgeEntity>({type: "ET_EDGE", id: "e1", name: "e1", head: "A", tail: "R1", weight: 2})],
    ["e2", Entity.of<EdgeEntity>({type: "ET_EDGE", id: "e1", name: "e1", head: "R1", tail: "B", weight: 6})]
  ]))
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
