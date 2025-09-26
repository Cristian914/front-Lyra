import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { Calendar, ClipboardList, Bell } from "lucide-react";

export const DashboardPaciente = () => {
  const { user } = useAuth();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const aptData = await mockApi.getAppointmentsByEmail(user.email);
        setAppointments(aptData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [user.email]);

  if (loading) return <LoadingSpinner size="lg" />;

  const upcoming = appointments.filter((a) => a.status === "agendado");

  const notifications = [
    "Você tem uma sessão amanhã às 14h",
    "Nova mensagem do psicólogo",
  ];

  return (
    <div className="min-h-screen p-6  text-teal-900 font-sans">
      <h1 className="text-4xl font-bold mb-8 text-white">Meu Dashboard</h1>

      <div
        className="grid grid-cols-2 grid-rows-2 gap-8"
        style={{ gridTemplateRows: "auto 1fr" }}
      >
        {/* Próximas Sessões */}
        <div className="bg-white rounded-3xl shadow-lg p-8 flex flex-col justify-between">
          <h2 className="flex items-center gap-3 text-teal-700 text-2xl font-semibold mb-8">
            <Calendar className="w-10 h-10" />
            Próximas Sessões
          </h2>

          {upcoming.length === 0 ? (
            <p className="text-teal-700 text-center font-semibold mb-6">
              Você não tem sessões agendadas.
            </p>
          ) : (
            <ul className="space-y-4 mb-6">
              {upcoming.map((a) => (
                <li
                  key={a.id}
                  className="flex justify-between items-center p-4 rounded-lg bg-teal-50"
                >
                  <span className="text-teal-900">{a.description}</span>
                  <span className="text-sm text-teal-700 font-medium">
                    {new Date(a.date).toLocaleDateString("pt-BR")} às {a.time}
                  </span>
                </li>
              ))}
            </ul>
          )}

          <Link to="/agendamento" className="self-center mt-4">
            <button className="bg-sky-400 hover:bg-sky-500 text-white font-bold px-6 py-2 rounded-lg shadow transition">
              Solicitar Nova Sessão
            </button>
          </Link>
        </div>

        {/* Notificações / Lembretes */}
        <div className="bg-white rounded-3xl shadow-lg p-6 self-start max-w-md">
          <h2 className="flex items-center gap-2 text-teal-700 font-semibold mb-3 text-lg">
            <Bell className="w-5 h-5" />
            Notificações / Lembretes
          </h2>

          <ul className="list-disc list-inside text-teal-900 space-y-1 text-sm">
            {notifications.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </div>

        {/* Minhas Avaliações */}
        <div className="bg-white rounded-3xl shadow-lg p-8 max-w-md self-start">
          <h2 className="flex items-center gap-3 text-sky-700 text-2xl font-bold mb-8">
            <ClipboardList className="w-10 h-10" />
            Minhas Avaliações
          </h2>

          <div className="space-y-6 text-teal-800">
            <div>
              <p className="font-bold text-teal-900 text-lg mb-2">
                Para Dr. Ana Costa
              </p>
              <p className="italic text-teal-700 text-base">
                Consulta boa, Tirou todas minhas dúvidas,
                <br />
                e me ajudou com o que eu precisei.
              </p>
            </div>

            <div>
              <p className="font-bold text-teal-900 text-lg mb-2">
                Para Dr. Carlos
              </p>
              <p className="italic text-teal-700 text-base">
                Consulta Mediana, Tirou todas minhas dúvidas,
                <br />
                e me ajudou com o que eu precisei mas ainda deixou
                <br />
                coisas em branco
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
