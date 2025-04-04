

import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { validateEmail, checkLoginAttempts, sanitizeInput } from "@/lib/security";
import { useToast } from "@/components/ui/use-toast";

function LoginForm({ onLogin }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validation de l'email
      if (!validateEmail(formData.email)) {
        toast({
          title: "Erreur de validation",
          description: "Format d'email invalide",
          variant: "destructive",
        });
        return;
      }

      // Vérification des tentatives de connexion
      const canLogin = checkLoginAttempts(formData.email);
      if (typeof canLogin === 'string') {
        toast({
          title: "Compte bloqué",
          description: canLogin,
          variant: "destructive",
        });
        return;
      }

      // Nettoyage des entrées
      const sanitizedData = {
        email: sanitizeInput(formData.email),
        password: formData.password,
      };

      await onLogin(sanitizedData);
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8"
    >
      <h2 className="text-2xl font-semibold text-center mb-6">Connexion</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Mot de passe
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            disabled={isLoading}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={isLoading}
        >
          {isLoading ? "Connexion en cours..." : "Se connecter"}
        </Button>
      </form>
    </motion.div>
  );
}

export default LoginForm;
