
var initializers = [];

var ChatApp = Backbone.View.extend({
  initialize: function () {
    for (var i = 0; i < initializers.length; i += 1) {
      initializers[i](this);
    }
  }
});

ChatApp.onInit = function (initFunc) {
  initializers.push(initFunc);
};
