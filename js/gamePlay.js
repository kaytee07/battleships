"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _gameBoard = _interopRequireDefault(require("./gameBoard.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var gamePlay = function gamePlay() {
  var isGameWon = false;
  var player1;
  var player2;
  var gameBoard1;
  var gameBoard2;
  var currentPlayer = player1;

  function playerTurn() {
    if (currentPlayer.name === player1.name) {
      currentPlayer = player2;
    }

    if (currentPlayer.name === player2.name) {
      currentPlayer = player1;
    }
  }

  function attackBoard(player, x_axis, y_axis) {
    if (player.name !== gameBoard1.whoseBoard) {
      gameBoard1.receiveAttack(x_axis, y_axis);

      if (gameBoard1.isOver) {
        isGameWon = true;
        return;
      }
    }

    if (player.name !== gameBoard2.whoseBoard) {
      gameBoard2.receiveAttack(x_axis, y_axis);

      if (gameBoard1.isOver) {
        isGameWon = true;
        return;
      }
    }
  }

  function gameWon() {
    if (isGameWon) {}
  }

  return {
    player1: player1,
    player2: player2,
    gameBoard1: gameBoard1,
    gameBoard2: gameBoard2
  };
};

var _default = gamePlay;
exports["default"] = _default;