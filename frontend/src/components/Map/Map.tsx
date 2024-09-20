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
      {locations.map((employee) => (
        <Marker
          key={employee.id}
          position={[employee.location.lat, employee.location.lng]}
          icon={L.divIcon({
            className: "", // Quita clases innecesarias
            html: `<div class="w-3   h-3 rounded-full ${
              employee.status === "active" ? "bg-[#19e607]" : "bg-[#ff002b]"
            }"></div>`,
            iconSize: [8, 8], // Tamaño más pequeño para solo el punto
          })}
        >
          <Popup>
            <div>
              <h3 className="font-bold">{employee.name}</h3>
              <p>
                Estado: {employee.status === "active" ? "Activo" : "Inactivo"}
              </p>
              {employee.currentAppointment && (
                <p>En cita con: {employee.currentAppointment.client}</p>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MyLeafletMap;
