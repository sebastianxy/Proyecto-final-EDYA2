import { Routes, Route } from "react-router-dom";
import Index from "../pages/index/Index";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import UserRoutes from "./UserRoutes";

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Rutas privadas */}
            <Route path="/*" element={<UserRoutes />} />
        </Routes>
    );
}
