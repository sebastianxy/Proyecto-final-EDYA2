import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import { db } from "../../firebase/db";
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Profile() {
    const { user, logout } = useContext(AuthContext);
    const { games, stack } = useContext(DataContext);

    const [favorites, setFavorites] = useState([]);
    const [historyIds, setHistoryIds] = useState([]);

    useEffect(() => {
        const loadUserData = async () => {
            const ref = doc(db, "users", user.uid);
            const snap = await getDoc(ref);
            if (snap.exists()) {
                const data = snap.data();
                setFavorites(data.favorites || []);
                setHistoryIds(data.history || []);
            }
        };
        if (user) loadUserData();
    }, [user]);

    const toggleFavorite = async (gameId) => {
        const ref = doc(db, "users", user.uid);
        const isFav = favorites.includes(gameId);

        await updateDoc(ref, {
            favorites: isFav ? arrayRemove(gameId) : arrayUnion(gameId),
        });

        setFavorites((prev) =>
            isFav ? prev.filter((id) => id !== gameId) : [...prev, gameId]
        );
    };

    const favoriteGames = games.filter((g) => favorites.includes(g.id));
    const historyGames = games.filter((g) => historyIds.includes(g.id));

    return (
        <div style={{ padding: 20 }}>
            <h2>Perfil</h2>
            <p>Email: {user.email}</p>

            <h3>Favoritos</h3>
            {favoriteGames.length === 0 && <p>No tienes favoritos.</p>}
            <ul>
                {favoriteGames.map((g) => (
                    <li key={g.id}>
                        <Link to={`/game/${g.id}`}>{g.name}</Link>{" "}
                        <button onClick={() => toggleFavorite(g.id)}>Quitar</button>
                    </li>
                ))}
            </ul>

            <h3>Historial (Firestore)</h3>
            {historyGames.length === 0 && <p>No hay historial aún.</p>}
            <ul>
                {historyGames.map((g) => (
                    <li key={g.id}>
                        <Link to={`/game/${g.id}`}>{g.name}</Link>{" "}
                        <button onClick={() => toggleFavorite(g.id)}>
                            {favorites.includes(g.id) ? "★" : "☆"}
                        </button>
                    </li>
                ))}
            </ul>

            <h3>Últimas recomendaciones (Stack)</h3>
            <ul>
                {stack.toArray().map((g, i) => (
                    <li key={i}>{g.name}</li>
                ))}
            </ul>

            <button onClick={logout}>Cerrar sesión</button>
        </div>
    );
}
