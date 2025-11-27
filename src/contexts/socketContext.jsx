import { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/useAuthStore";

const SocketContext = createContext(null);

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within SocketProvider");
  }
  return context;
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);

  //Subscribing to a token from zustand
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    //If there is no token disconnect the socket.
    if (!token) {
      console.log(" No token, disconnecting socket");
      if (socket) {
        socket.disconnect();
        setSocket(null);
        setIsConnected(false);
      }
      return;
    }

    console.log(" Initializing socket connection with token...");

    const newSocket = io(
      import.meta.env.VITE_SOCKET_URL || "http://localhost:3000",
      {
        auth: { token },
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionAttempts: 5,
      }
    );

    newSocket.on("connect", () => {
      console.log("Socket connected", newSocket.id);
      setIsConnected(true);
    });

    newSocket.on("disconnect", () => {
      console.log(" Socket disconnected");
      setIsConnected(false);
    });

    newSocket.on("connect_error", (error) => {
      console.error(" Socket connection error:", error.message);
      setIsConnected(false);
    });

    newSocket.on("error", (error) => {
      console.error(" Socket error:", error);
    });

    setSocket(newSocket);

    return () => {
      console.log(" Disconnecting socket...");
      newSocket.disconnect();
    };
  }, [token]); //Dependency on the token: we reconnect when it changes

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
