var UsersView = Backbone.View.extend({

  el: '#sidebar_users',



  // events: {},

  initialize: function(){
    // this.$el.listenTo(this.collection, 'change' , this.render);
  },

  render: function(){
    var that = this;
    this.$el.html('');
    this.collection.each(function(user){
      var user = new SideBarUser({ model: user, className: 'user'})
      user.render();
      that.$el.append(user.$el);
    });
  }
});