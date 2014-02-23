

var ConversationView = Backbone.View.extend({

  className: 'conversation',

  tagName: 'section',

  collectionEL: '.discussion',

  chatTemplate: _.template("<header class='top-bar'><div class='left'><h1>Bob</h1></div><div class='right'><span id='chat-close'><img src='http://site-marketing-images.s3.amazonaws.com/2013/odinproject/img/close.png'></span></div></header><ol class='discussion'></ol><div class='enter-message'><input type='text' placeholder='Enter your message..' /></div>"),


  //events: {},

  initialize: function(){
    // this.$el.listenTo(this.collection, 'change', this.render);
    this.$el.html(this.chatTemplate(this.model.attributes));
    this.$el.appendTo('.container');
  },

  render: function(){
    var that = this;
    $(this.collectionEL).html('');
    this.collection.each(function(message){
      if(message.attributes.sender.attributes.gitHubId === that.model.attributes.selfObject.attributes.gitHubId ){
        var message = new MessageView({model: message, className: 'self'})
        message.render();
        $(that.collectionEL).append(message.$el);
      }
      else{
        var message = new MessageView({model: message, className: 'other'});
        message.render();
      $(that.collectionEL).append(message.$el);
      }
    });
  },

  createMessage: function(text){
    send = new Message({ sender: this.model.attributes.selfObject, receiver: this.model.attributes.personObject, content: text});
    this.collection.add(send);
  }
});