import { createContext, useReducer, useEffect } from "react";
import { DataReducer } from "./DataReducer";
import { db } from "../firebase/db";
import { collection, getDocs } from "firebase/firestore";
import { Stack } from "../structures/Stack";
import { Graph } from "../structures/Graph";

export const DataContext = createContext();

const initialState = {
    games: [],
    tags: [],
    graph: null,
    stack: new Stack(10),
    loadingData: true,
};

export const DataProvider = ({ children }) => {
    const [state, dispatch] = useReducer(DataReducer, initialState);

    const loadData = async () => {
        const gamesSnap = await getDocs(collection(db, "games"));
        const tagsSnap = await getDocs(collection(db, "tags"));
        const games = gamesSnap.docs.map((d) => {
            const g = d.data();

            return {
                id: d.id,
                ...g,
                tags: Array.isArray(g.tags) ? g.tags : [],
                gallery: Array.isArray(g.gallery) ? g.gallery : [],
                image: typeof g.image === "string" ? g.image : "images/default.jpg",
                rating: typeof g.rating === "number" ? g.rating : 0,
                releaseYear: typeof g.releaseYear === "number" ? g.releaseYear : 0,
                description: g.description ?? "Sin descripción.",
            };
        });

        const tags = tagsSnap.docs.map((d) => {
            const t = d.data();
            return {
                id: d.id,
                name: t.name ?? "Unknown",
            };
        });

        const graph = new Graph();

        games.forEach((game) => {
            const gameTags = Array.isArray(game.tags) ? game.tags : [];

            gameTags.forEach((tag) => {
                graph.addEdge(game.id, tag);
            });
        });

        dispatch({
            type: "LOAD_DATA",
            payload: { games, tags, graph },
        });
    };

    useEffect(() => {
        loadData();
    }, []);

    const addToStack = (game) => {
        state.stack.push(game);
        dispatch({ type: "UPDATE_STACK", payload: state.stack });
    };

    return (
        <DataContext.Provider
            value={{
                ...state,
                addToStack,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};
