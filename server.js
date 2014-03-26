
//node chat server

var express = require('express');
var redis = require('redis');
var app = express();
var io = require('socket.io').listen(app.listen(process.env.PORT || 5000));
var loggedON = [];
var sockets = {};


if (process.env.REDISTOGO_URL) {
  var rtg = require("url").parse(process.env.REDISTOGO_URL);
  var redisClient = redis.createClient(rtg.port, rtg.hostname);
  redisClient.auth(rtg.auth.split(":")[1]);
}
else {
  var redisClient = redis.createClient();
}


redisClient.on("error", function (err) {
  console.log("Error " + err);
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendfile(__dirname + '/index.html');
});



io.sockets.on('connection', function(client){
  client.on('join', function(name, gravatarURL){
    var loggedIN = false;
    for( var i = 0; i < loggedON.length; i++) {
      if( gravatarURL === loggedON[i]['gravatarURL']) {
        loggedIN = true;
      }
    }
    if(!loggedIN) {
      sockets[gravatarURL] = {'name': name, 'client': [client]};
      loggedON.push({'name': name, 'gravatarURL': gravatarURL});
      client.broadcast.emit('user_logged_on', name, gravatarURL);
    }
    else{
      sockets[gravatarURL]['client'] = sockets[gravatarURL]['client'].concat(client);
    }

    client.emit('current_users', loggedON);


    client.on('open_chat', function(rgravatars, sgravatar){
      var conversation_key = rgravatars.concat(sgravatar).sort().join('');
      redisClient.lrange(conversation_key, 0, -1, function(err, messages){
        if (err) {
          console.log ('ERROR: ' + err);
        }
        else {
          client.emit('previous_chat', messages);
        }
      });
    });

    client.on('user_typing', function( conversation_partners_URLS, sender_object, bool){
      var conversation_members = conversation_partners_URLS.concat(sender_object['gravatarURL']);
      for (var i = 0; i < conversation_partners_URLS.length; i++) {
        if ( sockets.hasOwnProperty(conversation_partners_URLS[i]) ) {
          for( var j = 0; j < sockets[conversation_partners_URLS[i]]['client'].length; j++ ){
            if ( bool ) {
              sockets[conversation_partners_URLS[i]]['client'][j].emit('incoming_message', conversation_members, sender_object, true);
            }
            else {
              sockets[conversation_partners_URLS[i]]['client'][j].emit('incoming_message', conversation_members, sender_object, false);
            }
          }
        }
      }
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
        });
      for (var i = 0; i < rgravatars.length; i++) {
        if ( sockets.hasOwnProperty(rgravatars[i]) ) {
          console.log(sockets[rgravatars[i]]['client']);
          for( var j = 0; j < sockets[rgravatars[i]]['client'].length; j++ ){
            sockets[rgravatars[i]]['client'][j].emit('message', { msg: msg, sender: sgravatar });
          }
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
      if( sockets[gravatarURL]['client'].length < 2 ){
      client.broadcast.emit('user_logged_off', name, gravatarURL);
      }
      for (var i = 0; i < sockets[gravatarURL]['client'].length; i++){
        if (sockets[gravatarURL]['client'][i] === client){
          sockets[gravatarURL]['client'].splice(i, 1);
        }
      }
      if (sockets[gravatarURL]['client'].length === 0) {
        delete sockets[gravatarURL];
      }
    });
  });
});


