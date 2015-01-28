var _ = require('lodash'),
  Q = require('q');

var validateQ = function (M, actionOwnerRel, actionParams) {
  var xDropLocation = actionParams.xDropLocation,
    width = M.getCustomBoardSettings().width;

  if (!xDropLocation || !(xDropLocation >= 1 && xDropLocation <= width)) {
    throw 'xDropLocation must be in the valid range [1-' + width + ']';
  }

  var topXSpace = M.getSpace(xDropLocation + ',1');

  if (!topXSpace.attributes.open) {
    throw xDropLocation + ' column is full.';
  }
};

var doQ = function (M, actionOwnerRel, actionParams) {
  var xDropLocation = actionParams.xDropLocation,
    height = M.getCustomBoardSettings().height;

  // drop the token by finding the lowest open space in that column
  var dropY = 1,
    dropSpace;
  while (dropY < height && M.getSpace(xDropLocation + ',' + (dropY+1)).attributes.open) {
    dropY++;
  }

  M.addPiece({
    class: 'tokens',
    locationId: xDropLocation + ',' + dropY,
    ownerId: actionOwnerRel,
    attributes: {}
  });

  var droppedIntoSpace = M.getSpace(xDropLocation + ',' + dropY);
  droppedIntoSpace.attributes.open = false;
  M.setSpace(droppedIntoSpace.boardSpaceId, droppedIntoSpace);

  return M.persistQ()
    .then(function () {
      return Q({
        droppedToLocation: xDropLocation + ',' + dropY
      })
    });
};

exports.validateQ = validateQ;
exports.doQ = doQ;
