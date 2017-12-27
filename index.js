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
let sound = [164.81, 220.00, 277.18, 329.63, 90, 380]

var audioCtx =  new (window.AudioContext || window.webkitAudioContext)();

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
      eval(`osc${Number(e.target.id[3])}`).connect(audioCtx.destination);
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
      eval(`osc${Number(e.target.id[3])}`).disconnect(audioCtx.destination);
      colorSelected.classList.remove('light');
      if (!correctMatch(playerCount)) {
        setTimeout(() => {
          let moveStatus = document.getElementsByClassName('controlPanel')[0];
          moveStatus.classList.add('wrong');
          errorTone.connect(audioCtx.destination);
          setTimeout(() => {
            clearTimeout();
            moveStatus.classList.remove('wrong');
            errorTone.disconnect(audioCtx.destination);
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
            correctTone.connect(audioCtx.destination);
            setTimeout(() => {
              clearTimeout();
              moveStatus.classList.remove('correct');
              correctTone.disconnect(audioCtx.destination);
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
    let boxNo = Number(seq[i][3]);
    eval(`osc${boxNo}`).connect(audioCtx.destination);
    setTimeout(function(){
      colorSelected.classList.remove('light');
      eval(`osc${boxNo}`).disconnect(audioCtx.destination);
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

setTimeout(game, 1000);