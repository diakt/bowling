
##Bowling Challenge

Brief is available at [wiki](https://github.com/omdriven/bowling/wiki/Brief).

Demo is available at [omdriven.github.io/bowling](http://omdriven.github.io/bowling/). 

###Build

System requirements: `nodejs@4`, `npm@3`

Setup and run: `npm i`

Tests and dev server run automatically after install over the `postintall` script and the app starts at [http://localhost:8080/](http://localhost:8080/).

Start development server: `npm start`

Run tests: `npm run test`

Make build: `npm run build`

###Game 

__Features__

- maximum 10 frames per game, number of the current frame is printed on a screen
- infinite number of players :), at least one player must be added to start the game
- counting strikes and spares in the Ten-pin bowling way
- generator of random roll with probability feature (the first roll is often more lucky)
- player who earned more points gets marked by the ‘winner’ label
- current player is marked by bold font
- player who exits game but still waiting for others is marked by the 'exit' label

__Architecture__

The application represents the state machine pattern implemented in terms of Flux.

It provides a single `state` object and three actions – `ADD_PLAYER`, `START` and `ROLL`. There is  a `Store` module, which handles the `actions` and operates with data in the `state` object. The `state` keeps everything regarding current game moment:

- current frame number
- stats of the current turn: 
	- number of knocked down pins,
	- available pins, 
	- score, 
	- id of active player
- a list of players with their own inner stats like
	- points received in the previous frames
	- strikes and spares
	- number of pins

The way how the scoring system counts pins and knocks down new ones is ruled by the `Game` module. This module is covered with unit tests as the most crucial in case of the game logic.

Views are implemented in a way similar to React components. Each component renders on every update of the `state`.

###Details of application

The app uses vanilla HTML5, CSS3 and ES6 powered by the Webpack devtools. Unit tests made with Mocha and Chai.

The core of interaction is placed into the `Store` module, it conducts the game flow due to data and rules provided by the `Game`. 

The rules are implemented over static methods operating with pins and counting points. Also the `Game` keeps information about how many frames can be played and if the currect frame is the last. `Store` deals with `Game` over number of pins passed as arguments in almost every method call. As a bonus feature `Game` provides the `roll` method which returns a random number of knocked down pins.

`Store` acts on the following scheme:

- after receiving the `roll` action from one of the buttons, the `Store` picks up the number of pins brought by the `action` object or requests a random number of pins from the `Game`
- adds received points to the current player's `score` kept in the `state`
- adds points to the array called `pins` also kept in the `state`
- takes the number of pins from the `state` and passes it to the `Game` to count player points and determine the next step of a game

In overall, the `Store` manages global flow of a game using the `Game` as a kind of indicator which represents the conseqence of the `roll` action expressed in the number of pins.

All the data collected by the `Store` while managing the action is set to its `state` and finally the `Store` emits the `change` message. Connection between business logic and view of the app is set over this message.

As long as current implementation is rather simplified in comparison with real-world applications, all the child nodes of application are replaced on every update of the `state`. There is no so called virtual dom mechanism, but simplicity helps to keep the view update flow clear in just few lines of code. 

The root component `App` subscribes to the `change` message and forces rendering of all its child components. Every component extends the basic class called `Abstract` in case of receiving the smart `update` method. It provides an ability to deal with inner code of component in a straightforward way.

The render process of component commonly consists of following phases:

- run `prepareProps` method providing the `props` object for templating child elments due to conditions of the current `state` snapshot
- inject the `props` into every child elment over its template function and receive the latest version of the child element
- create an array of children to combine child elements before setting them to the DOM
- run `update` method to place elements into the DOM and initialize components connected with the elements

The `update` method allows two types of child elements:
	
- `HTMLElement`
- Class based on `Abstract` component having the static `tpl` method which returns the component's root element typed as HTMLElement

Component templates are organized over ES6 functions using template strings. 
