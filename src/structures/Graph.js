export class Graph {
    constructor() {
        this.nodes = new Set();
        this.adj = {};
    }

    addNode(node) {
        this.nodes.add(node);
        if (!this.adj[node]) this.adj[node] = new Set();
    }

    addEdge(a, b) {
        this.addNode(a);
        this.addNode(b);
        this.adj[a].add(b);
        this.adj[b].add(a);
    }

    getNeighbors(node) {
        return this.adj[node] ? Array.from(this.adj[node]) : [];
    }
}
