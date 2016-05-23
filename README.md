##Bowling Challenge
>

The brief is available at [wiki](https://github.com/diakt/bowling/wiki/Brief).

__Features:__

- maximum 10 frames per game, current frame is printed on a screen
- infinite number of players :), at least one player must be added to start the game
- counting strikes and spares in the Ten-pin bowling way
- generator of random pins with some probability features (the first roll often is more lucky)
- player who earned more points gets marked by the ‘winner’ label
- current player is marked by bold font

__Architecture:__

Basically, it represents the state machine pattern implemented in terms of Flux.

It provides single State object and just three Actions – `ADD_PLAYER`, `START` and `ROLL`. There is also the Store module, which handles Actions and operates with data placing it to the State. The State keeps everything regarding current game moment: 

- current frame's number
- current turn: knocked pins, available pins, total score
- the id of active player
- a list of players


The way how the scoring system counts pins and knocks down new ones is ruled by the gameService module.
This module is covered with unit tests.

The View is implemented in a React way. It is divided into isolated components, which render on every update of the State.
