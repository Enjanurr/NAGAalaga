const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handle);
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        // CRITICAL: This puts the user into the 'room'
        socket.on("join-chat", (conversationId) => {
            socket.join(conversationId);
            console.log(⁨User ${socket.id} joined room: ${conversationId}⁩);
        });

        // CRITICAL: This relays the message to everyone in the room
        socket.on("send-message", (data) => {
            console.log("Message received on server:", data);
            // 'io.to' sends it to everyone in the room, including the sender
            io.to(data.conversationId).emit("receive-message", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });

    httpServer.listen(3000, () => {
        console.log("> Ready on http://localhost:3000");
    });
});