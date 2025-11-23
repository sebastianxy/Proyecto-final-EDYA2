import { useContext, useState } from "react";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";
import GameCard from "../../components/index/GameCard";
import { useRecommendations } from "../../hooks/useRecommendations";
import styles from "./Recommender.module.scss";

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
        <div className={styles.container}>
            <h2 className={styles.title}>Recomendaciones para ti</h2>
            <p className={styles.subtitle}>Basado en tus gustos:</p>

            <input
                className={styles.searchInput}
                placeholder="¿Qué te provoca jugar?"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />

            <div className={styles.tags}>
                {tags.map((t) => (
                    <button
                        key={t.id}
                        className={`${styles.tagBtn} ${selectedTags.includes(t.name) ? styles.tagActive : ""}`}
                        onClick={() => toggleTag(t.name)}
                    >
                        {t.name}
                    </button>
                ))}
            </div>

            <div className={styles.grid}>
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
