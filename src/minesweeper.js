// ### Section 1: Dynamically generate a player board ###

// 1) Create the game board of the specified size

// This will store a function that will generate a blank board of a given size to hold the player's guesses
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {

  const board = [];  // Represent overall game board
  // Loop through nested arrays
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(' ');  // Add a space inside each element to represent empty value on UI
    }
    board.push(row);  // Add each row of spaces (columns), to the board
  }
  return board;
};

// console.log(generatePlayerBoard(6, 6));



// ### Section 2: Dynamically generate bomb board ###

// 1) Create the game board of the specified size
// 2) Add bombs to random squares on the game board

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {

  const board = [];  // Represent overall game board
  // Loop through nested arrays
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


// ### Section 5: Check nearby bombs ###

// This will calculate the number of bombs next to the tile to be flipped at the given rowIndex and columnIndex on the provided bombBoard.
const getNumberOfNeighbourBombs = (bombBoard, rowIndex, columnIndex) => {

  // These represent all the possible offset combintations of neighboring tiles
  // -1, 1 means 1 tile above and 1 tile right
  //  These will have to be added/suntracted from [row, column]
  const neighbourOffsets = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  const numberOfRows = bombBoard.length;    // What is this???
  const numberOfColumns = bombBoard[0].length;    // The first element is a row, and the number of entries in a row represents the total number of columns
  let numberOfBombs = 0;    // Store the number of adjacent bombs to a flipped tile

  // Use these rowIndex and columnIndex offsets to check the neighbours around a flipped tile
  // By adding the Row or Column value to each possible neighbour, we can figure out the neighbour tile locations

  // Iterate through each nested array in neighbourOffsets | ROW/COLUMN
  // Store the index of a neghbouring tile on a Row/Column
  neighbourOffsets.forEach(offset => {    // Return the number of bombs in an adjacent neighbor.
    const neighbourRowIndex = rowIndex + offset[0];   // Store index of neighbouring tile on a ROW
    const neighbourColumnIndex = columnIndex + offset[1];   // Store index of neighbouring tile on a COLUMN
    // Checking legal/valid neighboring tiles (not off the grid)
    if (neighbourRowIndex >= 0 && neighbourRowIndex < numberOfRows && neighbourColumnIndex >= 0 && neighbourColumnIndex < numberOfColumns){
      // Check if the tile at those indices (on the bombBoard) already contains a bomb ('B').
      if (bombBoard[neighbourRowIndex][neighbourColumnIndex] === 'B'){
        numberOfBombs++;
      }
    }
  });

  return numberOfBombs;
};


// ### Section 3: Print Board ###
/*
  This updated printBoard() function will accept a game board as a parameter,
  iterate through each of its rows, join the individual elements in each row,
  and then join all rows together. It will return a brand new game board as
  a single string to be easily printed.
*/




// ### Section 5: Add flipTile()
/*
Aim: To allow the player to flip a tile and to update that tile accordingly.

The function should explicitly check for two things:
1) If the specified tile has already been flipped
2) If the specified tile has a bomb in it
Otherwise, that tile should be updated with the number of neighboring bombs.
*/
const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    if (playerBoard[rowIndex][columnIndex] !== ' '){    // Check for NOT empty tile
      console.log('This tile has already been flipped!');
      return;
    } else if (bombBoard[rowIndex][columnIndex] === 'B'){   //Check for Bomb at same location on bomb board
      playerBoard[rowIndex][columnIndex] = 'B';   // Places a bomb on the player board by checking the bomb board!
    } else {
      // If none of these cases are true, we should let the user flip the tile and then display the number of neighboring bombs on that same tile
      playerBoard[rowIndex][columnIndex] = getNumberOfNeighbourBombs(bombBoard, rowIndex, columnIndex);
    }
};



const printBoard = board => {
 // Join together each element in each row with ' | ' to create a well-formated row
 // Then join together each row with '\n' to print each row on its own line
 console.log(board.map(row => row.join(' | ')).join('\n'));  // Callback function with 'row' as param
};

// This .map() call will now return an array of formatted rows.




// ### Section 4: Create Both Boards ###
let playerBoard = generatePlayerBoard(3, 3);
let bombBoard = generateBombBoard(3, 3, 3);


// ### Section 5: Print both boards
console.log('Player Board: ');
printBoard(playerBoard);

console.log('Bomb Board: ');
// bombBoard will sometimes have less bombs than specified due to the previously-mentioned missing code.
// Additionally, printing bombBoard will not look clean due to use of null instead of ' ' - this should just be for debugging, not presentation.
printBoard(bombBoard);


// ### Section 7: Use Flip Tile
// Flip the tile at location [0,0] on the player board, and also check the bomb board for bombs at the location
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board:');

// Output
printBoard(playerBoard);
