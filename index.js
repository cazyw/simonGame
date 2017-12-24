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

let audio;

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
      colorSelected.classList.remove('light');
      if (!correctMatch(playerCount)) {
        let moveStatus = document.getElementsByClassName('controlPanel')[0];
        moveStatus.classList.add('wrong');
        setTimeout(() => {
          moveStatus.classList.remove('wrong');
        }, 500);
        playerTurn = false;
        if (strictMode) {
          console.log(`failed at round ${playerCount+1}. Restart!`);
          setTimeout(resetGame, timeReset);
        } else {
          console.log(`failed at round ${playerCount+1}. Retry!`);
          playerSeq = [];
          setTimeout(highlightSeq, timeReset, 0);   
        }
      }
      else if (playerSeq.length === seq.length){
        let moveStatus = document.getElementsByClassName('controlPanel')[0];
        moveStatus.classList.add('correct');
        setTimeout(() => {
          moveStatus.classList.remove('correct');
        }, 500);
        clearTimeout();
        console.log(`Made it through round ${count+1}. Next!`);
        playerTurn = !playerTurn;
        count++;
        setTimeout(playRound, timeReset);
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
    setTimeout(function(){
      colorSelected.classList.remove('light');
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
  setTimeout(playRound, 1000);
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

setTimeout(game, 1000);