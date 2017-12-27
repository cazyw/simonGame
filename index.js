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

const adding = (obj, classN, audioT) => {
  obj.classList.add(classN);
  audioTones.playTone(audioT);
}

const removing = (obj, classN, audioT) => {
  obj.classList.remove(classN);
  audioTones.pauseTone(audioT);
}

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
      if (!correctMatch(g.playerCount)) {
        setTimeout(() => {
          let moveStatus = document.getElementsByClassName('controlPanel')[0];
          adding(moveStatus, 'incorrect', 'incorrect');
          setTimeout(() => {
            clearTimeout();
            removing(moveStatus, 'incorrect', 'incorrect');
          }, 500);
          g.playerTurn = false;
          if (g.strictMode) {
            document.getElementsByClassName('counter')[0].textContent = 'X X';
            setTimeout(resetGame, g.timeReset);
          } else {
            g.playerSeq = [];
            setTimeout(highlightSeq, g.timeReset, 0);   
          }
        }, 250);
      } else if (g.winGame()) {
        gameWon();
      } else if (g.winRound()){
          setTimeout(() => {
            let moveStatus = document.getElementsByClassName('controlPanel')[0];
            adding(moveStatus, 'correct', 'correct');
            setTimeout(() => {
              clearTimeout();
              removing(moveStatus, 'correct', 'correct');
            }, 500);
            clearTimeout();
            g.playerTurn = !g.playerTurn;
            g.count++;
            setTimeout(playRound, g.timeReset);
          }, 250);   
      } else {
        g.playerCount++;
      }
    } catch(e) {}
  }
}

const gameWon = () => {
  document.getElementById('box0').classList.add('correct');
  document.getElementById('box1').classList.add('correct');
  document.getElementById('box2').classList.add('correct');
  document.getElementById('box3').classList.add('correct');
  document.getElementsByClassName('heading')[0].textContent = 'You Win!';
  document.getElementsByClassName('counter')[0].textContent = '! !';
  audioTones.playTone('win');
  setTimeout(() => {
    document.getElementById('box0').classList.remove('correct');
    document.getElementById('box1').classList.remove('correct');
    document.getElementById('box2').classList.remove('correct');
    document.getElementById('box3').classList.remove('correct');
    document.getElementsByClassName('heading')[0].textContent = 'Simon Game';
    document.getElementsByClassName('counter')[0].textContent = '- -';
    clearTimeout();
    resetGame();
  }, 2000);
}

const generateRandom = () => {
  return Math.floor(Math.random() * 4);
}

const addSeq = (button) => {
  g.seq.push(`box${button}`);
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

const resetGame = () => {
  g.reset();
  document.getElementsByClassName('counter')[0].innerHTML = '- -';
  clearTimeout();
  setTimeout(playRound, 1500);
}

const correctMatch = (i) => {
  return g.seq[i] === g.playerSeq[i];
}

const playerPlays = () => {
  clearTimeout();
  g.playerTurn = true;
  g.playerCount = 0;
}

const playRound = () => {
  let counter = document.getElementsByClassName('counter')[0];
  let tens = Math.floor((g.count + 1) / 10);
  let ones = Math.floor((g.count + 1) % 10);
  counter.innerHTML = `${tens} ${ones}`;
  addSeq(generateRandom());
  g.playerSeq = [];
  g.playerTurn = false;
  highlightSeq(0);
}

const game = () => {
  playRound();
}

// when the game loads, play the tones and start the game
audioTones.playTone('win');
setTimeout(game, 2000);


            