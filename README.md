# Simon Game App
Free Code Camp Advanced Project - Simon Game App

## Objective
Build an app that is functionally similar to this: https://codepen.io/FreeCodeCamp/full/obYBjE

* I am presented with a random series of button presses.
* Each time I input a series of button presses correctly, I see the same series of button presses but with an additional step.
* I hear a sound that corresponds to each button both when the series of button presses plays, and when I personally press a button.
* If I press the wrong button, I am notified that I have done so, and that series of button presses starts again to remind me of the pattern so I can try again
* I can see how many steps are in the current series of button presses.
* If I want to restart, I can hit a button to do so, and the game will return to a single step.
* I can play in strict mode where if I get a button press wrong, it notifies me that I have done so, and the game restarts at a new random series of button presses.
* I can win the game by getting a series of 20 steps correct. I am notified of my victory, then the game starts over.

## Operating Instructions

<img src="https://cazyw.github.io/img/js-simongame.jpg" width="450" alt="Simon Game">

The gameplay:

1. The computer will play a series of tones/colours
2. The player tries to replicate that sequence of tones/colours

The aim: Get a series of 20 tones/colours correct to win the game.

Every time a player makes an incorrect choice, the computer will play that series of tones/colours again and the player can try again. Players can also choose to play in the harder  **strict mode** (toggle the button to green), whereby an incorrect choice will reset the game back to the beginning.

## Discussion

### Setup
With this project I tested out a slightly modified development environment based on https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70

This introduced using:
* A JavaScript package manager (npm) to setup a project
* A JavaScript module bundler (webpack)
* A task runner (npm scripts)
* `package.json` and `node_modules`

The final files used in the published game are located in:
```
index.html
js/
|- simonGame.js
css/
|- simonGame.css
img/
|- table.jpg
```

However `simonGame.js` is actually built from three separate `.js` files located in a tmp folder:

* index.js - the main file
* game.js - the Game class containing the game info
* audioTones.js - the audio setup

I originally built the game in one `.js` file before splitting it up into the three above files to make the code clearer. Using `webpack` and scripts made things easier as I could then run the code below. This then watched for any saved changes to any of the `.js` files. Every time I changed a file, it automatically transpiled the code from ES6 to ES5 and combined all the files into the one `simonGame.js` file.
```
$ npm run watch
```

### Design
The design is closely built on the example they provided with the following notes:

* I decided not to have an on/off button
* Strict mode indicator is the button itself which toggles between yellow and green
* The game is somewhat responsive - there's two sizes, the smaller size fitting most smartphone screens
* There are visual indicators for correct and incorrect choices (the centre circle background changes colour) in case the audio does not work

Although there were a number of different styles, I decided to stick with the traditional circle display as this presented a nice challenge to have the circles displayed correctly. I also quite liked the colour scheme. Visual Studio Code has a nice colour picker available so I could try out different colours quite easily.

### Game logic
The logic of the game in itself is quite simple so some of the more challenging aspects of building this game lay with refactoring the code so that long sections of code were extracted into separate functions. There was also a lot of timings involved in order to play tones for a certain length of time or to make sure there was a pause before the next tone was played.

I also found a way to recursively cycle through the computer sequence which was really interesting as recursion is a bit of a mind-bending concept at times. 

Because the example game allowed players to hold down the button (rather than just click it), the event listeners do not listen for `click` events but for `mouse/touch` events. This added complexity to the code but meant that players can hold down a button for as long as they want. There might be some issues with `touch` events as users can theoretically hold down multiple buttons. This will likely still show the user as entering incorrect input which is ok.

The game also includes checks so that player input is only counted/displayed when it's a player's turn to enter input. If the computer is running through a sequence, the game 'locks' so that players hitting buttons do nothing.

Currently selecting strict mode also resets the game.

### Audio
Programming the audio for this game was the greatest challenge as I had not included audio before. Initially I thought to use the four `.mp3` files provided however these were discrete fixed-length sounds that couldn't be seemlessly looped (if a player pressed a button down for longer than the sound file). There was also no sound files provided for other events e.g. correct/incorrect choices.

Searching on the intenet, the `Web Audio API` seemed to be a popular choice as it meant I could create my own tones/sound that could be played for any length of time. Someone on a forum also helpfully suggested four frequencies that I eventually used. I then added extra tones for an incorrect choice and for winning a round. It took a bit of research to understand how to create and stop and start sounds.

I looked into other examples and found a nice three tone set that is apparently the NBC theme or something. It was nice so I used it as the initial game-start sound and game-won sound.

Initially I used the `sine` waveform as this sounded nice and smooth. However for some reason what appeared fine on the desktop sounded awfully clicky/crackly and loud on mobile. There was a terrible click/crackle at the beginning and end of each sound.

So I changed it to a `square` waveform which has a bit more of a buzz effect and got rid of the click/crackle. Then used `GainNode` to decrease the volume (again for some reason it was unbearably loud on mobile).

Adding sound was the last component I worked on, after I had already gotten the main game running. After this I refactored the code (pulling it into separate files and smaller functions and polishing the code).

### Conclusion

This and tic tac toe were both challenging in different ways, both having timed events but this challenge also included the use of audio. It was a lot of fun building these games, using different modules and learning new things.