// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  signupWithEmail,
  loginWithEmail,
  loginWithGoogle,
} from "../services/authService";
import { auth } from "../firebase/firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const signup = async (email, password) => {
    const user = await signupWithEmail(email, password);
    setCurrentUser(user);
    return user;
  };

  const login = async (email, password) => {
    const user = await loginWithEmail(email, password);
    setCurrentUser(user);
    return user;
  };

  const loginGoogle = async () => {
    const user = await loginWithGoogle();
    setCurrentUser(user);
    return user;
  };

  const logout = async () => {
    await auth.signOut();
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        currentUser,
        loading,
        signup,
        login,
        loginGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);