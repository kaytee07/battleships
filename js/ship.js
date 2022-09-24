"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var ships = function ships(id, length) {
  var shipLength = length;
  var name = id;
  var shipHitPos = [];

  var hitPoint = function hitPoint(point) {
    length > 0 ? length-- : "";
    shipHitPos.push(point);
  };

  var isSunk = function isSunk() {
    var isSunken = false;
    if (length === shipHitPos.length) isSunken = true;
    return isSunken;
  };

  return {
    name: name,
    shipLength: shipLength,
    isSunk: isSunk,
    hitPoint: hitPoint,
    shipHitPos: shipHitPos
  };
};

var _default = ships;
exports["default"] = _default;