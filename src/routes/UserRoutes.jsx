import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import Recommender from "../pages/recommender/Recommender";
import GameDetail from "../pages/gameDetail/GameDetail";
import Profile from "../pages/profile/Profile";
import DashboardLayout from "../components/shared/DashboardLayout";

export default function UserRoutes() {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <p>Cargando...</p>;
    if (!user) return <Navigate to="/login" />;

    return (
        <Routes>
            <Route
                path="/recommender"
                element={
                    <DashboardLayout>
                        <Recommender />
                    </DashboardLayout>
                }
            />

            <Route
                path="/game/:id"
                element={
                    <DashboardLayout>
                        <GameDetail />
                    </DashboardLayout>
                }
            />

            <Route
                path="/profile"
                element={
                    <DashboardLayout>
                        <Profile />
                    </DashboardLayout>
                }
            />

            <Route path="*" element={<Navigate to="/recommender" />} />
        </Routes>
    );
}
