

var ConversationView = Backbone.View.extend({

  className: 'inner-wrap',

  tagName: 'div',

  chatTemplate: _.template("<section class='conversation'><header class='top-bar'><div class='left'><h1><%= name %></h1></div><div class='right'><span class='chat-close'><img src='http://site-marketing-images.s3.amazonaws.com/2013/odinproject/img/close.png'></span></div></header><ol class='discussion'></ol><div class='enter-message'><input class='send' type='text' placeholder='Enter your message..' /></div></section>"),



  initialize: function(){
    var that = this;
    this.$el.html(this.chatTemplate(this.model.attributes.partnerObject.attributes));
    this.$el.appendTo('.convowrap');
    this.listenTo(this.collection, 'add', this.render);
    window.app.server.on('message', function(data){
      if (that.model.attributes.partnerObject.attributes.gravatarURL === data.sender ){
      that.collection.add({sender: data.sender, content: data.msg})
      }
    });
  },

  render: function(){
    var that = this;
    this.$('.discussion').html('');
    this.collection.each(function(message){
      if(message.sender === that.model.attributes.selfObject.attributes.gravatarURL ){
        var message = new MessageView({model: message, className: 'self'})
        message.render();
        that.$('.discussion').append(message.$el);
      }
      else{
        var message = new MessageView({model: message, className: 'other'});
        message.render();
        that.$('.discussion').append(message.$el);
      }
      this.$('.discussion').scrollTop($('.discussion li:last-child').offset().top);
    });
},


  events: {
    'keypress .send': 'sendOnEnter',
    'click .top-bar': 'toggleChat',
    'click .chat-close': 'closeWindow'
  },

  sendOnEnter: function(e){
    if( e.keyCode == 13 ){
      if( this.$('.send').val() ){
      this.sendMessage();
      }
    }
  },

  sendMessage: function(){
    send = new Message({ sender: self.attributes.gravatarURL, receiver: this.model.attributes.partnerObject.attributes.gravatarURL, content: this.$('.send').val() });
    console.log(send.attributes);
    this.collection.add(send);
    window.app.server.emit('message', send.attributes['content'],[send.attributes['receiver']], send.attributes['sender'])
    this.$('.send').val('');
  },

  toggleChat: function(e){
    e.preventDefault();
    this.$('.discussion').toggle();
  },

  closeWindow: function(e){
   e.preventDefault();
   this.remove();
 }

});