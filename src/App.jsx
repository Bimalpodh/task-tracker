/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import LoginPage from "./Component/LoginPage";
import Dashboard from "./Component/Dashboard";
import { getCurrentUser } from "./utils/localStoarage";
import { UserContext } from "./context/userContext";

const App = () => {
  const [username, setUsername] = useState(getCurrentUser());
  const location = useLocation();

  useEffect(() => {
    const user = getCurrentUser();
    if (user) {
      setUsername(user);
    }
  }, []);

  return (
    <UserContext.Provider value={{ username, setUsername }}>
      <Routes>
        <Route
          path="/"
          element={
            !username ? (
              <LoginPage />
            ) : (
              <Navigate to={location.pathname === "/" ? "/dashboard" : location.pathname} replace />
            )
          }
        />
        <Route
          path="/dashboard"
          element={username ? <Dashboard /> : <Navigate to="/" replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </UserContext.Provider>
  );
};

export default App;
