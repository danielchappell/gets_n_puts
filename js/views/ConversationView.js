

var ConversationView = Backbone.View.extend({

  className: 'convowrap',

  tagName: 'div',

  collectionEL: '.discussion',

  chatTemplate: _.template("<section class='conversation'><header class='top-bar'><div class='left'><h1><%= personName %></h1></div><div class='right'><span id='chat-close'><img src='http://site-marketing-images.s3.amazonaws.com/2013/odinproject/img/close.png'></span></div></header><ol class='discussion'></ol><div class='enter-message'><input class='send' type='text' placeholder='Enter your message..' /></div></section>"),



  initialize: function(){
    this.$el.html(this.chatTemplate(this.model.attributes.partnerObject.attributes));
    this.$el.appendTo('.content');
    this.listenTo(this.collection, 'add', this.render);
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
    $(this.collectionEL).scrollTop($(this.collectionEL).offset().top);
  },


  events: {
    'keypress .send': 'sendOnEnter'
  },

  sendOnEnter: function(e){
    if( e.keyCode == 13 ){
      if( this.$('input').val() ){
      this.sendMessage();
      }
    }
  },

  sendMessage: function(){

    send = new Message({ sender: self, receiver: this.model.attributes.partnerObject, content: this.$('input').val() });
    this.collection.add(send);
    this.$('input').val('');
  }

});