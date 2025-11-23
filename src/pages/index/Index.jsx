import { Link } from "react-router-dom";
import styles from "./Index.module.scss";

export default function Index() {
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <h1 className={styles.title}>What 2 Play Now</h1>
                <p className={styles.subtitle}>
                    Recibe recomendaciones de videojuegos según tus gustos.
                </p>

                <Link to="/login" className={styles.startBtn}>
                    Comenzar
                </Link>
            </div>
        </div>
    );
}
