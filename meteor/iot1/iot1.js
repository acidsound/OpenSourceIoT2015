// deployed at iot1.meteor.com
Logs = new Meteor.Collection("logs");

Router.route('/', function () {
  this.render('main', {
    data: function () {
      return {
        message: Logs.find()
      };
    }
  });
});

if (Meteor.isClient) {
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Logs.remove({});
  });
  Router.map(function(){
    this.route('getSensor', {
      path: "/sensor/:pin/:status",
      where: "server",
      action: function() {
        Logs.insert({
          time: +new Date(),
          pin: this.params.pin,
          status: this.params.status
        })
        this.response.end("success");
      }
    })
  });
}
