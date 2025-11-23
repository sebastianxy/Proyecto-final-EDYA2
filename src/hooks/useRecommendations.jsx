import { useMemo } from "react";
import { scoreGame } from "../utils/scoreGame";
import { normalizeText } from "../utils/normalizeText";
import { filterByTags } from "../utils/filterByTags";

export const useRecommendations = ({ games, graph, query, selectedTags }) => {
    return useMemo(() => {
        if (!games?.length) return [];

        const q = normalizeText(query || "");

        const baseFiltered = filterByTags(games, selectedTags);

        const graphBonusMap = {};
        if (graph && selectedTags?.length) {
            selectedTags.forEach((tag) => {
                const neighbors = graph.getNeighbors(tag); // devuelve ids de juegos conectados
                neighbors.forEach((gameId) => {
                    graphBonusMap[gameId] = (graphBonusMap[gameId] || 0) + 5;
                });
            });
        }

        const scored = baseFiltered
            .map((game) => ({
                ...game,
                _score: scoreGame({
                    game,
                    query: q,
                    selectedTags,
                    graphBonus: graphBonusMap[game.id] || 0,
                }),
            }))
            .filter((g) => (q ? g._score > 0 : true))
            .sort((a, b) => b._score - a._score);

        return scored;
    }, [games, graph, query, selectedTags]);
};
