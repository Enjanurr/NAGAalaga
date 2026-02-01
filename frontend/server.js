const { createServer } = require("http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

// Initialize Next.js
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handle);

    // Initialize Socket.io and attach it to the HTTP server
    const io = new Server(httpServer);

    io.on("connection", (socket) => {
        console.log("A user connected:", socket.id);

        // Join a specific chat room
        socket.on("join-chat", (conversationId) => {
            socket.join(conversationId);
            console.log(`User joined room: ${conversationId}`);
        });

        // Relay messages to the room
        socket.on("send-message", (data) => {
            io.to(data.conversationId).emit("receive-message", data);
        });

        socket.on("disconnect", () => {
            console.log("User disconnected");
        });
    });

    httpServer.listen(port, () => {
        console.log(`> Ready on http://localhost:${port}`);
    });
});