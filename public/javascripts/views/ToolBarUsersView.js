
var UsersView = Backbone.View.extend({

  el: '#sm-chat-nav ul',

  collection: new Users(),

  // events: {
  // 'click #submit_form':'form_submit'
  // },

  initialize: function(){
    var that = this;
    window.app.server.on('current_users', function(loggedON){
    that.initialRender(loggedON);
    });

    window.app.server.on('user_logged_on', function(name, gravatarURL){
      var model = new User({ name: name, gravatarURL: gravatarURL });
      that.collection.add(model);
      var view = new UserView({model: model});
      view.render();
      that.$el.append(view.$el);
    });

    window.app.server.on('user_logged_off', function(name, gravatarURL){
      that.collection.each(function(user){
        if (gravatarURL === user.attributes.gravatarURL) {
          that.collection.remove(user);
          user.destroy();
        }
      });
    });
  },

  initialRender: function(currently_online){
    var that = this;
    this.$el.html('');
    this.collection.add(currently_online);
    this.collection.each(function(user){
      var view = new UserView({model: user});
      view.render();
      that.$el.append(view.$el);
    });
  }

});

