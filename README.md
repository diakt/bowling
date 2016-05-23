##Bowling Challenge
>

The brief is available at [wiki](https://github.com/diakt/bowling/wiki/Brief).

###Build

System requirements: `nodejs@4`, `npm@3`

Setup and run: `npm i`

Tests and Webpack dev server run automatically after install over the `postintall` script and app starts at the [http://localhost:8080/](http://localhost:8080/).

Development server: `npm run dev`


###Game 

__Features:__

- maximum 10 frames per game, current frame is printed on a screen
- infinite number of players :), at least one player must be added to start the game
- counting strikes and spares in the Ten-pin bowling way
- generator of random pins with some probability features (the first roll often is more lucky)
- player who earned more points gets marked by the ‘winner’ label
- current player is marked by bold font

__Architecture:__

The application represents the state machine pattern implemented in terms of Flux.

It provides single State object and just three Actions – `ADD_PLAYER`, `START` and `ROLL`. There is also the Store module, which handles Actions, operates with data in the State. The State keeps everything regarding current game moment:

- current frame's number
- stats of the current turn: knocked pins, available pins, total score
- the id of active player
- a list of players with their own inner stats


The way how the scoring system counts pins and knocks down new ones is ruled by the Game module. This module is covered with unit tests as the most crucial in case of application business logic.

Views are implemented in a way similar to React components. Each component renders on every update of the State.
