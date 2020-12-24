'use strict';

angular.module('myApp.controllers').
  controller('GameClueCtrl', function ($scope, $modalInstance, response, socket) {
    $scope.category = response.category;
    $scope.clue = response.clue;
    $scope.game = response.game;
    $scope.result = {
      player_1: {},
      player_2: {},
      player_3: {},
      player_4: {},
      player_5: {},
      dd_player: 'player_1'
    };

    var value = response.id.split('_');
    $scope.result.value = $scope.result.dd_value = parseInt(value[3]) * (value[1] === 'J' ? 200 : 400);

    $scope.setResult = function (num, correct) {
      var key = 'player_' + num;
      $scope.result[key][correct ? 'right' : 'wrong'] = !$scope.result[key][correct ? 'right' : 'wrong'];
      $scope.result[key][correct ? 'wrong' : 'right'] = undefined;

      if ($scope.result[key].right && response.id !== 'clue_FJ') {
        for(var i = 1; i <= 5; i++) {
          if(num !== i) {
            var resultKey = 'player_' + i;
            $scope.result[resultKey].right = undefined;
          }
        }
      }
    };

    $scope.setDDValue = function () {
      $scope.result.value = parseInt($scope.result.dd_value);
      $scope.result.dd_confirm = true;
      console.log('clue:daily emit');
      socket.emit('clue:daily', response.id);
    };

    $scope.setDDResult = function (correct) {
      console.log('setDDResult ' + correct);
      $scope.result.dd_result = correct;
    };

    $scope.ok = function () {
      var result = {};
      if ($scope.clue.daily_double) {
        $scope.result[$scope.result.dd_player] = $scope.result[$scope.result.dd_player] || {};
        $scope.result[$scope.result.dd_player][$scope.result.dd_result ? 'right' : 'wrong'] = true;
      }
      result[response.id] = $scope.result;
      $modalInstance.close(result);
    };

    $scope.cancel = function () {
      $modalInstance.dismiss('cancel');
    };
  });
