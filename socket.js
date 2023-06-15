import { Server } from "socket.io";

const socketIO = (PORT) => {
  const io = new Server(PORT, {
    cors: {
      origin: process.env.CLIENT_URL,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("joinRoom", (room) => {
      socket.join(room);
    });

    socket.on("sendMessage", (message, room) => {
      io.to(room).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("User disconnected");
    });
  });
};

export default socketIO;
