import { useState, useContext } from "react";
import { auth } from "../../firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { db } from "../../firebase/db";
import { doc, setDoc } from "firebase/firestore";
import styles from "./Register.module.scss";

export default function Register() {
  const { user } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");

  if (user) return <Navigate to="/recommender" />;

  const handleRegister = async () => {
    setError("");

    if (!email || !pass) {
      setError("Debe ingresar email y contraseña.");
      return;
    }

    if (pass.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);

      // ⬅️ ***AQUÍ ESTÁ LA SOLUCIÓN***
      await setDoc(doc(db, "users", cred.user.uid), {
        favorites: [],
        history: []
      });

    } catch (err) {
      if (err.code === "auth/invalid-email") setError("Email inválido.");
      else if (err.code === "auth/email-already-in-use") setError("Este email ya está registrado.");
      else if (err.code === "auth/weak-password") setError("La contraseña es muy débil.");
      else setError("Error al crear la cuenta.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h2>Crear cuenta</h2>

        <input
          placeholder="Correo"
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

        <button onClick={handleRegister}>Registrarse</button>

        {error && <p className={styles.error}>{error}</p>}

        <Link to="/login">¿Ya tienes cuenta? Inicia sesión</Link>
      </div>
    </div>
  );
}
