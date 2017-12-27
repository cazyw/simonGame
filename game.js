export default class Game{
  static get MAX() { return 3; }
  constructor () {
    this.seq = [];
    this.playerSeq = [];
    this.count = 0;
    this.playerTurn = false;
    this.timeShow = 750;
    this.timeGap = 250;
    this.timeReset = 2000;
    this.strictMode = false;
  }

  reset() {
    this.count = 0;
    this.playerTurn = false;
    this.seq = [];
    this.playerSeq = [];
  }

  resetPlayer() {
    this.playerSeq = [];
    this.playerTurn = false;
  }

  addPlayerMove(move) {
    this.playerSeq.push(move);
  }

  winGame() {
    const MAX = 3;
    return this.playerSeq.length === MAX;
  }

  winRound() {
    return this.playerSeq.length === this.seq.length;
  }
}