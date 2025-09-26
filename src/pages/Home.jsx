import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUsers, FaLaptop, FaStethoscope } from "react-icons/fa";
import { AiOutlineHeart, AiOutlineBulb, AiOutlineRise, AiOutlineTeam } from "react-icons/ai";
import { MdOutlineHowToReg, MdOutlineEventAvailable, MdOutlinePsychology } from "react-icons/md";

export const Home = () => {
  const navigate = useNavigate();

  const handleAgendarConsulta = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-6">
      <main className="max-w-7xl w-full text-center text-white">
        <h1 className="text-3xl font-bold mb-4">
          Cuidando Da Sua Mente Com Acolhimento e Empatia
        </h1>
        <p className="text-lg mb-12">
          Oferecemos atendimento psicológico online com Profissionais{" "}
          <span
            onClick={handleAgendarConsulta}
            className="bg-blue-900 rounded px-3 py-1 font-semibold cursor-pointer hover:bg-white hover:text-blue-900 transition"
          >
            Agendar Consulta
          </span>
        </p>

        {/* Serviços e Benefícios */}
        <div className="flex justify-between items-center mb-16 flex-wrap gap-12">
          <div className="bg-cyan-700 rounded-2xl p-8 w-80 text-left shadow-xl">
            <h2 className="bg-cyan-300 text-cyan-900 rounded-lg px-4 py-2 font-bold mb-6 text-lg">
              Serviços Oferecidos
            </h2>
            <ul className="space-y-4 text-base">
              <li className="flex items-center gap-3">
                <FaUser size={22} /> Terapia Individual
              </li>
              <li className="flex items-center gap-3">
                <FaUsers size={22} /> Terapia de Casais
              </li>
              <li className="flex items-center gap-3">
                <FaLaptop size={22} /> Atendimento Online
              </li>
              <li className="flex items-center gap-3">
                <FaStethoscope size={22} /> Acompanhamento Psicológico
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center gap-6">
            <img
              src="/logo.png"
              alt="Lyra Logo"
              className="w-40 h-40 opacity-80 drop-shadow-2xl"
            />
            <span className="text-3xl font-bold text-white">Lyra</span>
          </div>

          <div className="bg-cyan-700 rounded-2xl p-8 w-80 text-left shadow-xl">
            <h2 className="bg-cyan-300 text-cyan-900 rounded-lg px-4 py-2 font-bold mb-6 text-lg">
              Benefícios Do Atendimento
            </h2>
            <ul className="space-y-4 text-base">
              <li className="flex items-center gap-3">
                <AiOutlineHeart size={22} /> Bem-Estar Emocional
              </li>
              <li className="flex items-center gap-3">
                <AiOutlineBulb size={22} /> Autoconhecimento
              </li>
              <li className="flex items-center gap-3">
                <AiOutlineRise size={22} /> Redução de Ansiedade
              </li>
              <li className="flex items-center gap-3">
                <AiOutlineTeam size={22} /> Apoio em Momentos de Crise
              </li>
            </ul>
          </div>
        </div>

        {/* Sobre e Depoimentos */}
        <div className="max-w-4xl mx-auto text-left text-gray-900 bg-sky-200 rounded-2xl p-10 shadow-lg mb-16">
          <div className="flex items-start gap-6 mb-6">
            <FaUsers size={32} className="text-gray-700" />
            <div>
              <h3 className="font-bold text-lg mb-2">Sobre a Lyra</h3>
              <p className="text-base leading-snug">
                Somos uma plataforma que conecta pessoas a profissionais de psicologia qualificados,
                promovendo saúde mental e bem-estar.
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-2">Depoimentos</h3>
            <p className="text-base mb-1">
              "A consulta foi extremamente útil. Agradeço muito!"
            </p>
            <p className="font-semibold">Juliana Silva</p>
          </div>
        </div>

        {/* Como Funciona */}
        <div className="max-w-5xl mx-auto text-gray-900 bg-white rounded-2xl p-10 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-center text-cyan-900 mb-10">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <MdOutlineHowToReg size={40} className="text-cyan-600" />
              <h3 className="font-semibold text-lg">1. Cadastre-se</h3>
              <p className="text-sm text-gray-700">Crie sua conta gratuitamente.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <MdOutlineEventAvailable size={40} className="text-cyan-600" />
              <h3 className="font-semibold text-lg">2. Agende sua Consulta</h3>
              <p className="text-sm text-gray-700">Escolha o psicólogo e o melhor horário.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <MdOutlinePsychology size={40} className="text-cyan-600" />
              <h3 className="font-semibold text-lg">3. Inicie o Atendimento</h3>
              <p className="text-sm text-gray-700">Converse online com segurança e sigilo.</p>
            </div>
          </div>
        </div>

        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold mb-4">Pronto para começar sua jornada?</h2>
          <button
            onClick={handleAgendarConsulta}
            className="bg-blue-900 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-cyan-700 transition"
          >
            Agendar Consulta Agora
          </button>
        </div>
      </main>
    </div>
  );
};
