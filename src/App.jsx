
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Toaster } from "@/components/ui/toaster";
import LoginForm from "@/components/LoginForm";
import Dashboard from "@/components/Dashboard";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const { toast } = useToast();

  const handleLogin = (credentials) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      toast({
        title: "Connexion réussie",
        description: `Bienvenue, ${user.name}!`,
      });
    } else {
      toast({
        title: "Erreur de connexion",
        description: "Email ou mot de passe incorrect",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès",
    });
  };

  return (
    <div className="min-h-screen bg-blue-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold text-blue-800">
              Système de Rapports de Terrain
            </h1>
          </header>

          {!isAuthenticated ? (
            <LoginForm onLogin={handleLogin} />
          ) : (
            <Dashboard
              currentUser={currentUser}
              onLogout={handleLogout}
            />
          )}
        </motion.div>
      </div>
      <Toaster />
    </div>
  );
}

export default App;
