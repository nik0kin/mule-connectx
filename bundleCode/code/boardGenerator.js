var _ = require('lodash');

var boardGeneratorHook = function (customBoardSettings) {
  var board = [];

  _.times(customBoardSettings.width, function (x) {
    _.times(customBoardSettings.height, function (y) {
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

  return Promise.resolve(board);
};

module.exports = boardGeneratorHook;

var getSpaceId = function (x, y) {
  return (x+1) + ',' + (y+1);
};
