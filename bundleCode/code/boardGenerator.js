var _ = require('lodash'),
  Q = require('q');

var boardGeneratorHook = function (customBoardSettings) {
  var board = [];

  _(customBoardSettings.width).times(function (x) {
    _(customBoardSettings.height).times(function (y) {
      var newSpace = {
        id: getSpaceId(x,y),
        class: 'SpaceSpace',
        attributes: {
          open: true
        },
        edges: {} //idc
      };
  
      board.push(newSpace);
    });
  });

  return Q(board);
};

module.exports = boardGeneratorHook;

var getSpaceId = function (x, y) {
  return (x+1) + ',' + (y+1);
};
