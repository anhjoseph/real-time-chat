const express = require('express');
const http = require('http');
const path = require('path');
const parser = require('body-parser');
const session = require('express-session');

const { router } = require('./router');
const { MessageController } = require('./controllers/messages');
const { ChannelController } = require('./controllers/channels');

const app = express();
const port = 3000;
const server = http.createServer(app);
const io = require('socket.io')(server);

require('../db/config');

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(session({
  secret: '}M,)rfn3))P<v!~B4J-mSD{XquqIT&FQqR6ExbLk21prcG)iU1Y{*C]NnU',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: true }
}));
app.use('/', router);

server.listen(port, () => {
  console.log(`server running at ${port}`);
  // listen on the (native) connection event for incoming sockets
  io.on('connection', (socket) => {

    socket.on('user', (username) => {
      io.emit('user', username);
    });

    socket.on('channel', (channel) => {
      io.emit('channel', channel);
      ChannelController.POST(channel);
    });

    socket.on('message', (msg) => {
      io.emit('message', msg);
      MessageController.POST(msg);
    });

  });
});
