
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialiser les utilisateurs de test si nécessaire
if (!localStorage.getItem("users")) {
  const testUsers = [
    {
      id: 1,
      name: "Administrateur Principal",
      email: "admin1@example.com",
      password: "admin123",
      role: "admin"
    },
    {
      id: 2,
      name: "Administrateur",
      email: "admin2@example.com",
      password: "admin456",
      role: "admin"
    },
    {
      id: 3,
      name: "Jean mark",
      email: "jean@example.com",
      password: "test123",
      role: "user"
    }
    
  ];
  localStorage.setItem("users", JSON.stringify(testUsers));
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
