// Store a func that generates a blank board of a given size to hold the player's guesses
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  const board = [];   // Overall game Board

  // Row 1) -  For each element
  // Row 2) - For each row we have, go through each element in each column
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];   // Single row
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(' ');    // Add blank space to each Row
    }
    board.push(row);    // Add the Row to the Board
  }
  return board;   // Return a constructed Board
};


// Bomb board will store all locations of the bombs in the background
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = [];   // Overall game board
  for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++){
    const row = [];   // Single row
    for (let columnIndex = 0; columnIndex < numberOfColumns; columnIndex++){
      row.push(null);   // Data over Visual, so null (no value) instead of blank space.
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;    // Bomb counter
  while (numberOfBombsPlaced < numberOfBombs){
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    // Check to see if there's already a bomb in a tile
    if (board[randomRowIndex][randomColumnIndex] !== 'B';){
      board[randomRowIndex][randomColumnIndex] = 'B';   // Bomb at a random location. 'B' for readability. True/false would be better.
      numberOfBombsPlaced++;
    }


    // IMPORTANT!: The code in your while loop has the potential to place bombs on top of already existing bombs.
  }
  return board;
};



// Display number of adjacent bombs to flipped tile
// Calculate the number of bombs next to the square at the given rowIndex and columnIndex on the provided bombBoard
const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {

  // Store the pairs of [rowOffset, columnOffset] for adjacent neighbors (Max 8) in array
  const neighbourOffests = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  const numberOfRows = bombBoard.length;
  // The first element is a row, and the number of entries in a row represents the total number of columns
  const numberOfColumns = bombBoard[0].length;

  // Store the number of bombs adjacent to the flipped tile
  const numberOfBombs = 0;

  // Grab the row and column indices of the tile that a user specifies (0, 2)
  // We'll have to use that to check for bombs around the tile in the first row and third column)

  // ForEach iterator and callback function to iterate through each array in neighbourOffests
  neighbourOffests.forEach(offset => {
    const neighborRowIndex = (rowIndex + offset[0]);
    const neighborColumnIndex = (rowIndex + offset[0]);
  });

};








/*
This updated printBoard() function will accept a game board as a parameter,
iterate through each of its rows, join the individual elements in each row,
and then join all rows together. It will return a brand new game board as
a single string to be easily printed.
*/


// Print out a board of any size
const printBoard = board => {
  // 1. Combining together all the elements in each row with pipes, into a string.
  // 2. Combining together those strings that have been generated, with new lines.
  console.log(board.map(row => row.join(' | ')).join('\n'));
};


const playerBoard = generatePlayerBoard(3, 4);
const bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);
