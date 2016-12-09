var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
var nicknames = [];

port = process.env.PORT || 5000,
server.listen(port);

app.get('/', function(request, response){
  response.sendFile(__dirname + '/index.html');
});


// app.use(express.static('public'))
//
// app.use('/static', express.static(path.join(__dirname, 'public')))

io.sockets.on('connection', function(socket){
  socket.on('new user', function(data, callback){
  if (nicknames.indexOf(data) != -1) {
    callback(false);
  } else {
    callback(true);
    socket.nickname = data;
    nicknames.push(socket.nickname);
    updateNicknames();
  }
});
function updateNicknames() {
  io.sockets.emit('usernames', nicknames);
}
socket.on('disconnect', function(data) {
  if(!socket.nickname) return;
  nicknames.splice(nicknames.indexOf(socket.nickname), 1);
  updateNicknames();
})
  socket.on('send message', function(data) {
    io.sockets.emit('new message', {msg: data, nick: socket.nickname});
  });
});
