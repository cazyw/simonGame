// Module to play the audio for the four buttons and the error / correct choice
// Using Web Audio API and setting the frequencies as this allows the 
// tones to be played for a unset period of time (depending on how long players
// hold the buttons down)
 
var sound = [164.81, 220.00, 277.18, 329.63, 200, 380];
var audioCtx =  new (window.AudioContext || window.webkitAudioContext)();
var gainNode = audioCtx.createGain();
gainNode.connect(audioCtx.destination);
gainNode.gain.value = 0.1;

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

let winning = () => {
  let n = audioCtx.createOscillator();
  n.frequency.value = 195.998; // G3
  n.type = 'square';
  n.connect(gainNode);
  
  let b = audioCtx.createOscillator();
  b.frequency.value = 329.628; // E4
  b.type = 'square';
  b.connect(gainNode);
  
  let c = audioCtx.createOscillator();
  c.frequency.value = 261.626; // C4
  c.type = 'square';
  c.connect(gainNode);

  n.start(audioCtx.currentTime);
  n.stop(audioCtx.currentTime + 0.25);
  
  b.start(audioCtx.currentTime + 0.5);
  b.stop(audioCtx.currentTime + 0.75);
  
  c.start(audioCtx.currentTime + 1.0);
  c.stop(audioCtx.currentTime + 1.25);
}

let playTone = (type) => {
  switch(type){
    case 'win':
      winning();     
      break;
    case 'correct':
      correctTone.connect(gainNode);      
      break;
    case 'incorrect':
      errorTone.connect(gainNode); 
      break;
    case '0':
      osc0.connect(gainNode); 
      break;
    case '1':
      osc1.connect(gainNode); 
      break;
    case '2':
      osc2.connect(gainNode); 
      break;
    case '3':
      osc3.connect(gainNode); 
      break;
    default:
      console.log('nothing here');
  }
}

let pauseTone = (type) => {
  switch(type){
    case 'correct':
      correctTone.disconnect(gainNode);      
      break;
    case 'incorrect':
      errorTone.disconnect(gainNode); 
      break;
    case '0':
      osc0.disconnect(gainNode); 
      break;
    case '1':
      osc1.disconnect(gainNode); 
      break;
    case '2':
      osc2.disconnect(gainNode); 
      break;
    case '3':
      osc3.disconnect(gainNode); 
      break;
    default:
      console.log('nothing here');
  }
}

module.exports = {
  playTone,
  pauseTone
}
