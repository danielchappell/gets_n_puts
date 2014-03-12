var Message = Backbone.Model.extend({
  DateTime: new Date,

  timeElapsed: function(){
    var currentTime = new Date;
    // Minutes
    var minutes = Math.floor((currentTime - this.DateTime) / 60000);
    return minutes + ' minutes ago';
  }
});