
import React from "react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import ReportForm from "@/components/ReportForm";
import ReportList from "@/components/ReportList";
import UserManagement from "@/components/UserManagement";
import MissionManagement from "@/components/MissionManagement";
import { checkAndExport } from "@/lib/reportManager";
import { useToast } from "@/components/ui/use-toast";

function Dashboard({ currentUser, onLogout }) {
  const { toast } = useToast();
  const [showReportForm, setShowReportForm] = useState(false);
  const [showUserManagement, setShowUserManagement] = useState(false);
  const [showMissionManagement, setShowMissionManagement] = useState(false);
  const [reports, setReports] = useState(
    JSON.parse(localStorage.getItem("reports") || "[]")
  );

  // Vérifier l'export automatique au chargement
  useEffect(() => {
    const exportResult = checkAndExport();
    if (exportResult?.success) {
      toast({
        title: "Export automatique",
        description: exportResult.message,
      });
    }
  }, []);

  const handleReportSubmit = (report) => {
    const updatedReports = [...reports, report];
    setReports(updatedReports);
    localStorage.setItem("reports", JSON.stringify(updatedReports));
    setShowReportForm(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm">
        <div>
          <h2 className="text-2xl font-semibold text-blue-700">
            Bienvenue, {currentUser.name}
          </h2>
          <p className="text-blue-600">
            {currentUser.role === 'admin' ? 'Console d\'administration' : 'Gérez vos rapports de terrain'}
          </p>
        </div>
        <div className="space-x-4">
          {currentUser.role === 'admin' && (
            <>
              <Button
                onClick={() => {
                  setShowReportForm(false);
                  setShowMissionManagement(false);
                  setShowUserManagement(!showUserManagement);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                {showUserManagement ? "Voir les rapports" : "Gérer les utilisateurs"}
              </Button>
              <Button
                onClick={() => {
                  setShowReportForm(false);
                  setShowUserManagement(false);
                  setShowMissionManagement(!showMissionManagement);
                }}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {showMissionManagement ? "Voir les rapports" : "Gérer les missions"}
              </Button>
            </>
          )}
          <Button
            onClick={() => {
              setShowUserManagement(false);
              setShowMissionManagement(false);
              setShowReportForm(!showReportForm);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {showReportForm ? "Voir les rapports" : "Nouveau Rapport"}
          </Button>
          <Button
            variant="outline"
            onClick={onLogout}
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            Déconnexion
          </Button>
        </div>
      </div>

      {showUserManagement && currentUser.role === 'admin' ? (
        <UserManagement />
      ) : showMissionManagement && currentUser.role === 'admin' ? (
        <MissionManagement />
      ) : showReportForm ? (
        <ReportForm
          onSubmit={handleReportSubmit}
          onCancel={() => setShowReportForm(false)}
        />
      ) : (
        <ReportList reports={reports} isAdmin={currentUser.role === 'admin'} />
      )}
    </motion.div>
  );
}

export default Dashboard;
