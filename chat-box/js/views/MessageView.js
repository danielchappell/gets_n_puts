
MessageView = Backbone.View.extend({

  tagName: 'li',

  template: _.template("<div class='avatar'><img src=<%= sender.attributes.gravatarId %> /></div><div class='messages'><p><%= content %></p><time><%= this.model.timeElapsed() %></time></div>"),

  // events: {},

  initialize: function(){
    // this.listenTo(this.model, "change", this.render);
  },

  render: function(){
    this.$el.html(this.template(this.model.attributes));
  }
});