
var initializers = [];

var ChatApp = Backbone.View.extend({

  el: 'body',

  // events: {
  //   'click #submit_form': 'form_submit'
  // },

  initialize: function () {
    for (var i = 0; i < initializers.length; i += 1) {
      initializers[i](this);
    }
  },

  server: io.connect('wss://' + window.location.hostname)

  // form_submit: function(e){
  //   e.preventDefault();
  //   window.ChatApp.server.emit('join', $("#log_in input[name='name']").val(), $("#log_in input[name='gravatarURL']").val() );
  //   $("#log_in input[name='name']").val('');
  //   $("#log_in input[name='gravatarURL']").val('');
  // }
});

ChatApp.onInit = function (initFunc) {
  initializers.push(initFunc);
};
