const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // require cors module

const app = express();
app.use(cors()); // apply cors middleware

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log("User connected");

    socket.on("play", () => {
        io.emit("play");
    });

    socket.on("pause", () => {
        io.emit("pause");
    });

    socket.on("disconnect", () => {
        console.log("User disconnected");
    });

    // When the server receives a 'timeupdate' event, it emits it to all connected clients
    socket.on("timeupdate", (time) => {
        console.log("reset time vide::", time);
        io.emit("timeupdate", time);
    });
});

server.listen(3005, () => {
    console.log("Server running on port 3005");
});