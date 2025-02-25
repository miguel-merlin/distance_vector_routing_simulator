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
  printNetworkRoutingTables() {
    for (const node of this.nodes.values()) {
      node.printRoutingTable();
      console.log("--------------------------");
    }
  }
}

export default Network;

const network = new Network();

// Create nodes
network.addNode("A");
network.addNode("B");
network.addNode("C");
network.addNode("D");

// Create bidirectional links between nodes (node1, node2, cost)
network.addLink("A", "B", 1);
network.addLink("A", "C", 4);
network.addLink("B", "C", 2);
network.addLink("B", "D", 7);
network.addLink("C", "D", 1);

// Run the distance vector algorithm to update routing tables until convergence
network.runDistanceVectorRouting();

// Print out the final routing tables
network.printNetworkRoutingTables();
