export default class Game{
  constructor () {
    this.seq = [];
    this.playerSeq = [];
    this.count = 0;
    this.playerCount = 0;
    this.playerTurn = false;
    this.timeShow = 750;
    this.timeGap = 250;
    this.timeReset = 2000;
    this.strictMode = false;
  }
}