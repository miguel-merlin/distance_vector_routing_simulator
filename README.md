# Distance Vector Routing Simulator

**This project requires Node.js to run with the NPM package manager (bundled with Node.js)
Downloads for these are found on their official website [https://nodejs.org/en](https://nodejs.org/en).**

Install all the dependencies
```bash
npm install
```
Run the application
```bash
npm run dev
```

Running the sample Distance Vector Routing Algorithm
```bash
npx tsx src/interfaces/Network.ts
```

# AUTHORS

Nathaniel Andre Escaro | [Github](https://github.com/butterman0423)

Miguel Merlin | [Github](https://github.com/miguel-merlin)



Repository can be found at [https://github.com/miguel-merlin/distance_vector_routing_simulator](https://github.com/miguel-merlin/distance_vector_routing_simulator)

# Using the Simulator

## Running the Simulator

On the top right of the control panel, a "play" button is there. Pressing it will run the simulator, and packets will be seen flowing through the network. 
Pressing it again will pause the simulator and all the packets will stay in place.

*It may take some time for packets to spawn and move depending on how you configured your Emitters*

For adding components, click the corresponding button on the right panel titled "Add X" where X is the component you want to add. Then, fill out the fields listed and press the submit button.
The component will then appear on the screen assuming all values provided are valid.

## Simulator Components

Our simulator provides three components for building your custom network:
- **Node** - Acts as a router; An intermediate checkpoint for packets to travel to.
  - Required Parameters:
    - Name: String representing what to call it.
    - Position\*: Where to place it in the simulator.
- **Edge** - Acts as links connecting routers and edge devices; Connects components together with some "weight".
  - Required Parameters:
    - Head Id\*: The first component to connect.
    - Tail Id\*: The second component to connect.
    - Weight: Integer representing the *cost* of the link, needed for DVA routing.
- **Emitter** - Acts as an edge device; Sends/Recieves packets from specified targets in the simulator.
  - Required Parameters:
    - Name: String representing what to call it.
    - Position\*: Where to place it in the simulator.
    - Spawn Rate: Integer representing how often packets are generated and sent from this component.
      - Larger number means more infrequent
    - Targets\*: Where to send packets to
      - If no targets are specified (empty textbox), the Emitter will randomly send packets to any Emitter in the simulator
      - If "\[\]" is provided, the Emitter will send no packets.
      - Otherwise, the Emitter will randomly select packets to all targets specified in the comma seperated list.

\*For convience, tooltips are provided below these fields that automatically fill it with values whenever you click anywhere on the simulator (i.e on a component, or somewhere on the screen)

## Additional Features

Apart from adding components, you can also delete them by pressing the corresponding button on the right panel and selecting the ID of the component to delete.
Deleting Nodes or Emitters will remove any connected Edges as well. Packets currently on an Edge will also be deleted if the Edge is also deleted.

Forwarding and Adjacency Tables are found right below the simulator. This information will update whenever updates are made to the simulator (addition/deletion of components).
