export const filterByTags = (games, selectedTags) => {
    if (selectedTags.length === 0) return games;
    return games.filter((g) => selectedTags.every((t) => g.tags.includes(t)));
};
