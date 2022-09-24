"use strict";

var _gamePlay = _interopRequireDefault(require("./gamePlay.js"));

var _player = _interopRequireDefault(require("./player.js"));

var _gameBoard = _interopRequireDefault(require("./gameBoard.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DOM = function () {
  var newGame = (0, _gamePlay["default"])();

  function setPlayers(input) {
    newGame.player1 = (0, _player["default"])(false, input);
    newGame.player2 = (0, _player["default"])(true);
  } //!push ship to board


  function throughBoard(highLIghted) {
    var box = document.querySelectorAll(".box");

    for (var j = 0; j < box.length; j++) {
      if (highLIghted === box[j].getAttribute("point")) return box[j];
    }
  }

  function isSpaceOccupied(all) {
    var dontAdd = false;
    all.some(function (elem) {
      if (elem.style.backgroundColor === "#a4c3b2") dontAdd = true;
    });
    return dontAdd;
  } // create players and board


  function setBoards() {
    newGame.gameBoard1 = (0, _gameBoard["default"])();
    newGame.gameBoard2 = (0, _gameBoard["default"])();
  } //! render UIs
  //!render places ship UI


  function renderShipsOnBoard() {
    var strtGme = document.querySelector(".start_game");
    var btn = document.createElement("button");
    var header = document.createElement("h3");
    strtGme.classList.add("reduceheight");
    header.classList.add("placeship");
    btn.classList.add("btn");
    header.innerHTML = "Place your ships";
    btn.innerHTML = newGame.gameBoard1.isYaxis ? "horizontal" : "vertical";
    strtGme.innerHTML = "";
    strtGme.append(header);
    strtGme.append(btn);
    renderBoard();
    setShipListener();
  }

  function getPLaceshipsP1(input) {
    var box = document.querySelectorAll("div.first > .box");
    box.forEach(function (elem) {
      if (elem.getAttribute("point") === input) {
        elem.style.backgroundColor = "gray";
      }
    });
  } //! remove comment to view comnputer ship positions
  // function getPLaceshipsP2(input){
  //     let box = document.querySelectorAll("div.second > .box")
  //     box.forEach(elem => {
  //         if(elem.getAttribute("point") === input){
  //             elem.style.backgroundColor = "green"
  //         }
  //     })
  // }   


  function renderGamePlay1() {
    var games = document.querySelector(".games");
    var start = document.querySelector(".start_game");
    start.innerHTML = "";
    games.innerHTML = "";
    renderBoard();
    start.classList.remove("reduceheight");
    start.classList.add("noheight");
    start.style.height = "0px !important";
    var grid = document.querySelector(".grid-box");
    grid.classList.add('first');
    newGame.gameBoard1.allspot.forEach(function (elem) {
      getPLaceshipsP1("".concat(elem.point));
    });
  }

  function renderGamePlay2() {
    var games = document.querySelector(".games");
    renderBoard();
    games.lastElementChild.classList.add("second");
    var box = document.querySelectorAll("div.second > .box"); // newGame.gameBoard2.allspot.forEach(elem => {
    //     getPLaceshipsP2(`${elem.point}`)
    //  })

    board1Listener();
  }

  function renderBoard() {
    var width = 10;
    var height = 10;
    var games = document.querySelector(".games");
    var space = document.createElement("div");
    space.classList.add("grid-box");

    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        var temp = document.createElement("div");
        temp.classList.add("box");
        temp.setAttribute("point", "".concat(i, ",").concat(j));
        space.append(temp);
      }
    }

    games.append(space);
  }

  function setCompShip() {
    var random = randNum();

    function recur(num) {
      if (num >= newGame.player2.playerShips.length) return;
      var staticLIst = random[num];
      var bool = [true, false];
      var isYaxis = bool[Math.floor(Math.random() * 1)];
      var player = newGame.player2;
      var currShip = player.playerShips[num];
      var incrementNum = Math.floor(Math.random() * 10);
      var change = incrementNum + currShip.shipLength >= 9 ? incrementNum - currShip.shipLength : incrementNum;

      for (var i = 0; i < currShip.shipLength; i++) {
        if (isYaxis) {
          newGame.gameBoard2.shipGridSpot(currShip.name, parseInt(change, 10) + i, staticLIst);
        }

        if (!isYaxis) {
          newGame.gameBoard2.shipGridSpot(currShip.name, staticLIst, parseInt(change, 10) + i);
        }
      }

      num++;
      recur(num);
    }

    recur(0);
  }

  function randNum() {
    var randNum = [];
    var pull = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    function checkNo(count, length) {
      var counter = count;
      var size = length;
      var rand = Math.floor(Math.random() * size);
      if (counter > 5) return;
      randNum.push(pull[rand]);
      pull.splice(rand, 1);
      counter++;
      size--;
      checkNo(counter, size);
    }

    checkNo(1, 9);
    return randNum;
  } //!listeners


  function endListener() {
    var start = document.querySelector(".start");
    start.addEventListener("click", function () {
      location.reload();
    });
  }

  function setShipListener(g) {
    var box = document.querySelectorAll(".box");
    var button = document.querySelector(".btn");
    button.addEventListener("click", function () {
      if (newGame.gameBoard1.isYaxis) {
        newGame.gameBoard1.isYaxis = false;
        button.innerHTML = 'vertical';
        return;
      }

      if (newGame.gameBoard1.isYaxis === false) {
        newGame.gameBoard1.isYaxis = true;
        button.innerHTML = 'horizontal';
        return;
      }
    }); //! on mouse hover add highlight on area for ship

    box.forEach(function (elem) {
      elem.addEventListener("mouseover", function () {
        var shipNo = newGame.player1.currShip;
        var currShipLen = newGame.player1.playerShips[shipNo].shipLength;
        var yAxis = parseInt(elem.getAttribute("point")[0], 10);
        var xAxis = parseInt(elem.getAttribute("point")[2], 10);
        var all = [];

        if (newGame.gameBoard1.isYaxis) {
          for (var i = 0; i < currShipLen; i++) {
            all.push(throughBoard("".concat(yAxis + i, ",").concat(xAxis)));
          }
        }

        if (!newGame.gameBoard1.isYaxis) {
          for (var _i = 0; _i < currShipLen; _i++) {
            all.push(throughBoard("".concat(yAxis, ",").concat(xAxis + _i)));
          }
        }

        all.forEach(function (elem) {
          if (elem) elem.classList.add("addgray");
          return;
        });
      });
    }); //! on mouse leave remove highlight on area for ship

    box.forEach(function (elem) {
      elem.addEventListener("mouseleave", function () {
        var shipNo = newGame.player1.currShip;
        var currShipLen = newGame.player1.playerShips[shipNo].shipLength;
        var yAxis = parseInt(elem.getAttribute("point")[0], 10);
        var xAxis = parseInt(elem.getAttribute("point")[2], 10);
        var all = [];

        if (newGame.gameBoard1.isYaxis) {
          for (var i = 0; i < currShipLen; i++) {
            all.push(throughBoard("".concat(yAxis + i, ",").concat(xAxis)));
          }
        }

        if (!newGame.gameBoard1.isYaxis) {
          for (var _i2 = 0; _i2 < currShipLen; _i2++) {
            all.push(throughBoard("".concat(yAxis, ",").concat(xAxis + _i2)));
          }
        }

        all.forEach(function (elem) {
          if (elem) elem.classList.remove("addgray");
          return;
        });
      });
    }); //! on mouse click add highlight on area for ship

    box.forEach(function (elem) {
      elem.addEventListener("click", function () {
        var player = newGame.player1;
        var shipNo = newGame.player1.currShip;
        var yAxis = parseInt(elem.getAttribute("point")[0], 10);
        var xAxis = parseInt(elem.getAttribute("point")[2], 10);
        var all = [];
        var currType = newGame.player1.playerShips[shipNo].name;
        var currShipLen = newGame.player1.playerShips[shipNo].shipLength;

        if (newGame.gameBoard1.isYaxis) {
          for (var i = 0; i < currShipLen; i++) {
            all.push(throughBoard("".concat(yAxis + i, ",").concat(xAxis)));
          }
        }

        if (!newGame.gameBoard1.isYaxis) {
          for (var _i3 = 0; _i3 < currShipLen; _i3++) {
            all.push(throughBoard("".concat(yAxis, ",").concat(xAxis + _i3)));
          }
        }

        if (all.indexOf(undefined) !== -1) return;
        if (isSpaceOccupied(all)) return;
        all.forEach(function (elem) {
          newGame.gameBoard1.shipGridSpot(currType, elem.getAttribute("point")[0], elem.getAttribute("point")[2]);
          elem.style.background = "gray";
        });
        newGame.player1.currShip++;

        if (shipNo >= player.playerShips.length - 1) {
          renderGamePlay1();
          renderGamePlay2();
          return;
        }
      });
    });
  }

  function board1Listener() {
    var tab = document.querySelectorAll(".second > .box");
    tab.forEach(function (elem) {
      elem.addEventListener("click", function () {
        var hit = newGame.gameBoard2.receiveAttack(elem.getAttribute("point"));
        newGame.player2.playerShips.forEach(function (elem) {
          if (!hit.name) return;

          if (elem.name === hit.name) {
            elem.hitPoint(hit.point);
            elem.shipHitPos.forEach(function (elem) {
              hitSpot(elem).style.backgroundColor = '#d62828';
            });
          }
        });
        newGame.gameBoard2.missedAttack.forEach(function (elem) {
          missSpot(elem).style.backgroundColor = '#f77f00';
        });
        isGameOver(newGame.player1.name, newGame.gameBoard2);
        setTimeout(function () {
          playP2();
        }, 500);
      });
    });
  } //!function needed


  function hitSpot(pain) {
    var box = document.querySelectorAll(".second > .box ");

    for (var j = 0; j < box.length; j++) {
      if (pain === box[j].getAttribute("point")) return box[j];
    }
  }

  function newHitSpot(pain) {
    var box = document.querySelectorAll(".first > .box ");

    for (var j = 0; j < box.length; j++) {
      if (pain === box[j].getAttribute("point")) return box[j];
    }
  }

  function missSpot(pain) {
    var box = document.querySelectorAll(".second > .box ");

    for (var j = 0; j < box.length; j++) {
      if (pain === box[j].getAttribute("point")) return box[j];
    }
  }

  function newMissSpot(pain) {
    var box = document.querySelectorAll(".first > .box ");

    for (var j = 0; j < box.length; j++) {
      if (pain === box[j].getAttribute("point")) return box[j];
    }
  }

  function isGameOver(player, gameboard) {
    var cover = document.querySelector(".cover");
    var game = document.querySelector(".endgame");
    var whoWOn = document.querySelector(".whowon");

    if (gameboard.isOver()) {
      cover.style.display = "block";
      game.style.display = "flex";
      whoWOn.innerHTML = "".concat(player, " won!!");
    }

    endListener();
  } //!player two turn in playing 


  function playP2() {
    var box = document.querySelectorAll(".first > .box");
    var select = box[Math.floor(Math.random() * box.length)];
    var alrExstInMis = newGame.gameBoard1.missedAttack.indexOf(select.getAttribute("point"));
    var alrExstInHit = newGame.gameBoard1.hitAttack.indexOf(select.getAttribute("point"));
    if (alrExstInHit >= 0 || alrExstInMis >= 0) playP2();
    var hit = newGame.gameBoard1.receiveAttack(select.getAttribute("point"));
    newGame.player1.playerShips.forEach(function (find) {
      if (find.name === hit.name) {
        find.hitPoint(hit.point);
        find.shipHitPos.forEach(function (elem) {
          newHitSpot(elem).style.backgroundColor = '#d62828';
        });
      } else {
        return;
      }
    });
    newGame.gameBoard1.missedAttack.forEach(function (elem) {
      newMissSpot(elem).style.backgroundColor = '#f77f00';
    });
    isGameOver(newGame.player2.name, newGame.gameBoard1);
  }

  function listeners() {
    var btnStrt = document.querySelector(".btn_start");
    var playerName = document.querySelector(".player_name");
    btnStrt.addEventListener("click", function () {
      setPlayers(playerName.value);
      setBoards("jake");
      renderShipsOnBoard();
      setCompShip(0);
    });
  }

  function init() {
    listeners();
  }

  return {
    init: init
  };
}();

DOM.init();