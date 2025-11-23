export const DataReducer = (state, action) => {
    switch (action.type) {
        case "LOAD_DATA":
            return {
                ...state,
                games: action.payload.games,
                tags: action.payload.tags,
                graph: action.payload.graph,
                loadingData: false
            };

        case "UPDATE_STACK":
            return {
                ...state,
                stack: action.payload
            };

        default:
            return state;
    }
};
