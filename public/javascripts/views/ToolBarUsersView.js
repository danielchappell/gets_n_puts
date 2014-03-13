
var UsersView = Backbone.View.extend({

  el: '#sm-chat-nav ul',

  collection: new Users,

  // events: {
  // 'click #submit_form':'form_submit'
  // },

  initialize: function(){
    var that = this;
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    this.collection.fetch();
    this.render();
    window.app.server.on('refresh_users', function(){
      that.collection.fetch({reset: true});
      console.log(that.collection);
      that.render();
    });
  },

  render: function(){
    var that = this;
    this.$el.html('');
    this.collection.each(function(user){
      var view = new UserView({model: user});
      view.render();
      that.$el.append(view.$el);
    });
  }

});

