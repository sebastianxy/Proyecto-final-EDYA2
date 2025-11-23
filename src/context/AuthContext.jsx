import { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthReducer } from "./AuthReducer";

export const AuthContext = createContext();

const initialState = {
    user: null,
    loading: true
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            dispatch({ type: "SET_USER", payload: user });
        });
        return () => unsub();
    }, []);

    const logout = async () => {
        await signOut(auth);
        dispatch({ type: "SET_USER", payload: null });
    };

    return (
        <AuthContext.Provider value={{ ...state, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
