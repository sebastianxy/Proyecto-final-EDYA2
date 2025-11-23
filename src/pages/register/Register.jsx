import { useState } from "react";
import { auth } from "../../firebase/auth";
import { db } from "../../firebase/db";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Link } from "react-router-dom";

export default function Register() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [error, setError] = useState("");

    const handleRegister = async () => {
        setError("");

        try {
            const cred = await createUserWithEmailAndPassword(auth, email, pass);

            await setDoc(doc(db, "users", cred.user.uid), {
                email: cred.user.email,
                favorites: [],
                history: [],
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        } catch (err) {
            if (err.code === "auth/weak-password") {
                setError("❌ La contraseña debe contener al menos 6 caracteres.");
            } else if (err.code === "auth/email-already-in-use") {
                setError("❌ Este correo ya está registrado.");
            } else if (err.code === "auth/invalid-email") {
                setError("❌ El formato del correo no es válido.");
            } else {
                setError("❌ Ocurrió un error al registrarte.");
            }
        }
    };

    return (
        <div style={{ padding: 20 }}>
            <h2>Crear Cuenta</h2>

            <input
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
            />

            <input
                placeholder="Contraseña"
                type="password"
                onChange={(e) => setPass(e.target.value)}
            />

            <button onClick={handleRegister}>Registrarse</button>

            {error && (
                <p style={{ color: "red", marginTop: 10 }}>
                    {error}
                </p>
            )}

            <Link to="/login">Iniciar sesión</Link>
        </div>
    );
}
