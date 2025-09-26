// Importações necessárias
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { mockApi } from "../services/mockApi";
import { Card } from "../components/Card";
import toast from "react-hot-toast";
import { FaUserCircle } from "react-icons/fa";

export const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { user, token } = await mockApi.login(
        formData.email,
        formData.password
      );
      login(user, token);
      toast.success("Login realizado com sucesso!");
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
        <div className="flex flex-col items-center mb-8">
          <FaUserCircle className="text-sky-600" size={80} />
          <h1 className="bg-sky-600 text-white font-bold px-6 py-2 rounded-full mt-4 text-xl">
            Login
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-semibold mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              placeholder="seu@gmail.com"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Senha</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              placeholder="sua Senha"
              className="w-full px-4 py-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-400"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-sky-600 text-white font-bold py-3 rounded-full hover:bg-sky-700 transition"
          >
            {loading ? "Carregando..." : "Entrar"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-700 space-y-2">
          <p>
            Não tem conta ainda?{" "}
            <Link
              to="/register"
              className="text-sky-600 hover:underline font-medium"
            >
              Cadastrar-se
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
