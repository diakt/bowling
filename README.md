
##Bowling Challenge

Brief is available at [wiki](https://github.com/diakt/bowling/wiki/Brief).

Demo is available at [diakt.github.io/bowling](http://diakt.github.io/bowling/). 

###Build

System requirements: `nodejs@4`, `npm@3`

Setup and run: `npm i`

Tests and Webpack dev server run automatically after install over the `postintall` script and app starts at the [http://localhost:8080/](http://localhost:8080/).

Start development server: `npm start`

Run tests: `npm test`

Make build: `npm run build`

###Game 

__Features__

- maximum 10 frames per game, number of the current frame is printed on a screen
- infinite number of players :), at least one player must be added to start the game
- counting strikes and spares in the Ten-pin bowling way
- generator of random roll with probability feature (the first roll often is more lucky)
- player who earned more points gets marked by the ‘winner’ label
- current player is marked by bold font

__Architecture__

The application represents the state machine pattern implemented in terms of Flux.

It provides a single state object and three actions – `ADD_PLAYER`, `START` and `ROLL`. There is also a `Store` module, which handles the `actions` and operates with data in the `state`. The `state` keeps everything regarding current game moment:

- current frame number
- stats of the current turn: knocked down pins, available pins, total score
- id of active player
- a list of players with their own inner stats

The way how the scoring system counts pins and knocks down new ones is ruled by the `Game` module. This module is covered with unit tests as the most crucial in case of game logic.

Views are implemented in a way similar to React components. Each component renders on every update of the `state`.

###Details of application

The app uses vanilla HTML5, CSS3 and ES6 powered by the Webpack devtools. Unit tests made with Mocha and Chai.

The core of interaction is placed into the `Store` module, it conducts the game flow due to the data and rules provided by the `Game` module. 

The `Game` module provides a class containing static methods for operating with pins and counting points. Also it keeps information about how many frames can be played and if the currect frame is the last. `Store` deals with `Game` over the number of pins passed as arguments in almost every method call. As a bonus feature `Game` module provides the `roll` method which returns a random number of knocked down pins.

The `store` acts on the following scheme:

- After receiving the `roll` action from one of the buttons, the `Store` picks up the number of pins brought by the `action` object or requests a random number of pins from the `Game`. 
- Then it adds received points to the current player's score kept in the `state`. 
- Then the points are added to the number of pins, knocked down in the current turn. 
- Then the number of pins is passed to the `Game` to count the player's points and determine the next step of a game. 

In overall, the `Store` manages the global flow of a game using the `Game` as a kind of indicator which represents the conseqence of the `roll` action.

All the data collected by the `Store` while managing the action is set to the `state` and finally a `change` message is emitted by the `Store`. The connection between business logic and view of the app is set over this message.

As long as current implementation is rather simplified in comparison with real-world applications, all the child nodes of application are replaced after every update of the state. There is no so called virtual dom mechanism, but simplicity helps to keep the components update flow clear in just few lines of code. 

The root component `App` subscribes to the `change` message and forces rendering of all its child components. Every component extends the basic class called `Abstract` component in case of receiving the smart `update` method. It provides an ability to deal with inner code of component in a pretty clear way.

The render process of component commonly consists of folowing phases:

- Run `prepareProps` method providing the `props` object for templating the child elments due to conditions of the current `state` snapshot
- Inject the props into every child elment over its template function
- Create an array of children to combine child elments before set them to the DOM
- Run `update` method to place elements into the DOM or initialize components connected with elements

The `update` method allows two types of child elements:
	
- `HTMLElement`
- Class based on `Abstract` component having the static tpl method, which returns the root HTMLElement 

Component templates are organized over ES6 functions using template strings. 




















