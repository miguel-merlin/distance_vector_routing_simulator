interface RoutingTableEntry {
  cost: number;
  nextHop: string | null;
}

export default RoutingTableEntry;
