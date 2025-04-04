
import React from "react";
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { generateReportNumber } from "@/lib/reportManager";

function ReportForm({ onSubmit, onCancel }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    team: "",
    companyName: "",
    contact: "",
    lineNumber: "",
    location: "",
    clientFat: "",
    issueType: "",
    status: "offline",
    comment: "",
  });

  const teams = [
    "AKC-BONAPRISO", "AKC-AKWA", "AKC-BALI", "AKC-MIXTE", 
    "AKN-MAKEPE", "AKN-BONAMOUSSADI", "AKN-NKOTTO", "AKN-4", 
    "BSA-PALMIERS", "BSA-VILLAGE", "BSA-DAKAR", 
    "BPD-1", "BPD-2", "BPD-3", 
    "BBR-1(MANDENG)", "BBR-2", "BBR-3"
  ];

  const issueTypes = [
    "lost", "attenuation", "modem HS", "FAT off", "perte de configuration"
  ];

  const statuses = ["online", "offline"];

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation du numéro de ligne
    if (formData.lineNumber.length !== 8 || !/^\d+$/.test(formData.lineNumber)) {
      toast({
        title: "Erreur de validation",
        description: "Le numéro de ligne doit contenir exactement 8 chiffres",
        variant: "destructive",
      });
      return;
    }

    const reportNumber = generateReportNumber();
    const report = {
      ...formData,
      id: Date.now(),
      reportNumber,
      timestamp: new Date().toISOString(),
    };

    const reports = JSON.parse(localStorage.getItem("reports") || "[]");
    localStorage.setItem("reports", JSON.stringify([...reports, report]));

    toast({
      title: "Rapport soumis",
      description: `Rapport N° ${reportNumber} enregistré avec succès`,
    });

    onSubmit(report);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md p-6"
    >
      <h2 className="text-2xl font-semibold mb-6 text-blue-700">Nouveau Rapport</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-blue-600">
            Équipe
          </label>
          <select
            name="team"
            value={formData.team}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Sélectionner une équipe</option>
            {teams.map((team) => (
              <option key={team} value={team}>{team}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            Raison sociale
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            Contact
          </label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            Numéro de ligne (8 chiffres)
          </label>
          <input
            type="text"
            name="lineNumber"
            value={formData.lineNumber}
            onChange={handleChange}
            required
            maxLength="8"
            pattern="\d{8}"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            Localisation
          </label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            FAT du client
          </label>
          <input
            type="text"
            name="clientFat"
            value={formData.clientFat}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            Type de panne
          </label>
          <select
            name="issueType"
            value={formData.issueType}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Sélectionner le type de panne</option>
            {issueTypes.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            Statut
          </label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-blue-600">
            Commentaire
          </label>
          <textarea
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            onClick={onCancel}
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Annuler
          </Button>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Soumettre le rapport
          </Button>
        </div>
      </form>
    </motion.div>
  );
}

export default ReportForm;
