const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const app = express();

const route = require('./route');

app.use(cors({ origin: "*" }));
app.use(route)
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
        metods: ["GET", "POST"],
    },
});

io.on('connection', (socket) => {
    socket.on('join', ({ name, room }) => {
        socket.join(room);

        socket.emit('message', {
            data: {user: {name: 'Admin'}, message: `Hey, ${name}`}
        })
    })

    io.on('disconnect', () => {
        console.log('Disconnect')
    });
});

server.listen(5000, () => {
    console.log('server is running')
});
