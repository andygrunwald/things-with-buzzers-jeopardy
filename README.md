# things with buzzers: Jeopardy!

A [Jeopardy!](https://en.wikipedia.org/wiki/Jeopardy!) game frontend for _things with buzzers_.

<p align="center">
  <img src="images/frontend-board.png" title="Jeopardy! Game board" alt="Jeopardy! Game board">
</p>

PS: We didn't created this from scratch. This is a modified fork. See [Fork and acknowledgments](#fork-and-acknowledgments).

<p align="center">
  <img src="images/buzzer-setup-frontends.png" title="The finished product: Four buzzers, a Raspberry Pi incl. hat" alt="The finished product: Four buzzers, a Raspberry Pi incl. hat">
</p>

_You are missing the context, what this is all about?_
Have a look at

* [(2) things with buzzers: websocket](https://github.com/andygrunwald/things-with-buzzers-websocket)
* [(3) things with buzzers: hardware](https://github.com/andygrunwald/things-with-buzzers-hardware)

## Table of Contents

- [Features](#features)
- [Screenshots](#screenshots)
  - [Game Board (Frontend)](#game-board-frontend)
  - [Game Host Interface (Backend)](#game-host-interface-backend)
- [Getting Started](#getting-started)
  - [Running the App](#running-the-app)
  - [Starting a Game (TODO)](#starting-a-game-todo)
  - [Playing the Game (TODO)](#playing-the-game-todo)
  - [Create your own game and answer/question set](#create-your-own-game-and-answerquestion-set)
  - [Activating the J! Archive games](#activating-the-j-archive-games)
- [Known Issues](#known-issues)
  - [Only when using J! Archive](#only-when-using-j-archive)
  - [Only when running offline](#only-when-running-offline)
- [Fork and acknowledgments](#fork-and-acknowledgments)
- [Disclaimer](#disclaimer)

## Features

* Text support for answers
* Audio support for answers
* Video support for answers
* Native support for _[things with buzzers: hardware buzzers](https://github.com/andygrunwald/things-with-buzzers-hardware)_ via _[things with buzzers: websocket](https://github.com/andygrunwald/things-with-buzzers-websocket)_
* Possibility to run offline
* Support for your own game and answer/question sets
* Support for using the game and answer/question sets from [J! Archive](http://www.j-archive.com/) (_deactivated in favor of your own question sets_)

## Screenshots

### Game Board (Frontend)

A single question

<p align="center">
  <img src="images/frontend-question.png" title="Jeopardy! A single question" alt="Jeopardy! A single question">
</p>

### Game Host Interface (Backend)

Backend game overview

<p align="center">
  <img src="images/backend-game-overview.png" title="Jeopardy! Backend game overview" alt="Jeopardy! Backend game overview">
</p>

Backend game question overview

<p align="center">
  <img src="images/backend-game-question-overview.png" title="Jeopardy! Backend game question overview" alt="Jeopardy! Backend game question overview">
</p>

Backend game question

<p align="center">
  <img src="images/backend-game-question.png" title="Jeopardy! Backend game question" alt="Jeopardy! Backend game question">
</p>

## Getting Started

This app runs on [Node.js](https://nodejs.org/), make sure to install it before continuing. Also, [if you don't have a buzzer, build one](https://github.com/andygrunwald/things-with-buzzers-hardware)!

### Running the App

1. Clone this repository to your computer.
2. Open a command prompt in the root folder of the repository.
3. `make run`
4. Open http://localhost:3000/ for the host interface.
5. Open http://localhost:3000/#/board for the clue board.

TODO:
- Explain that Nodjs server + websocket must run on the same server
- Explain configuration of TWB_QUESTION_SERVER env var (npm install && TWB_QUESTION_SERVER="192.168.178.41:8000" node app.js)

### Starting a Game (TODO)

Once the server is started, the board will play the Jeopardy! theme to get your contestants pumped up.
The host can then select from any game on J! Archive, starting by season, then drilling down to individual games.
When the host chooses a game, a summary screen will appear, showing the categories for the game and how many clues are available for each category.
I recommend finding a game with all the clues available for the best experience.

Once the game has been chosen, the host enters the contestant names at the top of the screen and clicks the "Start Game" button.
The music ends on the board and the Jeopardy! round will be displayed.

### Playing the Game (TODO)

This is pretty easy for the contestants, the person in control of the board picks a clue, the host reads it, they buzz in to answer, repeat until no clues remain.

If you've decided to step in to the shoes of Alex Trebek, you'll have to learn a bit. There's a pin next to the name of the player in control of the board. Call on them to pick a clue. Click on the clue, and it will pop up on your screen as well as the board. Read it to the contestants and them buzz in. Your screen will also have the answer, so be sure not to read that! If someone buzzes in and gets it wrong, click the X underneath their name. If they get it right, hit the checkmark. Hit the Submit button to end the clue and update scores. The control pin will automatically switch to whichever player answered correctly. If no one gets it right, control of the board does not change.

If you see a yellow "DD" next to a clue, it's a Daily Double! Don't start reading it right away! The contestant who got it needs to bid first. Make sure the correct name is highlighted, enter the contestant's bid, then hit the Confirm button. Now read the clue and record whether they get it correct.

If you see a red "TS" next to a clue, that means it was a Triple Stumper on the show. Nothing too significant, but sometimes it's nice to tell your contestants they're smarter than the folks on the show that day!

When all the clues are gone, hit the "End Round" button. Between the Jeopardy! and Double Jeopardy! rounds, the contestants' scores will be displayed on the board, and control will be given to the player with the lowest score.

When you reach Final Jeopardy!, you must enter the contestants' wagers before the question is displayed. If you really want to get serious, there will be a link to J! Archive's wagering suggestions page, automatically populated with your contestants' names and scores. If you're actually practicing for Jeopardy!, you'd better be learning how to wager properly. Confirm the wagers, read the question (the Think! music will automatically start playing), let your contestants write down their answers, then enter the results. Hit the "End Round" button one last time to display your contestants' final scores on the big screen, and you're all done! (This is dumb that I didn't just make it happen automatically, but oh well.)

Let's just reiterate that, be sure to hit "End Round" at the end of Final Jeopardy! This will display the final scores, as well as save a log of the game's results to a file on your computer in the `games` folder. You are also given some convenient links to the J! Archive so you can see how the real game played out. You can then use the "Reset Game" button if you'd like to play again, or use your browser's Back button to go back and pick another game.

### Create your own game and answer/question set

TODO

### Activating the J! Archive games

If you prefer to play the games from [J! Archive](http://www.j-archive.com/) instead of coming up with your own game and answer/question set, you need to modify the source code slighlty.

1. Open the [routes/api.js](./routes/api.js) file
2. Search for `J! Archive-Activation`
3. Add comments in front of the lines with `TWB_QUESTION_SERVER`
4. Remove the comments of the lines with http://www.j-archive.com/
5. Restart the game server
6. Seasons and games from http://www.j-archive.com/ should appear now

## Known Issues

* You have to manually end the round when all clues are answered.
* Contestants are only shown their scores between rounds, at Daily Doubles, and before Final Jeopardy! Be a good game master and announce them in between.
* There is no easy way to adjust a contestant's score if the host makes a mistake. When necessary, we just added some scoring notes in the field with the contestant's name.
* There is no way to un-answer a clue or un-end a round. Once they're gone, they're gone, unless the entire game is reset.

### Only when using J! Archive

* Media is proxied from J! Archive, so if a clue had pictures, they will be shown on the game board. However, media frequently comes up missing on J! Archive. The links are there, but they don't go to anything.

### Only when running offline

* The Jeopardy! theme played at the start is streamed from YouTube. We suggest you download the video beforehand and switch to the game once finished.
* You have to use your own game and answer/question set OR downloading the J! Archive games beforehand.

## Fork and acknowledgments

This repository is a (modified) fork of [theGrue/jeopardy](https://github.com/theGrue/jeopardy) which is based on [btford/angular-socket-io-seed](https://github.com/btford/angular-socket-io-seed).

The main acknowledgments belongs to [theGrue](https://github.com/theGrue), [btford](https://github.com/btford) + contributors.
Thanks a lot! You created a huge thing.

## Disclaimer

Borrowing this one from J! Archive, just in case.

> The Jeopardy! game show and all elements thereof, including but not limited to copyright and trademark thereto, are the property of Jeopardy Productions, Inc. and are protected under law. This website is not affiliated with, sponsored by, or operated by Jeopardy Productions, Inc.
