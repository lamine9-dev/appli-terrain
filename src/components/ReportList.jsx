
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { exportToExcel } from "@/lib/excelExport";
import { useToast } from "@/components/ui/use-toast";

function ReportList({ reports, isAdmin }) {
  const { toast } = useToast();
  const sortedReports = [...reports].sort((a, b) => 
    new Date(b.timestamp) - new Date(a.timestamp)
  );

  const handleExport = () => {
    try {
      exportToExcel(sortedReports);
      toast({
        title: "Export réussi",
        description: "Les rapports ont été exportés avec succès",
      });
    } catch (error) {
      toast({
        title: "Erreur d'export",
        description: "Une erreur est survenue lors de l'export",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-4">
      {isAdmin && (
        <div className="flex justify-end mb-4">
          <Button
            onClick={handleExport}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Exporter vers Excel
          </Button>
        </div>
      )}

      {sortedReports.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Aucun rapport n'a encore été soumis.
        </p>
      ) : (
        sortedReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-500"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-lg font-semibold text-blue-700">
                  Équipe: {report.team}
                </h3>
                <p className="text-sm text-gray-500">
                  {new Date(report.timestamp).toLocaleString()}
                </p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                report.status === 'online' 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-red-100 text-red-800'
              }`}>
                {report.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-blue-600">Raison sociale</h4>
                <p className="text-gray-600">{report.companyName}</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-600">Contact</h4>
                <p className="text-gray-600">{report.contact}</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-600">Numéro de ligne</h4>
                <p className="text-gray-600">{report.lineNumber}</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-600">Localisation</h4>
                <p className="text-gray-600">{report.location}</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-600">FAT du client</h4>
                <p className="text-gray-600">{report.clientFat}</p>
              </div>
              <div>
                <h4 className="font-medium text-blue-600">Type de panne</h4>
                <p className="text-gray-600">{report.issueType}</p>
              </div>
            </div>

            <div>
              <h4 className="font-medium text-blue-600">Commentaire</h4>
              <p className="text-gray-600">{report.comment}</p>
            </div>
          </motion.div>
        ))
      )}
    </div>
  );
}

export default ReportList;
