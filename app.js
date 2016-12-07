var express = require('express'),
  app = express(),
  server = require('http').createServer(app),
  io = require('socket.io').listen(server);

  server.listen(3000);

  app.get('/', function(request, response){
    response.sendfile(__dirname + '/index.html');
  });
