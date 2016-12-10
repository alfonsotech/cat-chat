$(document).ready(function() {
  var $usernames = $('#usernames');
  var socket = io.connect();
  var $nickForm = $('#set-nickname');
  var $nickError = $('#nick-error');
  var $nickBox = $('#nickname');
  var $messageForm = $('#send-message');
  var $messageBox = $('#message');
  var $chat = $('#chat');

  $nickForm.submit(function(event){
    event.preventDefault();
    socket.emit('new user', $nickBox.val(), function(data){
      if(data){
        $('#nick-wrap').hide();
        $('#content-wrap').removeClass('hidden');
        $('#message-wrap').removeClass('hidden');
      } else {
        $nickError.html('That username is already taken! Try again.');
      }
    });
    $nickBox.val('');
  });

  socket.on('usernames', function(data){
    var html = '';
      for(var i=0; i<data.length; i++){
        html += data[i] + '<br/>';
      }
    $usernames.html(html);
  });

  $messageForm.submit(function(e){
    e.preventDefault();
    socket.emit('send message', $messageBox.val());
    $messageBox.val('');
  });

  socket.on('new message', function(data) {
    $chat.prepend('<b>' + data.nick + ' says: </b> ' + data.msg + '<br/>');
  });

}); //Document ready close
