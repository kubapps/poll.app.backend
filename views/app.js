var app = angular.module('catsvsdogs', []);
var socket = io.connect({transports:['polling']});

var bg1 = document.getElementById('background-stats-1');
var bg2 = document.getElementById('background-stats-2');
var bg3 = document.getElementById('background-stats-3');
var bg4 = document.getElementById('background-stats-4');
var bg5 = document.getElementById('background-stats-5');

app.controller('statsCtrl', function($scope){
  $scope.aPercent = 20;
  $scope.bPercent = 20;
  $scope.cPercent = 20;
  $scope.dPercent = 20;
  $scope.ePercent = 20;

  var updateScores = function(){
    socket.on('scores', function (json) {
       data = JSON.parse(json);
       var a = parseInt(data.a || 0);
       var b = parseInt(data.b || 0);
       var c = parseInt(data.c || 0);
       var d = parseInt(data.d || 0);
       var e = parseInt(data.e || 0);

       var percentages = getPercentages(a, b, c, d, e);

       bg1.style.width = percentages.a + "%";
       bg2.style.width = percentages.b + "%";
       bg3.style.width = percentages.c + "%";
       bg4.style.width = percentages.d + "%";
       bg5.style.width = percentages.e + "%";

       $scope.$apply(function () {
         $scope.aPercent = percentages.a;
         $scope.bPercent = percentages.b;
         $scope.cPercent = percentages.c;
         $scope.dPercent = percentages.d;
         $scope.ePercent = percentages.e;
         $scope.total = a + b + c + d + e;
       });
    });
  };

  var init = function(){
    document.body.style.opacity=1;
    updateScores();
  };
  socket.on('message',function(data){
    init();
  });
});

function getPercentages(a, b, c, d, e) {
  var result = {};

  if (a + b + c + d + e> 0) {
    result.a = Math.round(a / (a + b + c + d + e) * 100);
    result.b = Math.round(b / (a + b + c + d + e) * 100);
    result.c = Math.round(c / (a + b + c + d + e) * 100);
    result.d = Math.round(d / (a + b + c + d + e) * 100);
    result.e = Math.round(e / (a + b + c + d + e) * 100);
  } else {
    result.a = result.b = result.c = result.d = result.e = 20;
  }

  return result;
}