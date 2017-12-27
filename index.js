import Game from './game.js';
const audioTones = require('./audioTones.js');

const hov = document.getElementsByClassName('game')[0];
const resetListener = document.getElementsByClassName('resetSwitch')[0];
const strictListener = document.getElementsByClassName('strictSwitch')[0];
console.log(hov);
let seq = [];
let playerSeq = [];
let count = 0;
let playerCount = 0;
let playerTurn = false;
let timeShow = 750;
let timeGap = 250;
let timeReset = 2000;
let strictMode = false;

resetListener.addEventListener('click', (e) => {
  resetGame();
});

strictListener.addEventListener('click', (e) => {
  strictMode = !strictMode;
  if (strictMode) {
    document.getElementsByClassName('strictSwitch')[0].classList.add('on');
  } else {
    document.getElementsByClassName('strictSwitch')[0].classList.remove('on');
  }
  console.log(`strict mode = ${strictMode}`);
  resetGame();
});

hov.addEventListener('mousedown', (e) => {
  down(e);
});
hov.addEventListener('mouseup', (e) => {
  up(e);
});

hov.addEventListener('touchstart', (e) => {
  down(e);
});
hov.addEventListener('touchend', (e) => {
  up(e);
});


const down = (e) => {
  e.preventDefault();
  if (playerTurn) {
    console.log('Player selects: ', e.target.id);
    let colorSelected = document.getElementById(e.target.id);
    try {
      colorSelected.classList.add('light');
      playerSeq.push(e.target.id);
      console.log('seq: ', seq);
      console.log('player seq: ', playerSeq);
      audioTones.playTone(e.target.id[3]);
    } catch(e){}
  }

}

const up = (e) => {
  e.preventDefault();
  if (playerTurn) {
    console.log(e.target.id);
    console.log('count ', count, 'playercount ', playerCount);
    let colorSelected = document.getElementById(e.target.id);
    try {
      audioTones.pauseTone(e.target.id[3]);
      colorSelected.classList.remove('light');
      if (!correctMatch(playerCount)) {
        setTimeout(() => {
          let moveStatus = document.getElementsByClassName('controlPanel')[0];
          moveStatus.classList.add('wrong');
          audioTones.playTone('error');
          setTimeout(() => {
            clearTimeout();
            moveStatus.classList.remove('wrong');
            audioTones.pauseTone('error');
          }, 500);
          playerTurn = false;
          if (strictMode) {
            console.log(`failed at round ${playerCount+1}. Restart!`);
            document.getElementsByClassName('counter')[0].textContent = 'X X';
            setTimeout(resetGame, timeReset);
          } else {
            console.log(`failed at round ${playerCount+1}. Retry!`);
            playerSeq = [];
            setTimeout(highlightSeq, timeReset, 0);   
          }
        }, 250);
      }
      else if (playerSeq.length === seq.length){
        if (playerSeq.length === 3) {
          document.getElementById('box0').classList.add('correct');
          document.getElementById('box1').classList.add('correct');
          document.getElementById('box2').classList.add('correct');
          document.getElementById('box3').classList.add('correct');
          document.getElementsByClassName('heading')[0].textContent = 'You Win!';
          document.getElementsByClassName('counter')[0].textContent = '! !';
          audioTones.playTone('win');
          clearTimeout();
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
        } else {
          setTimeout(() => {
            let moveStatus = document.getElementsByClassName('controlPanel')[0];
            moveStatus.classList.add('correct');
            audioTones.playTone('correct');
            setTimeout(() => {
              clearTimeout();
              moveStatus.classList.remove('correct');
              audioTones.pauseTone('correct');
            }, 500);
            clearTimeout();
            console.log(`Made it through round ${count+1}. Next!`);
            playerTurn = !playerTurn;
            count++;
            setTimeout(playRound, timeReset);
          }, 250);   
        }
      } 
      else {
        playerCount++;
      }
    } catch(e) {}
  }
}


const generateRandom = () => {
  return Math.floor(Math.random() * 4);
}

const addSeq = (button) => {
  seq.push(`box${button}`);
}

const highlightSeq = (i) => {
  let colorSelected = document.getElementById(seq[i]);
  console.log('highlightSeq ', seq[i]);
  if (i < seq.length){
    colorSelected.classList.add('light');
    audioTones.playTone(seq[i][3]);
    setTimeout(function(){
      colorSelected.classList.remove('light');
      audioTones.pauseTone(seq[i][3]);
      setTimeout(function() {
        i++;
        highlightSeq(i);
      }, timeGap);
    },timeShow);
  } else {
    playerPlays();
  }
}

const resetGame = () => {
  count = 0;
  playerCount = 0;
  playerTurn = false;
  seq = [];
  playerSeq = [];
  document.getElementsByClassName('counter')[0].innerHTML = '- -';
  clearTimeout();
  setTimeout(playRound, 1500);
}

const correctMatch = (i) => {
  console.log(`count ${i}, expect ${seq[i]}, actual ${playerSeq[i]} `);
  return seq[i] === playerSeq[i];
}

const playerPlays = () => {
  clearTimeout();
  console.log('in playerPlays');
  playerTurn = true;
  playerCount = 0;
}

const playRound = () => {
  console.log('Round ', count + 1, 'count ', count);
  let counter = document.getElementsByClassName('counter')[0];
  let tens = Math.floor((count + 1) / 10);
  let ones = Math.floor((count + 1) % 10);
  counter.innerHTML = `${tens} ${ones}`;
  addSeq(generateRandom());
  console.log(seq);
  playerSeq = [];
  playerTurn = false;
  highlightSeq(0);
}

const game = () => {
  console.log(count);
  console.log('start game');
  playRound();
}


// setTimeout(game, 1000);

let g = new Game();
console.log(g);

audioTones.playTone('win');

            