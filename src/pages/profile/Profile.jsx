import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import { db } from "../../firebase/db";
import { doc, getDoc, updateDoc, arrayRemove, arrayUnion } from "firebase/firestore";
import { Link } from "react-router-dom";
import styles from "./Profile.module.scss";

export default function Profile() {
    const { user, logout } = useContext(AuthContext);
    const { games } = useContext(DataContext);

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
        <div className={styles.page}>
            <h2 className={styles.title}>Perfil</h2>
            <p className={styles.email}>Email: {user.email}</p>

            {/* FAVORITOS */}
            <h3 className={styles.sectionTitle}>Favoritos</h3>
            {favoriteGames.length === 0 && <p>No tienes favoritos.</p>}
            <div className={styles.cardGrid}>
                {favoriteGames.map((g) => (
                    <div key={g.id} className={styles.card}>
                        <img src={g.image} alt={g.name} className={styles.cardImg} />

                        <div className={styles.cardBody}>
                            <Link to={`/game/${g.id}`} className={styles.cardName}>
                                {g.name}
                            </Link>

                            <button
                                className={styles.favBtn}
                                onClick={() => toggleFavorite(g.id)}
                            >
                                Quitar ⭐
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* HISTORIAL */}
            <h3 className={styles.sectionTitle}>Historial</h3>
            {historyGames.length === 0 && <p>No hay historial aún.</p>}

            <div className={styles.cardGrid}>
                {historyGames.map((g) => (
                    <div key={g.id} className={styles.card}>
                        <img src={g.image} alt={g.name} className={styles.cardImg} />

                        <div className={styles.cardBody}>
                            <Link to={`/game/${g.id}`} className={styles.cardName}>
                                {g.name}
                            </Link>

                            <button
                                className={styles.favBtn}
                                onClick={() => toggleFavorite(g.id)}
                            >
                                {favorites.includes(g.id) ? "★ Favorito" : "☆ Agregar"}
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button className={styles.logout} onClick={logout}>
                Cerrar sesión
            </button>
        </div>
    );
}
