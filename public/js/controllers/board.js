'use strict';

angular.module('myApp.controllers').
  controller('BoardCtrl', function ($scope, $timeout, $modal, socket, currencyFilter) {
    socket.emit('board:init');

    socket.on('board:init', function (data) {
      if (data) {
        $scope.data = data.data;
        $scope.game = data.game;
        $scope.scoreHtml = buildScores();
        $scope.scoreHtmlTop = buildScoresTop();
      }
    })

    function buildScores () {
      var count = 3;
      var width = 4;
      var buffer = "";

      if($scope.game.player_4 && $scope.game.player_4.name) {
        count = 4;
        width = 3;

        if($scope.game.player_5 && $scope.game.player_5.name) {
          count = 5;
          width = 2;
          buffer = '<div class="col-md-1 text-center"> </div>'
        }
      }

      var returnValue = '<div class="row">' + buffer;

      for(var i = 1; i <= count; i++) {
        var key = "player_" + i;
        returnValue += '<div class="col-md-' + width + ' text-center">' +
          '<div class="player-name">' +
            (($scope.game[key] && $scope.game[key].name) || 'Player ' + i) +
          '</div><div class="player-score">' +
            currencyFilter(($scope.game[key] && $scope.game[key].score) || 0, '$', 0) +
          '</div>' +
        '</div>';
      }

      returnValue +=  '</div>';

      return returnValue;
    }

    function buildScoresTop() {
      var count = 3;
      var width = 4;
      var buffer = "";

      // Check to see if there are players 4 and 5 there and process accordingly
      if($scope.game.player_4 && $scope.game.player_4.name) {
        count = 4;
        width = 3;

        if($scope.game.player_5 && $scope.game.player_5.name) {
          count = 5;
          width = 2;
          buffer = '<div class="col-md-1 text-center"> </div>'
        }
      }

      var returnValue = '<div class="row">' + buffer;

      for(var i = 1; i <= count; i++) {
        var key = "player_" + i;
        returnValue += '<div class="col-md-' + width + ' text-center">' +
            (($scope.game[key] && $scope.game[key].name) || 'Player ' + i) + ": " + currencyFilter(($scope.game[key] && $scope.game[key].score) || 0, '$', 0) +
        '</div>';
      }

      returnValue +=  '</div>';

      return returnValue;
    }

    socket.on('round:start', function (data) {

      $scope.data = data.data;
      $scope.game = data.game;

      $scope.scoreHtmlTop = buildScoresTop();

      if (modalInstance) {
        modalInstance.close();
      }

      if (data.game.round === 'DJ') {
        openModal();
        $timeout(modalInstance.close, 5000);
      }
      else if (data.game.round === 'FJ') {
        $scope.scoreHtml = buildScores();
      }
      else if (data.game.round === 'end') {
        openModal();
      }
    });

    var modalInstance;
    function openModal (id) {
      if (modalInstance) {
        modalInstance.close();
      }

      modalInstance = $modal.open({
        templateUrl: 'partials/boardclue',
        controller: 'BoardClueCtrl',
        backdrop: 'static',
        size: 'lg',
        openedClass: 'board-modal-open',
        resolve: {
          response: function () {
            return {
              id: id,
              clue: $scope.data[id],
              game: $scope.game,
              scoreHtml: buildScores(),
              scoreHtmlTop: buildScoresTop()
            };
          }
        }
      });
    };

    socket.on('clue:start', function (data) {
      openModal(data);
    });

    socket.on('clue:end', function (data) {
      $scope.game = data;
      if (modalInstance) {
        modalInstance.close();
      }
      $scope.scoreHtmlTop = buildScoresTop();
    });

    // Build websocket URL
    // In our current setup, the buzzer server + the jeopardy
    // server are running on the same server.
    // How we build the URL is far from perfect and not secure.
    // But we assume this game runs in a safe and self-controlled
    // environment.
    // Means: Not intended for internet production traffic.
    var wsURL = "ws://" + window.location.hostname + ":8080/stream"
    console.log("Connecting to Jeopardy game websocket server " + wsURL);
    connectToWebSocket(wsURL);
  });

var lastHit = 0;
var currentTime;

function connectToWebSocket(websocketServerLocation){
  var ws = new WebSocket(websocketServerLocation);

  ws.onopen = function(evt) {
    console.log("WebSocket -> Jeopardy game server: Connection established");
  }
  ws.onerror = function(evt) {
    console.log("WebSocket -> Jeopardy game server: Error -> ", evt);
  }
  ws.onclose = function(){
    console.log("WebSocket -> Jeopardy game server: Connection closed ... Try to reconnect");
    // Try to reconnect in 5 seconds
    setTimeout(function(){connectToWebSocket(websocketServerLocation)}, 5000);
  }

  // When a new message from the WebSocket server comes in ...
  // Mainly if a participant hits one of the buttons
  ws.onmessage = function(evt) {
    currentTime = Math.floor(Date.now() / 1000)
    if (lastHit != 0 && (currentTime - lastHit) < 5) {
      return;
    }
    lastHit = currentTime;

    // The data that was sent by the server
    var message = JSON.parse(evt.data);

    var buttonColor = message.Color

    var el = document.getElementById("button-hit");
    var color = el.style.backgroundColor;

    el.style.backgroundColor = buttonColor;
    el.style.visibility = "visible";

    setTimeout(function(){
      el.style.backgroundColor = "none";
      el.style.visibility = "hidden";
    }, 5000);
  }
}