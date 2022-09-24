"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _ship = _interopRequireDefault(require("./ship.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var gameBoards = function gameBoards() {
  var allspot = [];
  var isYaxis = true;
  var hitAttack = [];
  var missedAttack = [];

  var toggleAxis = function toggleAxis() {
    isYaxis ? false : true;
  };

  var shipGridSpot = function shipGridSpot(name, y, x) {
    var curr = [];
    allspot.forEach;
    allspot.push({
      name: name,
      point: "".concat(y, ",").concat(x)
    });
    return curr;
  };

  function isOver() {
    if (hitAttack.length < allspot.length) {
      return false;
    }

    return true;
  }

  var receiveAttack = function receiveAttack(point) {
    var hitShip = "";
    if (missedAttack.indexOf(point) !== -1) return;
    if (hitAttack.indexOf(point) !== -1) return;

    var itAmiss = function itAmiss(elem) {
      return point !== elem.point;
    };

    if (allspot.every(itAmiss)) {
      missedAttack.push(point);
    }

    allspot.some(function (elem, index) {
      if (point === elem.point) {
        hitAttack.push(point);
        hitShip = {
          name: elem.name,
          point: point
        };
      }
    });
    return hitShip;
  };

  return {
    toggleAxis: toggleAxis,
    shipGridSpot: shipGridSpot,
    allspot: allspot,
    receiveAttack: receiveAttack,
    isOver: isOver,
    isYaxis: isYaxis,
    missedAttack: missedAttack,
    hitAttack: hitAttack
  };
};

var _default = gameBoards;
exports["default"] = _default;