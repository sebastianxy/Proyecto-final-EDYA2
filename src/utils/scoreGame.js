import { normalizeText } from "./normalizeText";

export const scoreGame = ({
    game,
    query,
    selectedTags,
    graphBonus = 0,
}) => {
    let score = 0;

    const q = normalizeText(query || "");
    const name = normalizeText(game.name || "");
    const desc = normalizeText(game.description || "");

    if (q.length > 0) {
        const words = q.split(/\s+/).filter(Boolean);
        words.forEach((w) => {
            if (name.includes(w)) score += 4;
            if (desc.includes(w)) score += 2;
        });
    }

    if (selectedTags?.length) {
        const overlap = selectedTags.filter((t) => game.tags.includes(t)).length;
        score += overlap * 6;
    }

    score += graphBonus;


    if (typeof game.rating === "number") {
        score += game.rating * 0.3;
    }

    return score;
};
