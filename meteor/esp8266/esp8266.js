Logs = new Meteor.Collection('logs');

if (Meteor.isClient) {
  scrollDown = function() {
    var top = $("#content").prop("scrollHeight");
    $("#content").animate({scrollTop: top}, 500);
  }
  Template.main.helpers({
    logs: function () {
      r=Logs.find({});
      r.observe({
        added:function(id) {
          scrollDown();
        }
      });
      return r;
    },
    simpleTime: function(t) {
      return t % 1000000;
    }
  });

  Template.main.events({
    'submit': function(e, tpl) {
      e.preventDefault();
      Meteor.call('sendCommand', tpl.find("input").value);
      tpl.find("input").value="";
      scrollDown();
    },
    'click #reset': function (e) {
      e.preventDefault();
      Meteor.call('resetLogs');
    }
  });
}

if (Meteor.isServer) {
  Future = Npm.require('fibers/future');
  serialPort = new SerialPort("/dev/tty.usbserial", {
    baudrate: 9600
  });
  Meteor.startup(function () {
    // code to run on server at startup
    serialPort.on("open", function() {
      console.log("serial open");
      buf = "";
      var Fiber = Npm.require('fibers');
      serialPort.on("data", function(data) {
        if (data.toString()==='\n') {
          console.log(buf);
          Fiber(function() {
            Meteor.call('addLogs', {
              message: buf,
              timestamp: +new Date()
            });
          }).run();
          buf="";
        } else {
          buf += data.toString();
        }
      });
    });
  });
  Meteor.methods({
    "sendCommand": function(cmd) {
      this.unblock();
      serialPort.write(cmd+'\n', function(err,res) {
        console.log(res);
      });
    },
    "addLogs": function(obj) {
      Logs.insert(obj);
    },
    "resetLogs": function() {
      Logs.remove({});
    }
  })
}
