import { Link } from "react-router-dom";

export default function Menu() {
    return (
        <nav style={{ padding: 10, background: "#111", color: "white" }}>
            <Link to="/recommender" style={{ marginRight: 10 }}>Recomendar</Link>
            <Link to="/profile" style={{ marginRight: 10 }}>Perfil</Link>
        </nav>
    );
}
