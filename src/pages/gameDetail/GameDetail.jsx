import { useParams } from "react-router-dom";
import { useContext } from "react";
import { DataContext } from "../../context/DataContext";

export default function GameDetail() {
    const { id } = useParams();
    const { games } = useContext(DataContext);

    const game = games.find((g) => g.id === id);

    if (!game) return <p>No existe este juego.</p>;

    return (
        <div style={{ padding: 20 }}>
            <h2>{game.name}</h2>
            <p>{game.description}</p>

            {game.image && (
                <img
                    src={`/${game.image}`}
                    alt={game.name}
                    style={{ width: "360px", borderRadius: "10px", margin: "12px 0" }}
                />
            )}

            <h4>Gameplay:</h4>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                {(game.gallery ?? []).map((img, i) => (
                    <img
                        key={i}
                        src={`/${img}`}
                        alt={`${game.name} gameplay ${i + 1}`}
                        style={{ width: "280px", borderRadius: "10px" }}
                    />
                ))}
            </div>

            <h4 style={{ marginTop: 20 }}>Tags:</h4>
            {(game.tags ?? []).map((t) => (
                <span key={t} style={{ marginRight: 10 }}>{t}</span>
            ))}
        </div>
    );
}
