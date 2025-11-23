import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Recommender from "../pages/recommender/Recommender";
import GameDetail from "../pages/gameDetail/GameDetail";
import Profile from "../pages/profile/Profile";

export default function UserRoutes() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Cargando...</p>;
    if (!user) return <Navigate to="/login" />;

    return (
        <Routes>
            <Route path="/recommender" element={<Recommender />} />
            <Route path="/game/:id" element={<GameDetail />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/recommender" />} />
        </Routes>
    );
}
