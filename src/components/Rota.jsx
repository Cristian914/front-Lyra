// components/Rota.jsx
import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine";

export default function Rota({ map, origem, destino }) {
  useEffect(() => {
    if (!map || !origem || !destino) return;

    const control = L.Routing.control({
      waypoints: [L.latLng(origem.lat, origem.lng), L.latLng(destino.lat, destino.lng)],
      lineOptions: { styles: [{ color: "#6A1B9A", weight: 5 }] },
      createMarker: () => null, // remove marcadores extras
      show: false, // esconde painel lateral
      addWaypoints: false,
      routeWhileDragging: false,
    }).addTo(map);

    return () => map.removeControl(control); // limpa ao sair
  }, [map, origem, destino]);

  return null;
}
