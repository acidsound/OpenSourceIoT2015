Meteor.startup(function () {
  // code to run on server at startup
});
Router.map(function(){
  this.route('getSensor', {
    path: "/sensor/:pin/:status",
    where: "server",
    action: function() {
      Slams.insert({
        timestamp: +new Date(),
        pin: this.params.pin,
        v: this.params.status
      })
      this.response.end("success");
    }
  })
});
