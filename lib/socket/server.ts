import { Server as NetServer } from 'http';
import { NextApiRequest, NextApiResponse } from 'next';
import { Server as ServerIO } from 'socket.io';

export type NextApiResponseServerIO = NextApiResponse & {
  socket: {
    server: NetServer & {
      io: ServerIO;
    };
  };
};

export interface ServerToClientEvents {
  sessionUpdate: (data: { sessionId: string; action: string; data: any }) => void;
  userJoined: (data: { sessionId: string; user: any }) => void;
  userLeft: (data: { sessionId: string; userId: string }) => void;
  syncAction: (data: { sessionId: string; action: string; timestamp: number }) => void;
}

export interface ClientToServerEvents {
  joinSession: (data: { sessionId: string; user: any }) => void;
  leaveSession: (data: { sessionId: string; userId: string }) => void;
  syncAction: (data: { sessionId: string; action: string }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  sessionId?: string;
  userId?: string;
}

let io: ServerIO<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData> | undefined;

export const initSocket = (httpServer: NetServer) => {
  if (io) {
    return io;
  }

  io = new ServerIO<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
  >(httpServer, {
    path: '/api/socket',
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('joinSession', (data) => {
      const { sessionId, user } = data;
      socket.data.sessionId = sessionId;
      socket.data.userId = user.userId;

      socket.join(sessionId);
      console.log(`User ${user.userId} joined session ${sessionId}`);

      // Notify others in the session
      socket.to(sessionId).emit('userJoined', { sessionId, user });
    });

    socket.on('leaveSession', (data) => {
      const { sessionId, userId } = data;
      socket.leave(sessionId);
      console.log(`User ${userId} left session ${sessionId}`);

      // Notify others in the session
      socket.to(sessionId).emit('userLeft', { sessionId, userId });
    });

    socket.on('syncAction', (data) => {
      const { sessionId, action } = data;
      const timestamp = Date.now();

      console.log(`Sync action in session ${sessionId}: ${action}`);

      // Broadcast to all users in the session (including sender)
      io?.to(sessionId).emit('syncAction', {
        sessionId,
        action,
        timestamp,
      });
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);

      // Notify others if user was in a session
      if (socket.data.sessionId && socket.data.userId) {
        socket.to(socket.data.sessionId).emit('userLeft', {
          sessionId: socket.data.sessionId,
          userId: socket.data.userId,
        });
      }
    });
  });

  return io;
};

export const getSocket = () => {
  if (!io) {
    throw new Error('Socket.io not initialized');
  }
  return io;
};

