

var ConversationView = Backbone.View.extend({

  className: 'inner-wrap',

  tagName: 'div',

  chatTemplate: _.template("<section class='conversation'><header class='top-bar'><div class='left'><h1><%= name %></h1></div><div class='right'><div class='chat-close'><img src='http://site-marketing-images.s3.amazonaws.com/2013/odinproject/img/close.png'></div></div></header><ol class='discussion'></ol><div class='enter-message'><input class='send' type='text' placeholder='Enter your message..' /></div></section>"),

  initialize: function(){
    var that = this;
    this.$el.html(this.chatTemplate(this.model.attributes.partnerObject.attributes));
    this.$el.appendTo('.convowrap');
    window.app.server.on('previous_chat', function(messages){
      for(var i = 0; i < messages.length; i++) {
        var messageArray = messages[i].split('***');
        that.collection.add({ sender: messageArray[0], content: messageArray[1]});
      }
      that.loadPersistentMessages();
    });
    window.app.server.emit('open_chat', [this.model.attributes.partnerObject.attributes.gravatarURL], self.attributes.gravatarURL);
    window.app.server.on('message', function(data){
      if (that.model.attributes.partnerObject.attributes.gravatarURL === data.sender ){
      that.collection.add({sender: data.sender, content: data.msg});
      that.render();
      that.$('.top-bar').addClass('new-message');
      that.titleAlert();
      }
    });
    window.app.server.on('user_offline', function(){
      that.collection.add({sender: 'images/server_network.png', content: 'This user is no longer online.'});
    });
    window.app.server.on('incoming_message', function(conversation_members, typist, bool){
      var conversation_partner = [that.model.attributes.partnerObject.attributes.gravatarURL];
      for ( var i = 0; i < conversation_members.length; i++ ) {
        if ( conversation_members[i] === window.self.attributes.gravatarURL ) {
          conversation_members.splice(i, 1);
        }
      }
      conversation_members = conversation_members.sort();
      conversation_partner = conversation_partner.sort();
      for ( var i = 0; i < conversation_members.length; i) {
        for ( var j = 0; j < conversation_partner.length; j ) {
          if ( conversation_members[i] != conversation_partner[j]){
            return;
          }
          i++;
          j++;
        }
      }
      if ( bool ) {
        if ( that.$('.discussion .incoming').length === 0 ) {
          var typingNotification = "<li class='incoming'><div class='avatar'><img src='" + typist.gravatarURL + "'/></div><div class='messages'><p>" + typist.name + " is typing...</p></div></li>";
          that.$('.discussion').append(typingNotification);
          that.scrollToLastMessage();
        }
      }
      else {
        that.$('.incoming').remove()
        that.scrollToLastMessage();
      }
    });
  },

  render: function(){
    var newMessage = this.collection.slice(-1)[0];
    this.appendMessage(newMessage);
    this.scrollToLastMessage();
  },



  events: {
    'keypress .send': 'sendOnEnter',
    'keyup .send': 'emitTypingNotification',
    'click .chat-close': 'closeWindow',
    'click .top-bar': 'toggleChat',
    'click .discussion, .send, .top-bar': 'removeNotifications'
  },

  appendMessage: function(message){
    if(message.attributes.sender === this.model.attributes.selfObject.attributes.gravatarURL ){
      var message_view = new MessageView({model: message, className: 'self'})
      message_view.render();
      this.$('.discussion').append(message_view.$el);
    }
    else{
      var message_view = new MessageView({model: message, className: 'other'});
      message_view.render();
      this.$('.discussion').append(message_view.$el);
        }
  },


  scrollToLastMessage: function(){
   this.$('.discussion').scrollTop($('.discussion li:last-child').offset().top + $('.discussion').scrollTop()  );
  },


  loadPersistentMessages: function(){
    var that = this;
    this.collection.each(function(message){
      that.appendMessage.call( that, message);
    });
    if (this.collection.length > 0){
      console.log(this.collection);
    this.scrollToLastMessage();
    }
},


  sendOnEnter: function(e){
    if( e.keyCode == 13 ){
      if( this.$('.send').val() ){
      this.sendMessage();
      this.removeNotifications();
      }
    }
  },

  sendMessage: function(){
    send = new Message({ sender: self.attributes.gravatarURL, receiver: this.model.attributes.partnerObject.attributes.gravatarURL, content: this.$('.send').val() });
    this.collection.add(send);
    this.render();
    window.app.server.emit('message', send.attributes['content'],[send.attributes['receiver']], send.attributes['sender'])
    this.$('.send').val('');
    this.emitTypingNotification();
  },

  toggleChat: function(e){
    e.preventDefault();
    this.$('.discussion').toggle();
    if( $('.discussion').attr('display') != "none" ) {
      this.scrollToLastMessage();
    }
  },

  closeWindow: function(e){
   e.preventDefault();
   e.stopPropagation();
   this.model.destroy();
   this.collection.reset();
   window.app.server.removeAllListeners();
   this.remove();
   console.log('on close', this.collection);
 },

  removeNotifications: function(e){
    this.$('.top-bar').removeClass('new-message');
    if ( window.titleNotification.notified ){
       this.clearTitleNotification();
    }
  },

  emitTypingNotification: function(e){
    if ( this.$('.send').val() != ""){
    window.app.server.emit( 'user_typing', [this.model.attributes.partnerObject.attributes.gravatarURL], self.attributes, true );
    }
    else {
    window.app.server.emit( 'user_typing', [this.model.attributes.partnerObject.attributes.gravatarURL], self.attributes, false );
    }
  },

  clearTitleNotification: function() {
    window.clearAlert();
    $('html title').html( window.titleNotification.pageTitle );
    window.titleNotification.notified = false;
  },

  titleAlert: function(){
    if (!window.titleNotification.notified){
      var alert = "Pending ** " + this.model.attributes.partnerObject.attributes.name;
      var setAlert = function(){
        if ( $('html title').html() === window.titleNotification.pageTitle ) {
          $('html title').html(alert);
        }
        else {
          $('html title').html( window.titleNotification.pageTitle );
        }
      };

        var titleAlert = setInterval(setAlert, 2200);

      window.clearAlert = function(){
        clearInterval(titleAlert);
      }

      window.titleNotification.notified = true;
    }
  }
});