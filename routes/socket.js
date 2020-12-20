/*
 * Serve content over a socket
 */

var _ = require('lodash');
var jsonfile = require('jsonfile');
var id, datas = {};

module.exports = function (io) {
  return function (socket) {
    socket.on('game:start', function (data) {
      console.log('game:start ' + data.data.id);
      id = data.data.id;
      datas[id] = data;
      data.game.round = 'J';
      io.emit('round:start', data);
    });

    socket.on('round:end', function (data) {
      console.log('round:end ' + data.round);
      if (data.round === 'J') {
        data.round = 'DJ';
        
        // Find the lowest scoring player
        var lowestScore = 0;
        for(var i = 1; i <= 5; i++) {
          var key = "player_" + i;
          if(i === 1) {
            data.control_player = key;
            lowestScore = data[key].score;
          } else if(key in data) {
            if(data[key].score < lowestScore) {
              data.control_player = key;
              lowestScore = data[key].score;
            }
          }
        }

      }
      else if (data.round === 'DJ') {
        data.round = 'FJ';
        data.control_player = undefined;
      }
      else if (data.round === 'FJ') {
        data.round = 'end';

        var file = 'games/' + id + '-' + new Date().getTime() + '.json';
        jsonfile.writeFileSync(file, data, { spaces: 2 });
      }
      datas[id].game = data;
      io.emit('round:start', datas[id]);
    })

    socket.on('board:init', function () {
      console.log('board:init');
      socket.emit('board:init', datas[id]);
    });

    socket.on('game:init', function (data) {
      console.log('game:init ' + data);
      socket.emit('game:init', datas[data]);
    });

    socket.on('clue:start', function (data) {
      console.log('clue:start ' + data);
      socket.broadcast.emit('clue:start', data);
    });

    socket.on('clue:daily', function (data) {
      console.log('clue:daily');
      socket.broadcast.emit('clue:daily', data);
    });

    socket.on('clue:end', function (data) {
      console.log('clue:end');
      datas[id].game = data;
      socket.broadcast.emit('clue:end', data);
    });
  };
};
