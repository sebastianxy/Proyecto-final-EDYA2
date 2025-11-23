import { Graph } from "../structures/Graph";


export const buildGameGraph = (games) => {
    const graph = new Graph();
    games.forEach((g) => {
        g.tags?.forEach((t) => {
            graph.addEdge(g.id, t);
        });
    });
    return graph;
};
