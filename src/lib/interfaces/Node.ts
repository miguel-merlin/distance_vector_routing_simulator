import RoutingTableEntry from "./RoutingTableEntry";

class Node {
  id: string;
  neighbors: Map<string, number>;
  routingTable: Map<string, RoutingTableEntry>;

  constructor(id: string) {
    this.id = id;
    this.neighbors = new Map();
    this.routingTable = new Map();
    this.routingTable.set(id, { cost: 0, nextHop: null });
  }

  addNeighbor(neighborId: string, cost: number) {
    this.neighbors.set(neighborId, cost);
    this.routingTable.set(neighborId, { cost, nextHop: neighborId });
  }

  updateRoutingTable(neighbor: Node): boolean {
    let updated = false;
    const costToNeighbor = this.neighbors.get(neighbor.id);
    if (costToNeighbor === undefined) return false;

    for (const [dest, entry] of neighbor.routingTable.entries()) {
      if (dest === this.id) continue;
      const newCost = costToNeighbor + entry.cost;
      const currentEntry = this.routingTable.get(dest);
      if (!currentEntry || newCost < currentEntry.cost) {
        this.routingTable.set(dest, { cost: newCost, nextHop: neighbor.id });
        updated = true;
      }
    }
    return updated;
  }

  printRoutingTable() {
    const msg = []

    console.log(`Routing table for ${this.id}:`);
    msg.push(`Routing table for ${this.id}:`)

    for (const [dest, entry] of this.routingTable.entries()) {
      console.log(
        `  Destination: ${dest}, Cost: ${entry.cost}, Next Hop: ${entry.nextHop}`
      );
      msg.push(`  Destination: ${dest}, Cost: ${entry.cost}, Next Hop: ${entry.nextHop}`)
    }

    return msg.join("\n")
  }
}

export default Node;
