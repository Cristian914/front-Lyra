import React, { lazy, Suspense } from "react";
import { useNavigate } from "react-router-dom";

// Importação dinâmica (melhora desempenho)
const FaUser = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaUser })));
const FaUsers = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaUsers })));
const FaLaptop = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaLaptop })));
const FaStethoscope = lazy(() => import("react-icons/fa").then(mod => ({ default: mod.FaStethoscope })));
const AiOutlineHeart = lazy(() => import("react-icons/ai").then(mod => ({ default: mod.AiOutlineHeart })));
const AiOutlineBulb = lazy(() => import("react-icons/ai").then(mod => ({ default: mod.AiOutlineBulb })));
const AiOutlineRise = lazy(() => import("react-icons/ai").then(mod => ({ default: mod.AiOutlineRise })));
const AiOutlineTeam = lazy(() => import("react-icons/ai").then(mod => ({ default: mod.AiOutlineTeam })));
const MdOutlineHowToReg = lazy(() => import("react-icons/md").then(mod => ({ default: mod.MdOutlineHowToReg })));
const MdOutlineEventAvailable = lazy(() => import("react-icons/md").then(mod => ({ default: mod.MdOutlineEventAvailable })));
const MdOutlinePsychology = lazy(() => import("react-icons/md").then(mod => ({ default: mod.MdOutlinePsychology })));

const Icon = ({ Component, size = 22, className = "" }) => (
  <Suspense fallback={<span className="w-6 h-6 bg-gray-300 rounded-full animate-pulse" />}>
    <Component size={size} className={className} aria-hidden="true" />
  </Suspense>
);

export const Home = () => {
  const navigate = useNavigate();

  const handleAgendarConsulta = () => navigate("/login");

  return (
    <div className="min-h-screen flex flex-col items-center py-20 px-6  from-cyan-900 to-blue-900">
      <main className="max-w-7xl w-full text-center text-white">
        <h1 className="text-3xl font-bold mb-4">
          Cuidando Da Sua Mente Com Acolhimento e Empatia
        </h1>

        <p className="text-lg mb-12">
          Oferecemos atendimento psicológico online com Profissionais{" "}
          <button
            onClick={handleAgendarConsulta}
            className="bg-blue-900 rounded px-3 py-1 font-semibold cursor-pointer hover:bg-white hover:text-blue-900 transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Agendar Consulta
          </button>
        </p>

        <div className="flex justify-between items-center mb-16 flex-wrap gap-12">
          {/* Serviços */}
          <section className="bg-cyan-700 rounded-2xl p-8 w-80 text-left shadow-xl">
            <h2 className="bg-cyan-300 text-cyan-900 rounded-lg px-4 py-2 font-bold mb-6 text-lg">
              Serviços Oferecidos
            </h2>
            <ul className="space-y-4 text-base">
              <li className="flex items-center gap-3"><Icon Component={FaUser} /> Terapia Individual</li>
              <li className="flex items-center gap-3"><Icon Component={FaUsers} /> Terapia de Casais</li>
              <li className="flex items-center gap-3"><Icon Component={FaLaptop} /> Atendimento Online</li>
              <li className="flex items-center gap-3"><Icon Component={FaStethoscope} /> Acompanhamento Psicológico</li>
            </ul>
          </section>

          {/* Logo */}
          <div className="flex flex-col items-center gap-6">
            <img
              src="/logo.png"
              alt="Logotipo da Lyra"
              className="w-40 h-40 opacity-90 drop-shadow-2xl mx-auto"
              width="160"
              height="160"
              loading="lazy"
            />
            <span className="text-3xl font-bold text-white">Lyra</span>
          </div>

          {/* Benefícios */}
          <section className="bg-cyan-700 rounded-2xl p-8 w-80 text-left shadow-xl">
            <h2 className="bg-cyan-300 text-cyan-900 rounded-lg px-4 py-2 font-bold mb-6 text-lg">
              Benefícios Do Atendimento
            </h2>
            <ul className="space-y-4 text-base">
              <li className="flex items-center gap-3"><Icon Component={AiOutlineHeart} /> Bem-Estar Emocional</li>
              <li className="flex items-center gap-3"><Icon Component={AiOutlineBulb} /> Autoconhecimento</li>
              <li className="flex items-center gap-3"><Icon Component={AiOutlineRise} /> Redução de Ansiedade</li>
              <li className="flex items-center gap-3"><Icon Component={AiOutlineTeam} /> Apoio em Momentos de Crise</li>
            </ul>
          </section>
        </div>

        {/* Sobre */}
        <section className="max-w-4xl mx-auto text-left text-gray-900 bg-sky-200 rounded-2xl p-10 shadow-lg mb-16">
          <div className="flex items-start gap-6 mb-6">
            <Icon Component={FaUsers} size={32} className="text-gray-700" />
            <div>
              <h2 className="font-bold text-lg mb-2">Sobre a Lyra</h2>
              <p className="text-base leading-snug">
                Somos uma plataforma que conecta pessoas a profissionais de psicologia qualificados,
                promovendo saúde mental e bem-estar.
              </p>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-lg mb-2">Depoimentos</h2>
            <blockquote className="text-base mb-1 italic">
              "A consulta foi extremamente útil. Agradeço muito!"
            </blockquote>
            <p className="font-semibold">Juliana Silva</p>
          </div>
        </section>

        {/* Como Funciona */}
        <section className="max-w-5xl mx-auto text-gray-900 bg-white rounded-2xl p-10 shadow-lg mb-16">
          <h2 className="text-2xl font-bold text-center text-cyan-900 mb-10">
            Como Funciona
          </h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <Icon Component={MdOutlineHowToReg} size={40} className="text-cyan-600" />
              <h3 className="font-semibold text-lg">1. Cadastre-se</h3>
              <p className="text-sm text-gray-700">Crie sua conta gratuitamente.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Icon Component={MdOutlineEventAvailable} size={40} className="text-cyan-600" />
              <h3 className="font-semibold text-lg">2. Agende sua Consulta</h3>
              <p className="text-sm text-gray-700">Escolha o psicólogo e o melhor horário.</p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <Icon Component={MdOutlinePsychology} size={40} className="text-cyan-600" />
              <h3 className="font-semibold text-lg">3. Inicie o Atendimento</h3>
              <p className="text-sm text-gray-700">Converse online com segurança e sigilo.</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="text-center mt-10">
          <h2 className="text-2xl font-bold mb-4">Pronto para começar sua jornada?</h2>
          <button
            onClick={handleAgendarConsulta}
            className="bg-blue-900 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-cyan-700 transition focus:outline-none focus:ring-2 focus:ring-cyan-400"
          >
            Agendar Consulta Agora
          </button>
        </div>
      </main>
    </div>
  );
};
