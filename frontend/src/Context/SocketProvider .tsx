import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { UserToken } from "../Utils/Types/UserTokenInfo";
import { jwtDecode } from "jwt-decode";
// Creamos el contexto
type SocketContextType = Socket | null;
const SocketContext = createContext<SocketContextType>(null);

// Hook personalizado para acceder al contexto
export const useSocket = () => {
  return useContext(SocketContext);
};

// Proveedor de contexto que manejará la conexión de Socket.IO
export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserToken | null>(null);
  const [socket, setSocket] = useState<SocketContextType>(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      try {
        const decodedToken = jwtDecode<UserToken>(token);
        setUser(decodedToken); // Guardamos el token decodificado en el estado
        console.log(decodedToken);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    }
  }, [token]);

  useEffect(() => {
    // Verificamos si `user` ya tiene los datos del token antes de conectar
    if (user) {
      const newSocket = io("http://localhost:3000", {
        query: {
          userId: user.sub,
          role: user.rol,
        },
      });

      setSocket(newSocket);
      // Limpiamos la conexión cuando el componente se desmonta
      return () => {
        newSocket.disconnect();
      };
    }
  }, [user]); // Solo se ejecuta cuando el `user` está disponible

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
