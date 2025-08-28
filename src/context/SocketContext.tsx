import useSession from '@/hooks/useSession';
import { SocketUser } from '@/types';
import { createContext, useContext, useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

interface ISocketContext {}

export const SocketContext = createContext<ISocketContext | null>(null);

export const SocketContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { user: userId } = useSession();

  const [socket, setSocket] = useState<Socket | null>(null);

  const [isSocketConnected, setIsSocketConnected] = useState(false);

  const [onlineUsers, setOnlineUsers] = useState<SocketUser[] | null>(null);

  console.log('online users: ', onlineUsers);

  console.log('isSocketConnected:', isSocketConnected);

  useEffect(() => {
    const newSocket = io();
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  useEffect(() => {
    if (socket === null) return;

    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsSocketConnected(true);
    }

    function onDisconnect() {
      setIsSocketConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !isSocketConnected) return;

    socket.emit('addNewUser', userId);
    socket.on('getUser', (res) => {
      setOnlineUsers(res);
    });

    return () => {
      socket.off('getUsers', (res) => {
        setOnlineUsers(res);
      });
    };
  }, [socket, isSocketConnected, userId]);

  return (
    <SocketContext.Provider value={{}}>{children} </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);

  if (context === null) {
    throw new Error('UseSocket must be used within a socketContextProvider');
  }
  return context;
};
