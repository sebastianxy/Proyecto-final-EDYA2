import { useState, useContext } from "react";
import { auth } from "../../firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Link } from "react-router-dom";

export default function Login() {
    const { user } = useContext(AuthContext);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");

    if (user) return <Navigate to="/recommender" />;

    const handleLogin = async () => {
        await signInWithEmailAndPassword(auth, email, pass);
    };

    return (
        <div>
            <h2>Iniciar Sesión</h2>
            <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
            <input
                placeholder="Contraseña"
                type="password"
                onChange={(e) => setPass(e.target.value)}
            />
            <button onClick={handleLogin}>Entrar</button>
            <Link to="/register">Crear cuenta</Link>
        </div>
    );
}
