require('dotenv').config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require('cookie-parser');
const http = require("http");
const socketIo = require("socket.io");
const redis = require("redis");

const app = express();
require("./DB/conn");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: process.env.BASE_URL, // Replace with your client's origin
    credentials: true,
}));

const redisClient = redis.createClient({
    url: process.env.REDIS_URL
});

redisClient.connect();

redisClient.on('connect', () => {
    console.log('Connected to Redis server');
});
redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

// Serving the Frontend
app.use(express.static(path.join(__dirname, "./client/dist")));

// Linking router files
app.use(require("./router/auth"));

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/dist/index.html")),
        function (err) {
            res.status(400).send(err);
        }
});

const server = http.createServer(app);

const io = socketIo(server, {
    cors: {
        origin: process.env.BASE_URL,
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const MAX_MESSAGES = 100;
io.on("connection", async (socket) => {
    // Retrieve and send recent messages on connection
    const messages = await redisClient.LRANGE('chat_messages', 0, MAX_MESSAGES - 1);
    messages.reverse();
    socket.emit('chat_history', messages.map(msg => JSON.parse(msg)));

    socket.on('send_chat', async (msg) => {
        // Add new message to Redis list
        await redisClient.LPUSH('chat_messages', JSON.stringify(msg));
        redisClient.LTRIM('chat_messages', 0, MAX_MESSAGES - 1);
        io.emit('chat', msg);
    });
});

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server started at port ${process.env.PORT || 3000}`);
});