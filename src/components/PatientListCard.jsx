import { Card } from "./Card";
import { User } from "lucide-react";

export const PatientListCard = ({ patients = [] }) => {
  return (
    <Card className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold text-dark mb-4">
        Meus Pacientes
      </h2>
      <ul className="space-y-3 max-h-60 overflow-y-auto">
        {patients.length > 0 ? (
          patients.map((patient) => (
            <li
              key={patient.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-light/20 transition"
            >
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-dark/60" />
                <span className="text-dark">{patient.name}</span>
              </div>

              {/* status (se existir no seu mockApi) */}
              {patient.status && (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium
                    ${
                      patient.status === "Ativo"
                        ? "bg-green-100 text-green-800"
                        : patient.status === "Em pausa"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-gray-100 text-gray-800"
                    }`}
                >
                  {patient.status}
                </span>
              )}
            </li>
          ))
        ) : (
          <p className="text-dark/60 text-sm">Nenhum paciente cadastrado.</p>
        )}
      </ul>
    </Card>
  );
};

