import { useState, useContext } from "react";
import { auth } from "../../firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import styles from "./Login.module.scss";

export default function Login() {
    const { user } = useContext(AuthContext);

    // Estados corregidos
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    // Si el usuario ya está logueado → redirigir
    if (user) return <Navigate to="/recommender" />;

    const handleLogin = async () => {
        setError(""); // limpiar error previo

        if (!email || !pass) {
            setError("Debe ingresar email y contraseña.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, pass);
        } catch (err) {
            // Manejo de errores más amigable
            if (err.code === "auth/invalid-email") setError("Email inválido.");
            else if (err.code === "auth/user-not-found") setError("Usuario no encontrado.");
            else if (err.code === "auth/wrong-password") setError("Contraseña incorrecta.");
            else setError("Error al iniciar sesión.");
        }
    };

    return (
        <div className={styles.page}>
            <div className={styles.card}>
                <h2>Login</h2>

                <input
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    placeholder="Contraseña"
                    type="password"
                    value={pass}
                    onChange={(e) => setPass(e.target.value)}
                />

                <button onClick={handleLogin}>Iniciar sesión</button>

                {error && <p className={styles.error}>{error}</p>}

                <Link to="/register">¿No tienes cuenta? Regístrate</Link>
            </div>
        </div>
    );
}
