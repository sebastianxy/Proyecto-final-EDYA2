import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import GameCard from "../../components/index/GameCard";
import { useRecommendations } from "../../hooks/useRecommendations";

import { db } from "../../firebase/db";
import { doc, updateDoc, arrayUnion, serverTimestamp } from "firebase/firestore";

export default function Recommender() {
    const { games, tags, graph, addToStack } = useContext(DataContext);
    const { user } = useContext(AuthContext);

    const [query, setQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const recommended = useRecommendations({
        games,
        graph,
        query,
        selectedTags,
    });

    const handleRecommendClick = async (game) => {

        addToStack(game);

        if (user) {
            const userRef = doc(db, "users", user.uid);
            await updateDoc(userRef, {
                history: arrayUnion(game.id),
                updatedAt: serverTimestamp(),
            });
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Encuentra qué jugar ahora</h2>

            <input
                placeholder="¿Qué te provoca jugar?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div style={{ marginTop: 20 }}>
                {tags.map((t) => (
                    <button
                        key={t.id}
                        style={{
                            margin: 4,
                            background: selectedTags.includes(t.name) ? "#333" : "#ddd",
                            color: selectedTags.includes(t.name) ? "white" : "black",
                        }}
                        onClick={() => toggleTag(t.name)}
                    >
                        {t.name}
                    </button>
                ))}
            </div>

            <div style={{ marginTop: 20 }}>
                {recommended.map((game) => (
                    <div key={game.id} onClick={() => handleRecommendClick(game)}>
                        <GameCard game={game} />
                    </div>
                ))}

                {recommended.length === 0 && <p>No hay coincidencias aún.</p>}
            </div>
        </div>
    );
}
