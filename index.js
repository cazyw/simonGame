const hov = document.getElementsByClassName('game')[0];
console.log(hov);
let seq = [];
let playerSeq = [];
let count = 0;
let playerCount = 0;
let playerTurn = false;
let timeShow = 1000;
let timeGap = 500;

hov.addEventListener('mousedown', (e) => {
  if (playerTurn) {
    console.log('Player selects: ', e.target.id);
    let colorSelected = document.getElementById(e.target.id);
    colorSelected.classList.add('light');
    playerSeq.push(e.target.id);
    console.log('seq: ', seq);
    console.log('player seq: ', playerSeq);
  }
});
hov.addEventListener('mouseup', (e) => {
  if (playerTurn) {
    console.log(e.target.id);
    console.log('count ', count, 'playercount ', playerCount);
    let colorSelected = document.getElementById(e.target.id);
    colorSelected.classList.remove('light');
    if (!correctMatch(playerCount)) {
      console.log(`failed at round ${playerCount+1}. Restart!`);
      setTimeout(resetGame, 2000);
    }
    else if (playerSeq.length === seq.length){
      console.log(`Made it through round ${count+1}. Next!`);
      playerTurn = !playerTurn;
      count++;
      setTimeout(playRound, 2000);
    } 
    else {
      playerCount++;
    }
  }
});

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
  clearTimeout();
  playRound();
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