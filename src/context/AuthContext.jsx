import { createContext, useReducer, useEffect } from "react";
import { auth } from "../firebase/auth";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { AuthReducer } from "./AuthReducer";

import { db } from "../firebase/db";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

const initialState = {
    user: null,
    loading: true
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
            
            if (firebaseUser) {
                // --- UID real del usuario ---
                const userRef = doc(db, "users", firebaseUser.uid);
                const userSnap = await getDoc(userRef);

                // --- SI NO EXISTE EL DOCUMENTO, CREARLO ---
                if (!userSnap.exists()) {
                    await setDoc(userRef, {
                        email: firebaseUser.email,
                        createdAt: new Date(),
                        favorites: [],
                        history: []
                    });
                }

                dispatch({ type: "SET_USER", payload: firebaseUser });
            } else {
                dispatch({ type: "SET_USER", payload: null });
            }
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
