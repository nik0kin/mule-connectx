
module.exports = {
  boardGenerator: require('./code/boardGenerator'),
  actions: {
    'DropToken': require('./actions/DropToken')
  },
  validateTurn: require('./code/validateTurn'),
  winCondition: require('./code/winConditon')
};
