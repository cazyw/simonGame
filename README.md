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

<img src="" width="450" alt="">

The gameplay:

1. The computer will play a series of tones/colours
2. The player tries to replicate that sequence of tones/colours

The aim: Get a series of 20 tones/colours correct to win the game.

Every time a player makes an incorrect choice, the computer will play that series of tones/colours again and the player can try again. Players can also choose to play in the harder  **strict mode** (toggle the button to green), whereby an incorrect choice will reset the game back to the beginning.

## Discussion

### Setup
Note: with this project I tested out a slightly modified development environment based on https://medium.com/@peterxjang/modern-javascript-explained-for-dinosaurs-f695e9747b70

This introduced using:
* A JavaScript package manager (npm) to setup a project
* A JavaScript module bundler (webpack)
* A task runner (npm scripts)
* `package.json` and `node_modules`

It was useful to be able to run the following script which watches for any changes to ny js files and automatically transpiles the code from ES6 to ES5 and pulls all the modules into the one file every time I update one of the .js files.
```
$ npm run watch
```
