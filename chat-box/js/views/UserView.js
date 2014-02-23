
var UserView = Backbone.View.extend({

  className: "online_user",

  template: _.template("<%= firstName %>"),

  // events: {},

  initialize: function(){
    // this.listenTo(this.model, "change", this.render);
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes));
  }
});