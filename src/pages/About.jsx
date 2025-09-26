// src/pages/About.jsx
import React, { useRef } from "react";
import { FaBullseye, FaEye, FaMapMarkerAlt } from "react-icons/fa";
import MapaDeApoio from "../components/MapaDeApoio";

export const About = () => {
  const mapaRef = useRef(null);

  const scrollToMapa = () => {
    if (mapaRef.current) {
      mapaRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="text-white py-24 px-8">
      <div className="max-w-6xl mx-auto text-center">
        {/* Logo e título */}
        <img
          src="/logo.png"
          alt="Logo Lyra"
          className="mx-auto mb-8 opacity-90 w-32 h-32"
        />
        <h2 className="text-4xl font-bold mb-8">Sobre o Lyra</h2>

        {/* Descrição */}
        <div className="bg-sky-200 bg-opacity-50 rounded-2xl p-10 mb-16 text-sky-900 font-semibold leading-relaxed shadow-lg">
          <p className="text-lg">
            Somos uma plataforma que une tecnologia e responsabilidade social para
            otimizar atendimentos psicológicos voluntários em universidades, ONGs
            e projetos sociais.
          </p>
          <p className="font-normal mt-5 text-base leading-snug">
            Desenvolvido especificamente para instituições que oferecem apoio
            psicológico gratuito, nosso sistema organiza agendas, registra
            históricos e utiliza inteligência artificial para identificar padrões
            que auxiliam profissionais na tomada de decisões clínicas.
          </p>
        </div>

    
        {/* Nossa História */}
        <div className="bg-sky-700 rounded-2xl p-10 mb-16 flex flex-col md:flex-row justify-between items-center shadow-md gap-6">
          <div className="text-left max-w-lg">
            <h3 className="text-2xl font-bold mb-3">Nossa História</h3>
            <p className="text-base font-medium leading-snug">
              O Lyra nasceu da necessidade de conectar instituições de ensino e
              voluntários para oferecer atendimentos psicológicos organizados,
              ágeis e acessíveis a todos que precisam de apoio emocional e
              psicológico de qualidade.
            </p>
          </div>
          <img
            src="/logo.png"
            alt="Logo Lyra"
            className="opacity-80 w-20 h-20"
          />
        </div>

        {/* Missão, Visão, Valores */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center max-w-5xl mx-auto mb-16">
          <div>
            <FaBullseye size={50} className="mx-auto mb-4" />
            <h4 className="font-bold text-xl mb-3">Missão</h4>
            <p className="text-base max-w-xs mx-auto">
              Nosso objetivo é democratizar o acesso a ferramentas tecnológicas
              avançadas para organizações que trabalham com recursos limitados
            </p>
          </div>
          <div>
            <FaEye size={50} className="mx-auto mb-4" />
            <h4 className="font-bold text-xl mb-3">Visão</h4>
            <p className="text-base max-w-xs mx-auto">
              Ser reconhecido como a principal plataforma de apoio psicológico
              voluntário
            </p>
          </div>
          <div>
            <FaMapMarkerAlt size={50} className="mx-auto mb-4" />
            <h4 className="font-bold text-xl mb-3">Valores</h4>
            <p className="text-base max-w-xs mx-auto">
              Queremos transformar a forma como projetos sociais gerenciam seus
              atendimentos, proporcionando mais eficiência, segurança e qualidade
              no cuidado oferecido.
            </p>
          </div>
        </div>

        {/* Mapa de Apoio */}
        <div ref={mapaRef} className="mt-16">
          <h3 className="text-3xl font-bold mb-6">Mapa de Apoio</h3>
          <MapaDeApoio filtros={{ delegacia: true, abrigo: true, ong: true }} />
        </div>
      </div>
    </section>
  );
};
