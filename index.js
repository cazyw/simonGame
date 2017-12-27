import Game from './game.js';
const audioTones = require('./audioTones.js');
const selector = document.getElementsByClassName('game')[0];
const resetListener = document.getElementsByClassName('resetSwitch')[0];
const strictListener = document.getElementsByClassName('strictSwitch')[0];

let g = new Game();

resetListener.addEventListener('click', (e) => {
  resetGame();
});

strictListener.addEventListener('click', (e) => {
  g.strictMode = !g.strictMode;
  if (g.strictMode) {
    document.getElementsByClassName('strictSwitch')[0].classList.add('on');
  } else {
    document.getElementsByClassName('strictSwitch')[0].classList.remove('on');
  }
  resetGame();
});

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

// button down
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

// button up
const up = (e) => {
  e.preventDefault();
  if (g.playerTurn) {
    let colorSelected = document.getElementById(e.target.id);
    try {
      removing(colorSelected, 'light', e.target.id[3]);
      if (!correctMatch(g.playerSeq.length - 1)) {
        setTimeout(() => {
          let moveStatus = document.getElementsByClassName('controlPanel')[0];
          adding(moveStatus, 'incorrect', 'incorrect');
          setTimeout(() => {
            clearTimeout();
            removing(moveStatus, 'incorrect', 'incorrect');
          }, g.timeShow);
          g.playerTurn = false;
          if (g.strictMode) {
            contentText('counter', 'XX');
            setTimeout(resetGame, g.timeReset);
          } else {
            g.playerSeq = [];
            setTimeout(highlightSeq, g.timeReset, 0);   
          }
        }, g.timeGap);
      } else if (g.winGame()) {
        setTimeout(gameWon, g.timeGap);
      } else if (g.winRound()){
          setTimeout(() => {
            let moveStatus = document.getElementsByClassName('controlPanel')[0];
            adding(moveStatus, 'correct', 'correct');
            setTimeout(() => {
              clearTimeout();
              removing(moveStatus, 'correct', 'correct');
            }, g.timeShow);
            clearTimeout();
            g.playerTurn = !g.playerTurn;
            g.count++;
            setTimeout(startRound, g.timeReset);
          }, g.timeGap);   
      } 
    } catch(e) {}
  }
}

const adding = (obj, classN, audioT) => {
  obj.classList.add(classN);
  audioTones.playTone(audioT);
}

const removing = (obj, classN, audioT) => {
  obj.classList.remove(classN);
  audioTones.pauseTone(audioT);
}

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
    clearTimeout();
    resetGame();
  }, g.timeReset);
}

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


            