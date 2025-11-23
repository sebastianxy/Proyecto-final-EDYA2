import { Link } from "react-router-dom";
import styles from "./GameCard.module.scss";

export default function GameCard({ game }) {
    return (
        <div className={styles.card}>
            {game.image && (
                <img
                    className={styles.cover}
                    src={`/${game.image}`}
                    alt={game.name}
                    onError={(e) => (e.currentTarget.src = "/images/default.jpg")}
                />
            )}

            <div className={styles.body}>
                <h3 className={styles.name}>{game.name}</h3>
                <p className={styles.desc}>{game.description}</p>

                <div className={styles.footer}>
                    <Link to={`/game/${game.id}`} className={styles.more}>
                        Ver más
                    </Link>
                    <span className={styles.heart}>♡</span>
                </div>
            </div>
        </div>
    );
}
