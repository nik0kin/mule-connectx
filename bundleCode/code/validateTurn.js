
var validateTurn = function (M, playerRel, actions) {
  if (actions.length > 1) {
    throw 'only one DropToken action allowed per turn in connectX';
  }
};

module.exports = validateTurn;
