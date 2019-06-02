var _ = require('lodash');

var winConditionHook = function (M) {
  var customBoardSettings = M.getCustomBoardSettings(),
    connectAmount = customBoardSettings.connectAmount,
    pieces = M.getPieces(),
    board = getBoardArray(customBoardSettings, pieces);

  if (pieces.length === customBoardSettings.width * customBoardSettings.height) {
    return 'tie';
  }

  var getWhoOccupysSpace = function (pos) {
    if (pos.x < 1 || pos.y < 1
        || pos.x > customBoardSettings.width || pos.y > customBoardSettings.height) {
      return undefined;
    }
    return board[pos.x-1][pos.y-1].occupied;
  };

  var lastTurn = M.getCurrentTurn(),
    playerRel = _.keys(lastTurn.playerTurns)[0],
    droppedToLocation = lastTurn.playerTurns[playerRel].actions[0].metadata.droppedToLocation
    dropXY = toXY(droppedToLocation);

  M.log('Checking if dropping to ' + droppedToLocation + ' is the winning move');

  var checkRecurs = function (pos, xChange, yChange) {
    pos = {x: pos.x + xChange, y: pos.y + yChange};
    var posPlayer = getWhoOccupysSpace(pos);
    M.log(JSON.stringify(pos) + ' ' + JSON.stringify(posPlayer));
    if (!posPlayer || posPlayer != playerRel) {
      return 0;
    }

    return 1 + checkRecurs(pos, xChange, yChange);
  };

  var leftRight = 1 + checkRecurs(dropXY, -1, 0) + checkRecurs(dropXY, 1, 0),
    topBottom = 1 + checkRecurs(dropXY, 0, -1) + checkRecurs(dropXY, 0, 1),
    leftDiag = 1 + checkRecurs(dropXY, -1, 1) + checkRecurs(dropXY, 1, -1),
    rightDiag = 1 + checkRecurs(dropXY, -1, -1) + checkRecurs(dropXY, 1, 1);

  if (leftRight >= connectAmount || topBottom >= connectAmount ||
      leftDiag >= connectAmount || rightDiag >= connectAmount) {
    return playerRel;
  }
};

var getBoardArray = function (customBoardSettings, pieces) {
  var board = [];
  _.times(customBoardSettings.width, function () {
    var row = [];
    _.times(customBoardSettings.height, function () {
      row.push({});
    });
    board.push(row);
  });

  _.each(pieces, function (piece) {
    var l = toXY(piece.locationId);
    board[l.x-1][l.y-1].occupied = piece.ownerId;
  });
  return board;
};

var toXY = function (locationId) {
  var l = locationId.split(',');
  return {x: Number(l[0]), y: Number(l[1])};
};

module.exports = winConditionHook;
