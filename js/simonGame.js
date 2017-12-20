/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hov = document.getElementsByClassName('game')[0];
var resetListener = document.getElementsByClassName('resetSwitch')[0];
var strictListener = document.getElementsByClassName('strictSwitch')[0];
console.log(hov);
var seq = [];
var playerSeq = [];
var count = 0;
var playerCount = 0;
var playerTurn = false;
var timeShow = 750;
var timeGap = 250;
var timeReset = 2000;
var strictMode = false;

var audio = void 0;

resetListener.addEventListener('click', function (e) {
  resetGame();
});

strictListener.addEventListener('click', function (e) {
  strictMode = !strictMode;
  console.log('strict mode = ' + strictMode);
});

hov.addEventListener('mousedown', function (e) {
  down(e);
});
hov.addEventListener('mouseup', function (e) {
  up(e);
});

hov.addEventListener('touchstart', function (e) {
  down(e);
});
hov.addEventListener('touchend', function (e) {
  up(e);
});

var down = function down(e) {
  if (playerTurn) {
    console.log('Player selects: ', e.target.id);
    var colorSelected = document.getElementById(e.target.id);
    try {
      colorSelected.classList.add('light');
      playerSeq.push(e.target.id);
      console.log('seq: ', seq);
      console.log('player seq: ', playerSeq);
    } catch (e) {}
  }
};

var up = function up(e) {
  if (playerTurn) {
    console.log(e.target.id);
    console.log('count ', count, 'playercount ', playerCount);
    var colorSelected = document.getElementById(e.target.id);
    try {
      colorSelected.classList.remove('light');
      if (!correctMatch(playerCount)) {
        var moveStatus = document.getElementsByClassName('controlPanel')[0];
        moveStatus.classList.add('wrong');
        setTimeout(function () {
          moveStatus.classList.remove('wrong');
        }, 250);
        playerTurn = false;
        if (strictMode) {
          console.log('failed at round ' + (playerCount + 1) + '. Restart!');
          setTimeout(resetGame, timeReset);
        } else {
          console.log('failed at round ' + (playerCount + 1) + '. Retry!');
          playerSeq = [];
          setTimeout(highlightSeq, timeReset, 0);
        }
      } else if (playerSeq.length === seq.length) {
        var _moveStatus = document.getElementsByClassName('controlPanel')[0];
        _moveStatus.classList.add('correct');
        setTimeout(function () {
          _moveStatus.classList.remove('correct');
        }, 250);
        clearTimeout();
        console.log('Made it through round ' + (count + 1) + '. Next!');
        playerTurn = !playerTurn;
        count++;
        setTimeout(playRound, timeReset);
      } else {
        playerCount++;
      }
    } catch (e) {}
  }
};

var generateRandom = function generateRandom() {
  return Math.floor(Math.random() * 4);
};

var addSeq = function addSeq(button) {
  seq.push('box' + button);
};

var highlightSeq = function highlightSeq(i) {
  var colorSelected = document.getElementById(seq[i]);
  console.log('highlightSeq ', seq[i]);
  if (i < seq.length) {
    colorSelected.classList.add('light');
    setTimeout(function () {
      colorSelected.classList.remove('light');
      setTimeout(function () {
        i++;
        highlightSeq(i);
      }, timeGap);
    }, timeShow);
  } else {
    playerPlays();
  }
};

var resetGame = function resetGame() {
  count = 0;
  playerCount = 0;
  playerTurn = false;
  seq = [];
  playerSeq = [];
  document.getElementsByClassName('counter')[0].innerHTML = '- -';
  clearTimeout();
  setTimeout(playRound, 1000);
};

var correctMatch = function correctMatch(i) {
  console.log('count ' + i + ', expect ' + seq[i] + ', actual ' + playerSeq[i] + ' ');
  return seq[i] === playerSeq[i];
};

var playerPlays = function playerPlays() {
  clearTimeout();
  console.log('in playerPlays');
  playerTurn = true;
  playerCount = 0;
};

var playRound = function playRound() {
  console.log('Round ', count + 1, 'count ', count);
  var counter = document.getElementsByClassName('counter')[0];
  var tens = Math.floor((count + 1) / 10);
  var ones = Math.floor((count + 1) % 10);
  counter.innerHTML = tens + ' ' + ones;
  addSeq(generateRandom());
  console.log(seq);
  playerSeq = [];
  playerTurn = false;
  highlightSeq(0);
};

var game = function game() {
  console.log(count);
  console.log('start game');
  playRound();
};

setTimeout(game, 1000);

/***/ })
/******/ ]);