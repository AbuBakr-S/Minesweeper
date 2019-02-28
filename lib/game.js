'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

var _board = require('./board');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  // When a user creates an instance of a board (using the constructor), they will be asked to specify the size of the board as well as the number of bombs on the board (which is what the parameters represent)
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    // To use this class later (as an object), we'll need to add a constructor for the class
    //  _board will be used to call Board methods on it
    this._board = new _board.Board(numberOfRows, numberOfColumns, numberOfBombs); // To call Board methods, we'll have to create an instance of a Board inside of the Game constructor
  }

  //  Include all of the functionality needed to play a session of Minesweeper, including flipping a tile, letting the user know if they discovered a bomb, and allowing a user to continue otherwise (until they win, or lose)


  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this._board.flipTile(rowIndex, columnIndex);
      if (this._board.playerBoard[rowIndex][columnIndex] === 'B') {
        console.log('Game Over! Final Board:');
        this._board.print();
      } else if (!this._board.hasSafeTiles()) {
        // if a board doesn't have any safe tiles left on it, then the user has won. True = Continue, False = End
        console.log('Congratulations, you won!');
      } else {
        console.log('Current Board:');
        this._board.print();
      }
    }
  }]);

  return Game;
}();
