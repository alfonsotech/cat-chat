var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

  server.listen(5000);

  app.get('/', function(request, response){
    response.sendFile(__dirname + '/index.html');
  });

  io.sockets.on('connection', function(socket){
    socket.on('send message', function(data) {
      io.sockets.emit('new message', data);
    });
  });
