import { ReactNode, createContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

export const WebsocketContext = createContext<any>(null);

const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    const newSocket = io('http://localhost:8080');
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return <WebsocketContext.Provider value={{ socket }}>{children}</WebsocketContext.Provider>;
};

export default WebsocketProvider;
