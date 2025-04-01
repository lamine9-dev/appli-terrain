
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function UserManagement() {
  const { toast } = useToast();
  const [users, setUsers] = useState(
    JSON.parse(localStorage.getItem("users") || "[]")
  );
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });

  const handleAddUser = (e) => {
    e.preventDefault();
    
    if (users.some(user => user.email === newUser.email)) {
      toast({
        title: "Erreur",
        description: "Cet email est déjà utilisé",
        variant: "destructive",
      });
      return;
    }

    const updatedUsers = [
      ...users,
      {
        id: Date.now(),
        ...newUser,
      },
    ];

    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);
    setNewUser({ name: "", email: "", password: "", role: "user" });

    toast({
      title: "Succès",
      description: "Utilisateur ajouté avec succès",
    });
  };

  const handleDeleteUser = (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    setUsers(updatedUsers);

    toast({
      title: "Succès",
      description: "Utilisateur supprimé avec succès",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Gestion des Utilisateurs</h2>

      <form onSubmit={handleAddUser} className="mb-8 space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-600">
            Nom complet
          </label>
          <input
            type="text"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            Email
          </label>
          <input
            type="email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            Mot de passe
          </label>
          <input
            type="password"
            value={newUser.password}
            onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            Rôle
          </label>
          <select
            value={newUser.role}
            onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
          Ajouter un utilisateur
        </Button>
      </form>

      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-blue-600">Utilisateurs existants</h3>
        {users.map((user) => (
          <div
            key={user.id}
            className="flex justify-between items-center p-4 bg-gray-50 rounded-lg"
          >
            <div>
              <p className="font-medium">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-blue-600">{user.role}</p>
            </div>
            <Button
              onClick={() => handleDeleteUser(user.id)}
              variant="destructive"
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </Button>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default UserManagement;
