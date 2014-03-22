
//node chat server

var express = require('express');
var redis = require('redis');
var redisClient = redis.createClient('6379', '127.0.0.1');
var app = express();
var io = require('socket.io').listen(app.listen(process.env.PORT || 5000));
var loggedON = [];
var sockets = {};


redisClient.on("error", function (err) {
        console.log("Error " + err);
    });

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});


io.sockets.on('connection', function(client){
  client.on('join', function(name, gravatarURL){
    sockets[gravatarURL] = {'name': name, 'client': client};
    loggedON.push({'name': name, 'gravatarURL': gravatarURL});
    client.emit('current_users', loggedON);
    client.broadcast.emit('user_logged_on', name, gravatarURL);

    client.on('open_chat', function(rgravatars, sgravatar){
      var conversation_key = rgravatars.concat(sgravatar).sort().join('');
      redisClient.lrange(conversation_key, 0, -1, function(err, reply){
        if (err) {
          console.log ('ERROR: ' + err);
        }
        else {
          client.emit('previous_chat', reply);
        }
      });
    });

    client.on('message', function(msg, rgravatars, sgravatar){

      var conversation_members = rgravatars.concat(sgravatar);
      var conversation_key = conversation_members.sort().join('');
      var value_string = sgravatar + "***" + msg;
      redisClient.multi([
        ['rpush', conversation_key, value_string],
        ['ltrim', conversation_key, 0, 199],
        ['expire', conversation_key, 604800]
        ]).exec(function(err, replies){
          console.log(replies);
        });
      for (var i = 0; i < rgravatars.length; i++) {
        if ( sockets.hasOwnProperty(rgravatars[i]) ) {
          sockets[rgravatars[i]]['client'].emit('message', { msg: msg, sender: sgravatar });
        }
        else {
          client.emit('user_offline');
        }
      }
    });
    client.on('disconnect', function(){
      for( var i = 0; i < loggedON.length; i++) {
        if (loggedON[i]['gravatarURL'] === gravatarURL) {
           loggedON.splice(i, 1);
        }
      }
      client.broadcast.emit('user_logged_off', name, gravatarURL);
      delete sockets[gravatarURL];
    });
  });
});


