//node chat server

var express = require('express'),
app = express();
io = require('socket.io').listen(app.listen(8080)),
redisClient = require('redis'),
loggedON = [],
sockets = {};


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});

app.get('/users', function(req, res){
  res.json(loggedON);
});

io.sockets.on('connection', function(client){
  client.on('join', function(name, gravatarURL){
    console.log(loggedON);
    sockets[gravatarURL] = {'name': name, 'client': client}
    loggedON.push({'name': name, 'gravatarURL': gravatarURL})
    client.broadcast.emit('refresh_users');

    // client.on('disconnect', function(){
    //   for( var = i; i < loggedON.length; i++) {
    //     if loggedON[i]['gravatarURL'] === gravatarURL
    //   }
    //   delete loggedON[gravatarURL];
    //   client.broadcast.emit('refresh_users');
    // });
  });
client.on('message', function(msg, rgravatars, sgravatar){
  console.log('msg: ' + msg );
  console.log('sender: ' + sgravatar);
  console.log('reciever: ' + rgravatars);
  for (var i = 0; i < rgravatars.length; i++) {
    sockets[rgravatars[i]]['client'].emit('message', { msg: msg, sender: sgravatar });
  }
});
});


