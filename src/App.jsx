/* eslint-disable react-refresh/only-export-components */
import React, { useState, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./Component/LoginPage";
import Dashboard from "./Component/Dashboard";
import { getCurrentUser } from "./utils/localStoarage";

// Context to share user globally
export const UserContext = createContext();

const App = () => {
  const [username, setUsername] = useState(getCurrentUser());

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <Routes>
        <Route
          path="/"
          element={!username ? <LoginPage /> : <Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={username ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
