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

- [Jeopardy! Practice Game](#jeopardy-practice-game)
- [Screenshots](#screenshots)
  - [Game Board (Frontend)](#game-board-frontend)
  - [Game Host Interface (Backend)](#game-host-interface-backend)
- [Getting Started (TODO)](#getting-started-todo)
  - [Running the App (TODO)](#running-the-app-todo)
  - [Starting a Game (TODO)](#starting-a-game-todo)
  - [Playing the Game (TODO)](#playing-the-game-todo)
- [Known Issues (TODO)](#known-issues-todo)
- [Technology (TODO)](#technology-todo)
- [Fork and acknowledgments](#fork-and-acknowledgments)
- [Disclaimer (TODO)](#disclaimer-todo)

## Jeopardy! Practice Game

This app was hacked together over a couple of weekends to help practice for Jeopardy! It reads games from [J! Archive](http://www.j-archive.com/) and displays them via separate interfaces to the host and the contestants. Our typical setup for the practice games was:

* Computer running this app, placed on host podium
* Physical buzzer system (lots of schematics are available out there!)
* A large screen to display the game board and clues to the contestants
  * A Chromecast and the Google Cast extension for Chrome make this super easy!

The objective was to run games as close to the real thing as possible, so other simulators out there that provided keyboard buzzing, typing in answers, or hiding the answer from the host were not suitable. Nor were apps that left out key features like Daily Doubles and Final Jeopardy.

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

## Getting Started (TODO)

This app runs on [Node.js](https://nodejs.org/), make sure to install it before continuing. Also, if you don't have a buzzer, build one!

### Running the App (TODO)

1. Clone this repository to your computer.
2. Open a command prompt in the root folder of the repository.
3. `make run`
4. Open http://localhost:3000/ for the host interface.
5. Open http://localhost:3000/#/board for the clue board.
  * If you have a Chromecast, this is the tab you'll want to cast!

### Starting a Game (TODO)

Once the server is started, the board will play the Jeopardy! theme to get your contestants pumped up. The host can then select from any game on J! Archive, starting by season, then drilling down to individual games. When the host chooses a game, a summary screen will appear, showing the categories for the game and how many clues are available for each category. I recommend finding a game with all the clues available for the best experience.

Once the game has been chosen, the host enters the contestant names at the top of the screen and clicks the "Start Game" button. The music ends on the board and the Jeopardy! round will be displayed.

### Playing the Game (TODO)

This is pretty easy for the contestants, the person in control of the board picks a clue, the host reads it, they buzz in to answer, repeat until no clues remain.

If you've decided to step in to the shoes of Alex Trebek, you'll have to learn a bit. There's a pin next to the name of the player in control of the board. Call on them to pick a clue. Click on the clue, and it will pop up on your screen as well as the board. Read it to the contestants and them buzz in. Your screen will also have the answer, so be sure not to read that! If someone buzzes in and gets it wrong, click the X underneath their name. If they get it right, hit the checkmark. Hit the Submit button to end the clue and update scores. The control pin will automatically switch to whichever player answered correctly. If no one gets it right, control of the board does not change.

If you see a yellow "DD" next to a clue, it's a Daily Double! Don't start reading it right away! The contestant who got it needs to bid first. Make sure the correct name is highlighted, enter the contestant's bid, then hit the Confirm button. Now read the clue and record whether they get it correct.

If you see a red "TS" next to a clue, that means it was a Triple Stumper on the show. Nothing too significant, but sometimes it's nice to tell your contestants they're smarter than the folks on the show that day!

When all the clues are gone, hit the "End Round" button. Between the Jeopardy! and Double Jeopardy! rounds, the contestants' scores will be displayed on the board, and control will be given to the player with the lowest score.

When you reach Final Jeopardy!, you must enter the contestants' wagers before the question is displayed. If you really want to get serious, there will be a link to J! Archive's wagering suggestions page, automatically populated with your contestants' names and scores. If you're actually practicing for Jeopardy!, you'd better be learning how to wager properly. Confirm the wagers, read the question (the Think! music will automatically start playing), let your contestants write down their answers, then enter the results. Hit the "End Round" button one last time to display your contestants' final scores on the big screen, and you're all done! (This is dumb that I didn't just make it happen automatically, but oh well.)

Let's just reiterate that, be sure to hit "End Round" at the end of Final Jeopardy! This will display the final scores, as well as save a log of the game's results to a file on your computer in the `games` folder. You are also given some convenient links to the J! Archive so you can see how the real game played out. You can then use the "Reset Game" button if you'd like to play again, or use your browser's Back button to go back and pick another game.

## Known Issues (TODO)

* Media is proxied from J! Archive, so if a clue had pictures, they will be shown on the game board. However, media frequently comes up missing on J! Archive. The links are there, but they don't go to anything. In other cases, the media linked is not an image but an MP3 audio clip or WMV video clip. The board is dumb and tries to display everything as an image, so these also do not appear correctly.

* Some bits of the interface are clunky and could be streamlined, such as picking the player for a Daily Double or having to manually end the round when all clues are answered.

* Contestants are only shown their scores between rounds, at Daily Doubles, and before Final Jeopardy! I just couldn't find any good board real estate to use on it, and on the real set, they're not very convenient to look at during the game anyhow.

* The order in which clues were chosen is not persisted to the saved game file.

* There is no easy way to adjust a contestant's score if the host makes a mistake. When necessary, we just added some scoring notes in the field with the contestant's name.

* There is no way to un-answer a clue or un-end a round. Once they're gone, they're gone, unless the entire game is reset.

## Technology (TODO)

This project is based on the excellent [angular-socket-io-seed](https://github.com/btford/angular-socket-io-seed) template, so it can use Socket.io to push messages from the host interface, through the server, to the game board. There's no way I could have gotten it up and running quickly without this, this was my first project with sockets!

Other key tech includes:

* [UI Bootstrap](https://angular-ui.github.io/bootstrap/) for modal dialogs and carousels.
* [cheerio](https://github.com/cheeriojs/cheerio) for parsing J! Archive HTML pages.
* [http-proxy](https://github.com/nodejitsu/node-http-proxy) for serving images from J! Archive.

## Fork and acknowledgments

This repository is a (modified) fork of [theGrue/jeopardy](https://github.com/theGrue/jeopardy) which is based on [btford/angular-socket-io-seed](https://github.com/btford/angular-socket-io-seed).

The main acknowledgments belongs to [theGrue](https://github.com/theGrue), [btford](https://github.com/btford) + contributors.
Thanks a lot! You created a huge thing.

## Disclaimer (TODO)

Borrowing this one from J! Archive, just in case.

> The Jeopardy! game show and all elements thereof, including but not limited to copyright and trademark thereto, are the property of Jeopardy Productions, Inc. and are protected under law. This website is not affiliated with, sponsored by, or operated by Jeopardy Productions, Inc.
