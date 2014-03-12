
var User = Backbone.Model.extend({

});

ChatApp.onInit(function (app) {
  window.self = new User({
    name: 'Joseph Chappell',
    gravatarURL: "http://www.gravatar.com/avatar/426b9a1c8077d92fb7a15a757d8a85da.png"
  });
});
