import { Server as socketServer } from "socket.io";

const setupSocket = (server) => {
  const io = new socketServer(server, {
    cors: {
      origin: [process.env.ORIGIN],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  // why we use the map datatype
  // to store the userId and socketInstance
  const userSocketMap = new Map();

  const disconnect = (server) => {
    
  }
  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
  });


  io.on('disconnect', () => disconnect(server));
};

export { setupSocket };
