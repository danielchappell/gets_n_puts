
var self = new User({ personName: 'Joseph Chappell', gitHubId: 'photonerddan', gravatarId: "http://www.gravatar.com/avatar/426b9a1c8077d92fb7a15a757d8a85da?s=30"});


var UserView = Backbone.View.extend({

  tagName: 'li',

  className: "online_user",

  template: _.template("<a><img src=<%= gravatarId %> /><span></span></a>"),

  events: {
    "click": "openChatWindow"
  },

  initialize: function(){
    this.listenTo(this.model, "change", this.render);
    this.listenTo(this.model, "destroy", this.remove);
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes));
  },

  openChatWindow: function(){
    var chatWindow = new ChatRoom({selfObject: self, partnerObject: this.model });
    var convo = new ConversationView({model: chatWindow, collection: new Conversation});


  }
});