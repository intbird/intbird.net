const server_path = '/socket/socket.io/'

module.exports = function SocketServer(server) {
  const socketServer = require('socket.io')(server, {path: server_path})
  socketServer.on('connection', (socket) => {
    console.log('a user connected');
  });
}
