###Bowling Challenge

####Brief

The implementation should use "vanilla" JavaScript (no libraries or frameworks).

__Minimum (keep in mind the optional requirements):__

 * Implement a scoring system for a bowling game according to these rules:

  - A game consists of 10 frames.
  - In general each frame has 2 rolls.
  - In general a player scores the number of pins knocked down.
  - If the player knocks down all 10 pins on the first roll it’s a strike. The player scores 10 plus the number of pins knocked down in the next two rolls.
  - If the player knocks down all 10 pins in two rolls it’s a spare. The player scores 10 plus the number of pins knocked down in the next roll.

* Simple visualisation of the game.

__Optional:__

* Add support for the last frame in the game:
 - The player gets additional rolls in the last frame: one additional for a spare after the second roll or two extra rolls for a strike.
* Create a method that randomly throws a roll (one roll is 1-10 pins knocked down), and progresses the scoring.
* Support multiple players.
* Or anything fun you can think of :)


####Result

__The feature list:__

- maximum 10 frames per game, current frame is printed on a screen
- infinite number of players :) you must add at least one to start the game
- counting strikes and spares, I used the rules of Ten-pin bowling to get deeper into details https://en.wikipedia.org/wiki/Ten-pin_bowling
- generator of random pins with some probability features (the first roll often is more lucky)
- player earned more points wins the game is gets marked by the ‘winner’ label
- current player is marked by bold font

__Architecture:__

It provides one state object (like the Redux state) and just three actions – add new player, start the game and roll.
Also there is the Store module, which handles actions and operates with data.
The way how it exactly counts points, rules players' turns and sets data into the state is ruled by the gameService module.
The gameService module implements the rules of bowling scoring system so it is covered with unit tests.
The View is implemented in a React way. It is divided into isolated components, which render on every update of the State.
