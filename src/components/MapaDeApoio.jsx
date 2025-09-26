// components/MapaDeApoio.jsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Rota from "./Rota";
 
const userIcon = new L.Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
  iconSize: [30, 30],
});
 
// Locais de apoio em Pouso Alegre (exemplo)
const locaisApoio = [
  {
    id: 1,
    nome: "Delegacia da Mulher - Pouso Alegre",
    tipo: "delegacia",
    lat: -22.2328,
    lng: -45.9335,
    endereco: "Rua Vicente Simões, 100 - Pouso Alegre",
    telefone: "(35) 99999-0000",
  },
  {
    id: 2,
    nome: "Abrigo Seguro - Pouso Alegre",
    tipo: "abrigo",
    lat: -22.2345,
    lng: -45.9350,
    endereco: "Rua das Flores, 50 - Pouso Alegre",
    telefone: "(35) 98888-1111",
  },
  {
    id: 3,
    nome: "ONG TamoJuntas - Pouso Alegre",
    tipo: "ong",
    lat: -22.2310,
    lng: -45.9310,
    endereco: "Rua Esperança, 75 - Pouso Alegre",
    telefone: "(35) 97777-2222",
  },
];
 
export default function MapaDeApoio({ filtros }) {
  const [posicao, setPosicao] = useState(null);
  const [destino, setDestino] = useState(null);
  const [map, setMap] = useState(null);
 
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosicao({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          console.warn("Usuária não permitiu geolocalização");
        }
      );
    }
  }, []);
 
  return (
    <MapContainer
      center={posicao || [-22.2291, -45.9368]}
      zoom={15}
      style={{ height: "80vh", width: "100%", borderRadius: "12px" }}
      whenCreated={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
 
      {/* Marcador da usuária */}
      {posicao && (
        <Marker position={[posicao.lat, posicao.lng]} icon={userIcon}>
          <Popup>📍 Você está aqui</Popup>
        </Marker>
      )}
 
      {/* Marcadores de apoio */}
      {locaisApoio
        .filter((local) => filtros[local.tipo])
        .map((local) => (
          <Marker
            key={local.id}
            position={[local.lat, local.lng]}
            eventHandlers={{
              click: () => setDestino({ lat: local.lat, lng: local.lng }),
            }}
          >
            <Popup>
              <strong>{local.nome}</strong> <br />
              {local.endereco} <br />
              📞 {local.telefone} <br />
              <button
                onClick={() => setDestino({ lat: local.lat, lng: local.lng })}
                className="mt-2 px-2 py-1 bg-purple-600 text-white rounded"
              >
                Traçar rota
              </button>
            </Popup>
          </Marker>
        ))}
 
      {/* Mostra a rota quando destino é escolhido */}
      {posicao && destino && <Rota map={map} origem={posicao} destino={destino} />}
    </MapContainer>
  );
}
 
 