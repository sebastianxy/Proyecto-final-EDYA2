import { Link } from "react-router-dom";

export default function Index() {
    return (
        <div style={{ padding: 40 }}>
            <h1>What To Play Now</h1>
            <p>Recibe recomendaciones de videojuegos según tus gustos.</p>
            <Link to="/login">Comenzar</Link>
        </div>
    );
}
