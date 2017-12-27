import Game from './game.js';
const audioTones = require('./audioTones.js');
const selector = document.getElementsByClassName('game')[0];
const resetListener = document.getElementsByClassName('resetSwitch')[0];
const strictListener = document.getElementsByClassName('strictSwitch')[0];

let g = new Game();

// listens for when the reset button is clicked
resetListener.addEventListener('click', (e) => {
  resetGame();
});

// listens for when the strict option button is clicked
// STRICT MODE - any error resets the game to the beginning
strictListener.addEventListener('click', (e) => {
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
selector.addEventListener('mousedown', (e) => {
  down(e);
});
selector.addEventListener('mouseup', (e) => {
  up(e);
});

selector.addEventListener('touchstart', (e) => {
  down(e);
});
selector.addEventListener('touchend', (e) => {
  up(e);
});

// button down - light up the button and play tone
const down = (e) => {
  e.preventDefault();
  if (g.playerTurn) {
    let colorSelected = document.getElementById(e.target.id);
    try {
      g.addPlayerMove(e.target.id);
      adding(colorSelected, 'light', e.target.id[3]);
    } catch(e){}
  }
}

// button up - unlight the button and pause tone
// check if what has been entered is incorrect, 
// wins the game, wins the round
const up = (e) => {
  e.preventDefault();
  if (g.playerTurn) {
    let colorSelected = document.getElementById(e.target.id);
    try {
      removing(colorSelected, 'light', e.target.id[3]);
      if (!correctMatch(g.playerSeq.length - 1)) {
        setTimeout(roundLost, g.timeGap);
      } else if (g.winGame()) {
        setTimeout(gameWon, g.timeGap);
      } else if (g.winRound()){
        setTimeout(roundWon, g.timeGap); 
      } 
    } catch(e) {}
  }
}

// lights up the button and plays a tone
const adding = (obj, classN, audioT) => {
  obj.classList.add(classN);
  audioTones.playTone(audioT);
}

// unlights the button and pauses the tone
const removing = (obj, classN, audioT) => {
  obj.classList.remove(classN);
  audioTones.pauseTone(audioT);
}

// incorrect guess, also checks if in strict mode
const roundLost = () => {
  let moveStatus = document.getElementsByClassName('controlPanel')[0];
  adding(moveStatus, 'incorrect', 'incorrect');
  setTimeout(() => {
    removing(moveStatus, 'incorrect', 'incorrect');
  }, g.timeShow);
  g.resetPlayer();
  if (g.strictMode) {
    contentText('counter', 'XX');
    setTimeout(resetGame, g.timeReset);
  } else {
    setTimeout(highlightSeq, g.timeReset, 0);   
  }
}

// won the game
const gameWon = () => {
  document.getElementById('box0').classList.add('correct');
  document.getElementById('box1').classList.add('correct');
  document.getElementById('box2').classList.add('correct');
  document.getElementById('box3').classList.add('correct');
  contentText('heading', 'You Win!');
  contentText('counter', '!!');
  audioTones.playTone('win');
  setTimeout(() => {
    document.getElementById('box0').classList.remove('correct');
    document.getElementById('box1').classList.remove('correct');
    document.getElementById('box2').classList.remove('correct');
    document.getElementById('box3').classList.remove('correct');
    contentText('heading', 'Simon Game');
    contentText('counter', '--');
    resetGame();
  }, g.timeReset);
}

// made it through this round
const roundWon = () => {
  let moveStatus = document.getElementsByClassName('controlPanel')[0];
  adding(moveStatus, 'correct', 'correct');
  setTimeout(() => {
    removing(moveStatus, 'correct', 'correct');
  }, g.timeShow);
  g.playerTurn = !g.playerTurn;
  setTimeout(startRound, g.timeReset);
}

// the computer highlights the sequence of buttons
const highlightSeq = (i) => {
  let colorSelected = document.getElementById(g.seq[i]);
  if (i < g.seq.length){
    adding(colorSelected, 'light', g.seq[i][3]);
    setTimeout(function(){
      removing(colorSelected, 'light', g.seq[i][3]);
      setTimeout(function() {
        i++;
        highlightSeq(i);
      }, g.timeGap);
    }, g.timeShow);
  } else {
    playerPlays();
  }
}

const correctMatch = (i) => {
  return g.seq[i] === g.playerSeq[i];
}

const contentText = (classN, input) => {
  document.getElementsByClassName(classN)[0].innerHTML = input;
}

const playerPlays = () => {
  clearTimeout();
  g.playerTurn = true;
}

const generateRandom = () => {
  return Math.floor(Math.random() * 4);
}

const addSeq = (button) => {
  g.seq.push(`box${button}`);
}

const startRound = () => {
  let tens = Math.floor((g.seq.length + 1) / 10);
  let ones = Math.floor((g.seq.length + 1) % 10);
  contentText('counter', `${tens}${ones}`);
  addSeq(generateRandom());
  g.resetPlayer();
  highlightSeq(0);
}

const resetGame = () => {
  g.reset();
  contentText('counter', '--');
  clearTimeout();
  setTimeout(startRound, g.timeReset);
}

const game = () => {
  startRound();
}

// when the game loads, play the tones and start the game
audioTones.playTone('win');
setTimeout(game, 2000);


            