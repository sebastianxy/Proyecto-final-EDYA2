import { Link } from "react-router-dom";

export default function GameCard({ game }) {
    return (
        <div style={{ border: "1px solid #333", padding: "10px", margin: "6px" }}>

            
            {game.image && (
                <img
                    src={`/${game.image}`}
                    alt={game.name}
                    style={{ width: "220px", borderRadius: "8px", marginBottom: "8px" }}
                />
            )}

            <h3>{game.name}</h3>
            <p>{game.description}</p>

            <Link to={`/game/${game.id}`}>Ver más</Link>
        </div>
    );
}
