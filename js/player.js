"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ship = _interopRequireDefault(require("./ship.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var player = function player(computer, id) {
  var name = id || "computer";
  var isComputer = computer;
  var currShip = 0;
  var playerShips = [(0, _ship["default"])("cruiser", 5), (0, _ship["default"])("bomber", 4), (0, _ship["default"])("battle", 3), (0, _ship["default"])("sub", 3), (0, _ship["default"])("boat", 2)];
  return {
    name: name,
    isComputer: isComputer,
    playerShips: playerShips,
    currShip: currShip
  };
};

var _default = player;
exports["default"] = _default;