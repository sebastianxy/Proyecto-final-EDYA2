import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import styles from "./DashboardLayout.module.scss";

export default function DashboardLayout({ children }) {
    const { logout } = useContext(AuthContext);
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className={styles.layout}>

            {/* SIDEBAR */}
            <aside className={styles.sidebar}>
                <h1 className={styles.brand}>What 2 play now</h1>

                <nav className={styles.nav}>

                    {/* SOLO INICIO */}
                    <Link
                        className={isActive("/recommender") ? styles.active : ""}
                        to="/recommender"
                    >
                        <span className={styles.icon}>🏠</span>
                        Inicio
                    </Link>
                </nav>

                {/* SEPARADOR */}
                <div className={styles.separator}></div>

                <nav className={styles.nav}>

                    <Link
                        className={isActive("/profile") ? styles.active : ""}
                        to="/profile"
                    >
                        <span className={styles.icon}>👤</span>
                        Mi perfil
                    </Link>
                </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className={styles.content}>

                {/* TOPBAR SIN BARRA DE BÚSQUEDA */}
                <header className={styles.topbar}>
                    <button className={styles.logoutBtn} onClick={logout}>
                        Cerrar sesión
                    </button>
                </header>

                <div className={styles.page}>{children}</div>
            </main>
        </div>
    );
}
