import { useState } from "react";
import MapaDeApoio from "../components/MapaDeApoio";
import FiltrosMapa from "../components/FiltrosMapa";

export default function PaginaMapa() {
  const [filtros, setFiltros] = useState({
    delegacia: true,
    abrigo: true,
    ong: true,
    hospital: true,
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mapa de Apoio</h1>
      <p className="text-gray-600">
        Encontre locais de apoio perto de você: delegacias da mulher, abrigos,
        ONGs e hospitais.
      </p>

      <FiltrosMapa onChange={setFiltros} />
      <MapaDeApoio filtros={filtros} />
    </div>
  );
}
