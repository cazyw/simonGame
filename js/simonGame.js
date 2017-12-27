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
var sound = [164.81, 220.00, 277.18, 329.63, 90, 380];

var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var osc0 = audioCtx.createOscillator();
osc0.type = 'square';
osc0.frequency.value = sound[0];
osc0.start(0);

var osc1 = audioCtx.createOscillator();
osc1.type = 'square';
osc1.frequency.value = sound[1];
osc1.start(0);

var osc2 = audioCtx.createOscillator();
osc2.type = 'square';
osc2.frequency.value = sound[2];
osc2.start(0);

var osc3 = audioCtx.createOscillator();
osc3.type = 'square';
osc3.frequency.value = sound[3];
osc3.start(0);

var errorTone = audioCtx.createOscillator();
errorTone.type = 'square';
errorTone.frequency.value = sound[4];
errorTone.start(0);

var correctTone = audioCtx.createOscillator();
correctTone.type = 'square';
correctTone.frequency.value = sound[5];
correctTone.start(0);

// osc.disconnect(audioCtx.destination);

resetListener.addEventListener('click', function (e) {
  resetGame();
});

strictListener.addEventListener('click', function (e) {
  strictMode = !strictMode;
  if (strictMode) {
    document.getElementsByClassName('strictSwitch')[0].classList.add('on');
  } else {
    document.getElementsByClassName('strictSwitch')[0].classList.remove('on');
  }
  console.log('strict mode = ' + strictMode);
  resetGame();
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
  e.preventDefault();
  if (playerTurn) {
    console.log('Player selects: ', e.target.id);
    var colorSelected = document.getElementById(e.target.id);
    try {
      colorSelected.classList.add('light');
      playerSeq.push(e.target.id);
      console.log('seq: ', seq);
      console.log('player seq: ', playerSeq);
      eval('osc' + Number(e.target.id[3])).connect(audioCtx.destination);
    } catch (e) {}
  }
};

var up = function up(e) {
  e.preventDefault();
  if (playerTurn) {
    console.log(e.target.id);
    console.log('count ', count, 'playercount ', playerCount);
    var colorSelected = document.getElementById(e.target.id);
    try {
      eval('osc' + Number(e.target.id[3])).disconnect(audioCtx.destination);
      colorSelected.classList.remove('light');
      if (!correctMatch(playerCount)) {
        setTimeout(function () {
          var moveStatus = document.getElementsByClassName('controlPanel')[0];
          moveStatus.classList.add('wrong');
          errorTone.connect(audioCtx.destination);
          setTimeout(function () {
            clearTimeout();
            moveStatus.classList.remove('wrong');
            errorTone.disconnect(audioCtx.destination);
          }, 500);
          playerTurn = false;
          if (strictMode) {
            console.log('failed at round ' + (playerCount + 1) + '. Restart!');
            document.getElementsByClassName('counter')[0].textContent = 'X X';
            setTimeout(resetGame, timeReset);
          } else {
            console.log('failed at round ' + (playerCount + 1) + '. Retry!');
            playerSeq = [];
            setTimeout(highlightSeq, timeReset, 0);
          }
        }, 250);
      } else if (playerSeq.length === seq.length) {
        if (playerSeq.length === 3) {
          document.getElementById('box0').classList.add('correct');
          document.getElementById('box1').classList.add('correct');
          document.getElementById('box2').classList.add('correct');
          document.getElementById('box3').classList.add('correct');
          document.getElementsByClassName('heading')[0].textContent = 'You Win!';
          document.getElementsByClassName('counter')[0].textContent = '! !';
          clearTimeout();
          setTimeout(function () {
            document.getElementById('box0').classList.remove('correct');
            document.getElementById('box1').classList.remove('correct');
            document.getElementById('box2').classList.remove('correct');
            document.getElementById('box3').classList.remove('correct');
            document.getElementsByClassName('heading')[0].textContent = 'Simon Game';
            document.getElementsByClassName('counter')[0].textContent = '- -';
            clearTimeout();
            resetGame();
          }, 2000);
        } else {
          setTimeout(function () {
            var moveStatus = document.getElementsByClassName('controlPanel')[0];
            moveStatus.classList.add('correct');
            correctTone.connect(audioCtx.destination);
            setTimeout(function () {
              clearTimeout();
              moveStatus.classList.remove('correct');
              correctTone.disconnect(audioCtx.destination);
            }, 500);
            clearTimeout();
            console.log('Made it through round ' + (count + 1) + '. Next!');
            playerTurn = !playerTurn;
            count++;
            setTimeout(playRound, timeReset);
          }, 250);
        }
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
    var boxNo = Number(seq[i][3]);
    eval('osc' + boxNo).connect(audioCtx.destination);
    setTimeout(function () {
      colorSelected.classList.remove('light');
      eval('osc' + boxNo).disconnect(audioCtx.destination);
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
  setTimeout(playRound, 1500);
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