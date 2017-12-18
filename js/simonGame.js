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
console.log(hov);
var seq = [];
var playerSeq = [];
var count = 0;
var playerCount = 0;
var playerTurn = false;
var timeShow = 1000;
var timeGap = 500;

hov.addEventListener('mousedown', function (e) {
  if (playerTurn) {
    console.log('Player selects: ', e.target.id);
    var colorSelected = document.getElementById(e.target.id);
    colorSelected.classList.add('light');
    playerSeq.push(e.target.id);
    console.log('seq: ', seq);
    console.log('player seq: ', playerSeq);
  }
});
hov.addEventListener('mouseup', function (e) {
  if (playerTurn) {
    console.log(e.target.id);
    console.log('count ', count, 'playercount ', playerCount);
    var colorSelected = document.getElementById(e.target.id);
    colorSelected.classList.remove('light');
    if (!correctMatch(playerCount)) {
      console.log('failed at round ' + (playerCount + 1) + '. Restart!');
      setTimeout(resetGame, 2000);
    } else if (playerSeq.length === seq.length) {
      console.log('Made it through round ' + (count + 1) + '. Next!');
      playerTurn = !playerTurn;
      count++;
      setTimeout(playRound, 2000);
    } else {
      playerCount++;
    }
  }
});

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
  clearTimeout();
  playRound();
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