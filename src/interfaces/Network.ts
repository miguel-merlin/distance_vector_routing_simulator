import Node from "./Node";

class Network {
  nodes: Map<string, Node>;
  constructor() {
    this.nodes = new Map();
  }

  addNode(id: string): Node {
    const node = new Node(id);
    this.nodes.set(id, node);
    return node;
  }

  addLink(nodeAId: string, nodeBId: string, cost: number) {
    const nodeA = this.nodes.get(nodeAId);
    const nodeB = this.nodes.get(nodeBId);
    if (!nodeA || !nodeB) {
      throw new Error("Node not found");
    }
    nodeA.addNeighbor(nodeBId, cost);
    nodeB.addNeighbor(nodeAId, cost);
  }

  runDistanceVectorRouting() {
    let updated = true;
    while (updated) {
      updated = false;
      for (const node of this.nodes.values()) {
        for (const neighborId of node.neighbors.keys()) {
          const neighbor = this.nodes.get(neighborId);
          if (neighbor) {
            if (node.updateRoutingTable(neighbor)) {
              updated = true;
            }
          }
        }
      }
    }
  }

  getShortestPath(
    sourceId: string,
    destinationId: string
  ): { path: string[]; cost: number } | null {
    const sourceNode = this.nodes.get(sourceId);
    if (!sourceNode) {
      console.error(`Source node ${sourceId} not found.`);
      return null;
    }
    const destEntry = sourceNode.routingTable.get(destinationId);
    if (!destEntry) {
      console.error(`No route from ${sourceId} to ${destinationId}.`);
      return null;
    }

    let path: string[] = [sourceId];
    let current = sourceId;
    const maxHops = this.nodes.size;
    let hops = 0;

    while (current !== destinationId && hops < maxHops) {
      const currentNode = this.nodes.get(current);
      if (!currentNode) break;
      const tableEntry = currentNode.routingTable.get(destinationId);
      if (!tableEntry || !tableEntry.nextHop) {
        console.error(`Incomplete route from ${current} to ${destinationId}.`);
        return null;
      }
      current = tableEntry.nextHop;
      path.push(current);
      hops++;
    }

    if (path[path.length - 1] !== destinationId) {
      console.error(
        `Failed to construct a complete route from ${sourceId} to ${destinationId}.`
      );
      return null;
    }

    return { path, cost: destEntry.cost };
  }

  printNetworkRoutingTables() {
    for (const node of this.nodes.values()) {
      node.printRoutingTable();
      console.log("--------------------------");
    }
  }
}

export default Network;

const network = new Network();

network.addNode("A");
network.addNode("B");
network.addNode("C");
network.addNode("D");

network.addLink("A", "B", 1);
network.addLink("A", "C", 4);
network.addLink("B", "C", 2);
network.addLink("B", "D", 7);
network.addLink("C", "D", 1);

network.runDistanceVectorRouting();
network.printNetworkRoutingTables();

const source = "A";
const destination = "D";
const result = network.getShortestPath(source, destination);
if (result) {
  console.log(
    `Shortest path from ${source} to ${destination}: ${result.path.join(
      " -> "
    )} with total cost ${result.cost}`
  );
} else {
  console.log(`No path found from ${source} to ${destination}.`);
}
