Router.route('/', function () {
  this.render('main');
});

flot1=null;

Template.main.rendered = function () {
  var d1 = [];
  for (var i = 0; i < 12; i += 1) {
    d1.push([i, 0]);
  }
  flot1=$("#flot-1ine").length && $.plot($("#flot-1ine"), [{
    data: d1
  }], {
    series: {
        lines: {
            show: true,
            lineWidth: 2,
            fill: true,
            fillColor: {
                colors: [{
                    opacity: 0.0
                }, {
                    opacity: 0.2
                }]
            }
        },
        points: {
            radius: 5,
            show: true
        },
        grow: {
          active: true,
          steps: 50
        },
        shadowSize: 2
    },
    grid: {
        hoverable: true,
        clickable: true,
        tickColor: "#f0f0f0",
        borderWidth: 1,
        color: '#f0f0f0'
    },
    colors: ["#65bd77"],
    xaxis:{
    },
    yaxis: {
      ticks: 1,
      min: 0,
      max: 1,
    },
    tooltip: true,
    tooltipOpts: {
      content: "chart: %x.1 is %y.4",
      defaultTheme: false,
      shifts: {
        x: 0,
        y: 20
      }
    }
  }
);

};
refreshData=function(data) {
  var d=[];
  for(var i=0,l=data.length-1;i<l;i++) {
    d.push([i, data[i].v]);
  }
  flot1.setData([d]);
  flot1.draw();
};
Template.main.helpers({
  slams: function () {
    console.log("reactive!");
    slams = Slams.find({}, {sort: {timestamp: -1}, limit:13});
    slams.observeChanges({
      addedBefore: function (id, fields, before) {
        // console.log("addedBefore");
        // refreshData(slams.fetch());
      },
      changed: function (id, fields) {
        // console.log("changed");
        // refreshData(slams.fetch());
      },
      movedBefore: function (id, fields) {
        // console.log("movedBefore");
        // refreshData(slams.fetch());
      },
      removed: function (id) {
        console.log("removed");
        refreshData(slams.fetch());
      }
    });
    return slams;
  }
});

Template.main.events({
});
