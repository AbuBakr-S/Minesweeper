class Board {
  // To use this class as an object later, we'll need to add a constructor for the class
  // When a user creates an instance of a board (using the constructor), they will need to specify the size of the board as well as the number of bombs on the board (which is what the parameters represent)
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;    // Set an instance's property which should not be accessed / modified directly. _variable denotes Private Variable
    this._numberOfTiles = (numberOfRows * numberOfColumns);    // Represent the size of the game board. Will be used to determine whether the game is over at the end of each turn
    // // generatePlayerBoard() and generateBombBoard are a static methods
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);    //Call the function on the Board Class directly
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);    //Call the function on the Board Class directly
  }

  get playerBoard() {
    return this._playerBoard;
  }

  // ### Check nearby bombs ###
  // This will calculate the number of bombs next to the tile to be flipped at the given row and column on the provided bombBoard
  // Use these rowIndex and columnIndex offsets to check the surrounding tiles around a flipped tile
  // Go through each neighbourOffset and add ROW to our current Row and COLUMN to our current Column so we can check to see if there is or isn't a bomb there
  // Iterate through each nested array in neighbourOffsets | ROW/COLUMN

  getNumberOfSurroundingBombs(flipRow, flipColumn) {
    // These represent all the possible offset combintations of neighboring tiles. [-1, 1] means 1 tile above and 1 tile right. These will be +/- from [row, column]
    const neighbourOffsets = [
      [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
    ];

    const numberOfRows = this._bombBoard.length;    // The array structure: [[row], [column]] bombBoard(3,3) would have a length of 3
    const numberOfColumns = this._bombBoard[0].length;
    let numberOfSurroundingBombs = 0;    // Count the number of adjacent bombs to a flipped tile

    neighbourOffsets.forEach(offset => {    // Return the number of bombs in an adjacent neighbor
      const neighbourRowIndex = flipRow + offset[0];   // Go to current row and add offset to check neighbour tile
      const neighbourColumnIndex = flipColumn + offset[1];   // Go to current column and add offset to check neighbour tile

      // Check to see if row and column are valid tile values on the board. 0,0 is the first tile. -1, -1 offset does not exist for the first tile
      // If neighbourRow = numberOfRows, it will increase the 0 index that's already off the board
      if (neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows && neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns){
        // Check if the tile at those indices (on the bombBoard) already contains a bomb ('B')
        if (this._bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B'){
          numberOfSurroundingBombs++;
        }
      }
    });

    return numberOfSurroundingBombs;   // Return number of bombs surrounding every neighbour
  }

  // Check for safe tiles
  // A user wins when there are no non-bomb ("safe") tiles remaining to be flipped
  hasSafeTiles() {

  }

  // ### Add flipTile() ###
  // Aim: To allow the player to flip a tile and to update that tile accordingly

  /* The function should explicitly check for two things:
  1) If the specified tile has already been flipped
  2) If the specified tile has a bomb in it
  Otherwise, that tile should be updated with the number of neighboring bombs */

  flipTile(rowIndex, columnIndex) {
    // Check if tile is already flipped (blank space is initial state). If so, return
    if (this._playerBoard[rowIndex][columnIndex] !== ' '){
      console.log('This tile has already been flipped!');
      return;
    //Check if tile is bomb. If so, place bomb on player board
    } else if (this._bombBoard[rowIndex][columnIndex] === 'B'){
      this._playerBoard[rowIndex][columnIndex] = 'B';
    } else {
    // Otherwise, display number of surrounding bombs on player board
      this._playerBoard[rowIndex][columnIndex] = this.getNumberOfSurroundingBombs(rowIndex, columnIndex);
    }
    this._numberOfTiles--;
  }


  // ### Print Board ###
  /*
    This updated printBoard() function will accept a game board as a parameter,
    iterate through each of its rows, join the individual elements in each row,
    and then join all rows together. It will return a brand new game board as
    a single string to be easily printed.
  */

  // Join together each element in each row with ' | ' to create a well-formated row, then join together each row with '\n' to print each row on its own line
  print() {
   console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));  // Callback function with 'row' as param. This .map() call will now return an array of formatted rows
  }


  // ### Dynamically generate a player board ###
  // 1) Create a game board of a specified size that will generate a blank board to hold the player's guesses
  // 2) Loop through nested arrays to access each column inside each row and add blanks
  // 3) Add the rows to the board

  // Static methods, not instance: We only need one version of this. Every instance of Board does not need a copy of this
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        row.push(' ');  // Add a space inside each element to represent empty value on UI
      }
      board.push(row);  // Add each row of spaces (columns), to the board
    }
    return board;
  }


  // ### Dynamically generate bomb board ###
  /* 1) Create the game board of the specified size that will hold the system generated bombs
     2) Loop through nested arrays to access each column inside each row
     3) Add the rows to the board
     4) Setup a bomb counter and add the specified amount of bombs
     5) Generate random indexes to place the bombs in random locations
     6) Check for duplicates */

  // Static methods, not instance: We only need one version of this. Every instance of Board does not need a copy of this
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = [];
    for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
      const row = [];
      for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
        row.push(null);  // Correct data type for empty value
      }
      board.push(row);  // Add each row of spaces (columns), to the board
    }

    // Randomly place bombs on the bomb board
    let numberOfBombsPlaced = 0;  // Bomb counter

    while (numberOfBombsPlaced < numberOfBombs){
      // Return a random row and column index that is actually a whole number
      const randomRowIndex = Math.floor(Math.random() * numberOfRows);
      const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

      // Check for duplicate bombs
      if (board[randomRowIndex][randomColumnIndex] !== 'B'){
        board[randomRowIndex][randomColumnIndex] = 'B';  // Place a Bomb at a random location
        numberOfBombsPlaced++;
      }
    }

    return board;
  };

}


const board = new Board(3, 3, 4);
console.log('Current Board: ');
board.print();

board.flipTile(1, 1);
console.log('Updated Board: ');
board.print();
