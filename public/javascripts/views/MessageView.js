
MessageView = Backbone.View.extend({

  tagName: 'li',

  template: _.template("<div class='avatar'><img src=<%= sender %> /></div><div class='messages'><p><%= content %></p><time><%= this.model.timeElapsed() %></time></div>"),

  // events: {},


  render: function(){
    this.$el.html('');
    this.$el.html(this.template(this.model.attributes));
  }
});