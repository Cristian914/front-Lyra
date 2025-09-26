import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import toast from "react-hot-toast";
import { User } from "lucide-react";
import { Card } from "../components/Card";

export const Register = () => {
  const [userType, setUserType] = useState("paciente");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    crm: "",
    specialty: "",
    phone: "",
    birthDate: "",
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Senhas não coincidem");
      return;
    }

    setLoading(true);

    try {
      const { user, token } = await mockApi.register({
        ...formData,
        type: userType,
      });
      login(user, token);
      toast.success("Conta criada com sucesso!");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center  p-4">
      <Card className="w-full max-w-md bg-gray-100 rounded-3xl shadow-2xl p-8">
        {/* Ícone e título */}
        <div className="flex flex-col items-center mb-8">
          <User className="w-16 h-16 text-sky-600" />
          <h1 className="bg-sky-600 text-white font-bold px-6 py-2 rounded-full mt-4 text-xl">
            Criar Conta
          </h1>
          <p className="text-gray-600 mt-2 text-sm">Cadastre-se na Lyra</p>
        </div>

        {/* Botões de seleção */}
        <div className="flex mb-6 bg-gray-200 rounded-full p-1">
          <button
            type="button"
            onClick={() => setUserType("paciente")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition ${
              userType === "paciente"
                ? "bg-sky-600 text-white"
                : "text-gray-600 hover:text-sky-600"
            }`}
          >
            Paciente
          </button>
          <button
            type="button"
            onClick={() => setUserType("psicologo")}
            className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition ${
              userType === "psicologo"
                ? "bg-sky-600 text-white"
                : "text-gray-600 hover:text-sky-600"
            }`}
          >
            Psicólogo
          </button>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nome completo"
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="seu@email.com"
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            placeholder="Senha"
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          <input
            type="password"
            value={formData.confirmPassword}
            onChange={(e) =>
              setFormData({ ...formData, confirmPassword: e.target.value })
            }
            placeholder="Confirmar senha"
            className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
            required
          />

          {/* Campos específicos */}
          {userType === "psicologo" && (
            <>
              <input
                type="text"
                value={formData.crm}
                onChange={(e) =>
                  setFormData({ ...formData, crm: e.target.value })
                }
                placeholder="CRM (Ex: CRP 12/34567)"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
              <input
                type="text"
                value={formData.specialty}
                onChange={(e) =>
                  setFormData({ ...formData, specialty: e.target.value })
                }
                placeholder="Especialidade"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="(11) 99999-9999"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </>
          )}

          {userType === "paciente" && (
            <>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                placeholder="(11) 99999-9999"
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
              <input
                type="date"
                value={formData.birthDate}
                onChange={(e) =>
                  setFormData({ ...formData, birthDate: e.target.value })
                }
                className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
                required
              />
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white font-bold py-3 rounded-full hover:bg-sky-700 transition"
          >
            {loading ? "Cadastrando..." : "Cadastrar"}
          </button>
        </form>

        {/* Links extras */}
        <div className="mt-6 text-center text-sm text-gray-700 space-y-2">
          <p>
            Já tem conta?{" "}
            <Link
              to="/login"
              className="text-sky-600 hover:underline font-medium"
            >
              Fazer login
            </Link>
          </p>
          <p>
            <Link to="/" className="text-sky-600 hover:underline">
              ← Voltar Início
            </Link>
          </p>
        </div>
      </Card>
    </div>
  );
};
