// components/FiltrosMapa.jsx
import { useState } from "react";

export default function FiltrosMapa({ onChange }) {
  const [filtros, setFiltros] = useState({
    delegacia: true,
    abrigo: true,
    ong: true,
    hospital: true,
  });

  const toggleFiltro = (tipo) => {
    const novoEstado = { ...filtros, [tipo]: !filtros[tipo] };
    setFiltros(novoEstado);
    onChange(novoEstado);
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow-md flex gap-4 flex-wrap">
      {Object.keys(filtros).map((tipo) => (
        <label key={tipo} className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filtros[tipo]}
            onChange={() => toggleFiltro(tipo)}
          />
          <span className="capitalize">{tipo}</span>
        </label>
      ))}
    </div>
  );
}
