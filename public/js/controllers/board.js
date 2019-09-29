'use strict';

angular.module('myApp.controllers').
  controller('BoardCtrl', function ($scope, $timeout, $modal, socket, currencyFilter) {
    socket.emit('board:init');

    socket.on('board:init', function (data) {
      if (data) {
        $scope.data = data.data;
        $scope.game = data.game;
        $scope.scoreHtml = buildScores();
      }
    })

    function buildScores () {
      return '<div class="row">' +
          '<div class="col-md-4 text-center">' +
            '<div class="player-name">' +
              (($scope.game.player_1 && $scope.game.player_1.name) || 'Player 1') +
            '</div><div class="player-score">' +
              currencyFilter(($scope.game.player_1 && $scope.game.player_1.score) || 0, '$', 0) +
            '</div>' +
          '</div>' +
          '<div class="col-md-4 text-center">' +
            '<div class="player-name">' +
              (($scope.game.player_2 && $scope.game.player_2.name) || 'Player 2') +
            '</div><div class="player-score">' +
              currencyFilter(($scope.game.player_2 && $scope.game.player_2.score) || 0, '$', 0) +
            '</div>' +
          '</div>' +
          '<div class="col-md-4 text-center">' +
            '<div class="player-name">' +
              (($scope.game.player_3 && $scope.game.player_3.name) || 'Player 3') +
            '</div><div class="player-score">' +
              currencyFilter(($scope.game.player_3 && $scope.game.player_3.score) || 0, '$', 0) +
            '</div>' +
          '</div>' +
        '</div>';
    }

    socket.on('round:start', function (data) {
      if (modalInstance) {
        modalInstance.close();
      }

      $scope.data = data.data;
      $scope.game = data.game;

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
              scoreHtml: buildScores()
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