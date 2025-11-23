import { useParams } from "react-router-dom";
import { useContext, useState } from "react"; // ⭐ AÑADIDO
import { DataContext } from "../../context/DataContext";
import styles from "./GameDetail.module.scss";

export default function GameDetail() {
    const { id } = useParams();
    const { games } = useContext(DataContext);

    const [selectedImg, setSelectedImg] = useState(null); // ⭐ AÑADIDO

    // Si aún no cargan los juegos
    if (!games || games.length === 0) {
        return <p className={styles.loading}>Cargando datos...</p>;
    }

    const game = games.find((g) => g.id === id);

    if (!game) return <p className={styles.notFound}>No existe este juego.</p>;

    return (
        <div className={styles.page}>

            {/* HEADER */}
            <div className={styles.header}>
                <h1>{game.name}</h1>
                <p className={styles.description}>{game.description}</p>
            </div>

            {/* MAIN CARD */}
            <div className={styles.mainCard}>
                <img
                    src={`/${game.image}`}
                    alt={game.name}
                    className={styles.cover}
                />

                <div className={styles.details}>
                    <p><strong>Año:</strong> {game.releaseYear}</p>
                    <p><strong>Rating:</strong> {game.rating}/10</p>

                    <div className={styles.tags}>
                        {game.tags?.map((tag) => (
                            <span key={tag} className={styles.tag}>
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* GAMEPLAY */}
            <h2 className={styles.subTitle}>Gameplay</h2>

            <div className={styles.gallery}>
                {game.gallery?.map((img, i) => (
                    <img
                        key={i}
                        src={`/${img}`}
                        className={styles.galleryImg}
                        alt={`Gameplay ${i + 1}`}
                        onClick={() => setSelectedImg(`/${img}`)}       // ⭐ AÑADIDO
                    />
                ))}
            </div>

            {/* ⭐ MODAL PARA IMAGEN AMPLIADA */}
            {selectedImg && (
                <div className={styles.modal} onClick={() => setSelectedImg(null)}>
                    <img src={selectedImg} className={styles.modalImg} alt="Ampliada" />
                </div>
            )}

        </div>
    );
}
