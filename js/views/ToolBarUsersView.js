
var UsersView = Backbone.View.extend({

  el: '#sm-chat-nav ul',

  collection: new Users,

  // events: {
  // },

  initialize: function(people){
    this.listenTo(this.collection, 'add', this.render);
    this.listenTo(this.collection, 'reset', this.render);
    this.listenTo(this.collection, 'remove', this.render);
    this.collection.add(people);
    this.render();
    // this.fetch();
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