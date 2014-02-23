
var UserView = Backbone.View.extend({

  tagName:
  'li',

  className: "online_user",

  template: _.template("<a><img src=<%= gravatarId %> /></a>"),

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

  openChatWindow: function(person){
    var chatWindow = new ChatRoom({selfObject: self, partnerObject: this.model });
    var convo = new ConversationView({model: chatWindow, collection: new Conversation() });
  }
});
