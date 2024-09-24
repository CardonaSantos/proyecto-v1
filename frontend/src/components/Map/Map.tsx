import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MyLeafletMap = ({ locations }) => {
  return (
    <MapContainer
      center={[15.6646, -91.7121]} // Coordenadas de tu pueblo
      zoom={13}
      style={{ height: "400px", width: "100%", zIndex: 0 }} // Asegura que el mapa esté en un nivel bajo
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {locations.map((location) => (
        <Marker
          key={location.usuarioId} // Usar usuarioId como clave única
          position={[location.latitud, location.longitud]} // Usar latitud y longitud de location
          icon={L.divIcon({
            className: "", // Quita clases innecesarias
            html: `<div class="w-3 h-3 rounded-full bg-[#19e607]"></div>`, // Icono fijo por ahora
            iconSize: [8, 8], // Tamaño más pequeño para solo el punto
          })}
        >
          <Popup>
            <div>
              <h3 className="font-bold">Usuario ID: {location.usuarioId}</h3>{" "}
              {/* Muestra el ID del usuario */}
              <p>Estado: Activo</p>{" "}
              {/* Suponiendo que todos están activos por ahora */}
              {/* Aquí puedes agregar más información cuando la tengas */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MyLeafletMap;
