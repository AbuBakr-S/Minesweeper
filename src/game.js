import { Board } from './board';

class Game {
  // When a user creates an instance of a board (using the constructor), they will be asked to specify the size of the board as well as the number of bombs on the board (which is what the parameters represent)
  constructor(numberOfRows, numberOfColumns, numberOfBombs){    // To use this class later (as an object), we'll need to add a constructor for the class
    //  _board will be used to call Board methods on it
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);  // To call Board methods, we'll have to create an instance of a Board inside of the Game constructor
  }

  //  Include all of the functionality needed to play a session of Minesweeper, including flipping a tile, letting the user know if they discovered a bomb, and allowing a user to continue otherwise (until they win, or lose)
  playMove(rowIndex, columnIndex){
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B'){
      console.log('Game Over! Final Board:');
      this._board.print();
    } else if(!this._board.hasSafeTiles()){   // if a board doesn't have any safe tiles left on it, then the user has won. True = Continue, False = End
      console.log('Congratulations, you won!');
    } else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}
