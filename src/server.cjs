const express = require('express');
const http = require('http');
const serverless = require('serverless-http');
const socketio = require('socket.io');
const path = require('path');
const dotenv = require('dotenv').config();
const cons = require('consolidate');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const viewRouter = require('./routers/viewRouter.cjs');
const formatMessage = require('./utils/mesage.cjs');
const { userJoin, getCurrentUser } = require('./utils/user.cjs');

const PORT = process.env.PORT || 5000;

app.engine('html', cons.swig);
app.set('views', path.join(__dirname, './public'));
app.set('view engine', 'html');

app.use(express.static(path.join(__dirname, './public')));
app.use('/', viewRouter);

io.on('connection', socket => {
    console.log('New WS connection...')

    socket.on('join', username => {
        const user = userJoin(socket.id, username);
        socket.emit('message', formatMessage('admin', 'Welcome to socket.io chat!'));

        socket.broadcast.emit('message', formatMessage('admin', `${user.name} joined chat!`));

        socket.on('disconnect', () => {
            io.emit('message', formatMessage('admin', `${user.name} left chat!`));
        })

        socket.on('chatMessage', message => {
            io.emit('message', formatMessage(user.name, message));
        })
    })


})

module.exports.handler = serverless(server);
