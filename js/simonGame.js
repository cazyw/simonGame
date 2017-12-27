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


var _game = __webpack_require__(1);

var _game2 = _interopRequireDefault(_game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var audioTones = __webpack_require__(2);
var selector = document.getElementsByClassName('game')[0];
var resetListener = document.getElementsByClassName('resetSwitch')[0];
var strictListener = document.getElementsByClassName('strictSwitch')[0];

var g = new _game2.default();

// listens for when the reset button is clicked
resetListener.addEventListener('click', function (e) {
  resetGame();
});

// listens for when the strict option button is clicked
// STRICT MODE - any error resets the game to the beginning
strictListener.addEventListener('click', function (e) {
  g.strictMode = !g.strictMode;
  if (g.strictMode) {
    document.getElementsByClassName('strictSwitch')[0].classList.add('on');
  } else {
    document.getElementsByClassName('strictSwitch')[0].classList.remove('on');
  }
  resetGame();
});

// using mouse/touch up and down as users can hold down the buttons
// for any length of time (as per example game)
selector.addEventListener('mousedown', function (e) {
  down(e);
});
selector.addEventListener('mouseup', function (e) {
  up(e);
});

selector.addEventListener('touchstart', function (e) {
  down(e);
});
selector.addEventListener('touchend', function (e) {
  up(e);
});

// button down - light up the button and play tone
var down = function down(e) {
  e.preventDefault();
  if (g.playerTurn) {
    var colorSelected = document.getElementById(e.target.id);
    try {
      g.addPlayerMove(e.target.id);
      adding(colorSelected, 'light', e.target.id[3]);
    } catch (e) {}
  }
};

// button up - unlight the button and pause tone
// check if what has been entered is incorrect, 
// wins the game, wins the round
var up = function up(e) {
  e.preventDefault();
  if (g.playerTurn) {
    var colorSelected = document.getElementById(e.target.id);
    try {
      removing(colorSelected, 'light', e.target.id[3]);
      if (!correctMatch(g.playerSeq.length - 1)) {
        setTimeout(roundLost, g.timeGap);
      } else if (g.winGame()) {
        setTimeout(gameWon, g.timeGap);
      } else if (g.winRound()) {
        setTimeout(roundWon, g.timeGap);
      }
    } catch (e) {}
  }
};

// lights up the button and plays a tone
var adding = function adding(obj, classN, audioT) {
  obj.classList.add(classN);
  audioTones.playTone(audioT);
};

// unlights the button and pauses the tone
var removing = function removing(obj, classN, audioT) {
  obj.classList.remove(classN);
  audioTones.pauseTone(audioT);
};

// incorrect guess, also checks if in strict mode
var roundLost = function roundLost() {
  var moveStatus = document.getElementsByClassName('controlPanel')[0];
  adding(moveStatus, 'incorrect', 'incorrect');
  setTimeout(function () {
    removing(moveStatus, 'incorrect', 'incorrect');
  }, g.timeShow);
  g.resetPlayer();
  if (g.strictMode) {
    contentText('counter', 'XX');
    setTimeout(resetGame, g.timeReset);
  } else {
    setTimeout(highlightSeq, g.timeReset, 0);
  }
};

// won the game
var gameWon = function gameWon() {
  document.getElementById('box0').classList.add('correct');
  document.getElementById('box1').classList.add('correct');
  document.getElementById('box2').classList.add('correct');
  document.getElementById('box3').classList.add('correct');
  contentText('heading', 'You Win!');
  contentText('counter', '!!');
  audioTones.playTone('win');
  setTimeout(function () {
    document.getElementById('box0').classList.remove('correct');
    document.getElementById('box1').classList.remove('correct');
    document.getElementById('box2').classList.remove('correct');
    document.getElementById('box3').classList.remove('correct');
    contentText('heading', 'Simon Game');
    contentText('counter', '--');
    resetGame();
  }, g.timeReset);
};

// made it through this round
var roundWon = function roundWon() {
  var moveStatus = document.getElementsByClassName('controlPanel')[0];
  adding(moveStatus, 'correct', 'correct');
  setTimeout(function () {
    removing(moveStatus, 'correct', 'correct');
  }, g.timeShow);
  g.playerTurn = !g.playerTurn;
  setTimeout(startRound, g.timeReset);
};

// the computer highlights the sequence of buttons
var highlightSeq = function highlightSeq(i) {
  var colorSelected = document.getElementById(g.seq[i]);
  if (i < g.seq.length) {
    adding(colorSelected, 'light', g.seq[i][3]);
    setTimeout(function () {
      removing(colorSelected, 'light', g.seq[i][3]);
      setTimeout(function () {
        i++;
        highlightSeq(i);
      }, g.timeGap);
    }, g.timeShow);
  } else {
    playerPlays();
  }
};

var correctMatch = function correctMatch(i) {
  return g.seq[i] === g.playerSeq[i];
};

var contentText = function contentText(classN, input) {
  document.getElementsByClassName(classN)[0].innerHTML = input;
};

var playerPlays = function playerPlays() {
  clearTimeout();
  g.playerTurn = true;
};

var generateRandom = function generateRandom() {
  return Math.floor(Math.random() * 4);
};

var addSeq = function addSeq(button) {
  g.seq.push('box' + button);
};

var startRound = function startRound() {
  var tens = Math.floor((g.seq.length + 1) / 10);
  var ones = Math.floor((g.seq.length + 1) % 10);
  contentText('counter', '' + tens + ones);
  addSeq(generateRandom());
  g.resetPlayer();
  highlightSeq(0);
};

var resetGame = function resetGame() {
  g.reset();
  contentText('counter', '--');
  clearTimeout();
  setTimeout(startRound, g.timeReset);
};

var game = function game() {
  startRound();
};

// when the game loads, play the tones and start the game
audioTones.playTone('win');
setTimeout(game, 2000);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  _createClass(Game, null, [{
    key: "MAX",
    get: function get() {
      return 3;
    }
  }]);

  function Game() {
    _classCallCheck(this, Game);

    this.seq = [];
    this.playerSeq = [];
    this.count = 0;
    this.playerTurn = false;
    this.timeShow = 750;
    this.timeGap = 250;
    this.timeReset = 1500;
    this.strictMode = false;
  }

  _createClass(Game, [{
    key: "reset",
    value: function reset() {
      this.count = 0;
      this.playerTurn = false;
      this.seq = [];
      this.playerSeq = [];
    }
  }, {
    key: "resetPlayer",
    value: function resetPlayer() {
      this.playerSeq = [];
      this.playerTurn = false;
    }
  }, {
    key: "addPlayerMove",
    value: function addPlayerMove(move) {
      this.playerSeq.push(move);
    }
  }, {
    key: "winGame",
    value: function winGame() {
      var MAX = 20;
      return this.playerSeq.length === MAX;
    }
  }, {
    key: "winRound",
    value: function winRound() {
      return this.playerSeq.length === this.seq.length;
    }
  }]);

  return Game;
}();

exports.default = Game;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Module to play the audio for the four buttons and the error / correct choice
// Using Web Audio API and setting the frequencies as this allows the 
// tones to be played for a unset period of time (depending on how long players
// hold the buttons down)

var sound = [164.81, 220.00, 277.18, 329.63, 200, 380];
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();

var osc0 = audioCtx.createOscillator();
osc0.frequency.value = sound[0];
osc0.start(0);

var osc1 = audioCtx.createOscillator();
osc1.frequency.value = sound[1];
osc1.start(0);

var osc2 = audioCtx.createOscillator();
osc2.frequency.value = sound[2];
osc2.start(0);

var osc3 = audioCtx.createOscillator();
osc3.frequency.value = sound[3];
osc3.start(0);

var errorTone = audioCtx.createOscillator();
errorTone.type = 'square';
errorTone.frequency.value = sound[4];
errorTone.start(0);

var correctTone = audioCtx.createOscillator();
correctTone.frequency.value = sound[5];
correctTone.start(0);

var winning = function winning() {
  var n = audioCtx.createOscillator();
  n.frequency.value = 195.998; // G3
  n.connect(audioCtx.destination);

  var b = audioCtx.createOscillator();
  b.frequency.value = 329.628; // E4
  b.connect(audioCtx.destination);

  var c = audioCtx.createOscillator();
  c.frequency.value = 261.626; // C4
  c.connect(audioCtx.destination);

  n.start(audioCtx.currentTime);
  n.stop(audioCtx.currentTime + 0.25);

  b.start(audioCtx.currentTime + 0.5);
  b.stop(audioCtx.currentTime + 0.75);

  c.start(audioCtx.currentTime + 1.0);
  c.stop(audioCtx.currentTime + 1.25);
};

var playTone = function playTone(type) {
  switch (type) {
    case 'win':
      winning();
      break;
    case 'correct':
      correctTone.connect(audioCtx.destination);
      break;
    case 'incorrect':
      errorTone.connect(audioCtx.destination);
      break;
    case '0':
      osc0.connect(audioCtx.destination);
      break;
    case '1':
      osc1.connect(audioCtx.destination);
      break;
    case '2':
      osc2.connect(audioCtx.destination);
      break;
    case '3':
      osc3.connect(audioCtx.destination);
      break;
    default:
      console.log('nothing here');
  }
};

var pauseTone = function pauseTone(type) {
  switch (type) {
    case 'correct':
      correctTone.disconnect(audioCtx.destination);
      break;
    case 'incorrect':
      errorTone.disconnect(audioCtx.destination);
      break;
    case '0':
      osc0.disconnect(audioCtx.destination);
      break;
    case '1':
      osc1.disconnect(audioCtx.destination);
      break;
    case '2':
      osc2.disconnect(audioCtx.destination);
      break;
    case '3':
      osc3.disconnect(audioCtx.destination);
      break;
    default:
      console.log('nothing here');
  }
};

module.exports = {
  playTone: playTone,
  pauseTone: pauseTone
};

/***/ })
/******/ ]);