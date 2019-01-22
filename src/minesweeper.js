// Store a func that generates a blank board of a given size to hold the player's guesses
const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
  let board = [];   // Overall game board
  for (let i = 0; i < numberOfRows; i++){
    let row = [];   // Single row
    for (let j = 0; j < numberOfColumns; j++){
      row.push(' ');
    }
    board.push(row);
  }
  return board;
};

// Bomb board
const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  let board = [];   // Overall game board
  for (let i = 0; i < numberOfRows; i++){
    let row = [];   // Single row
    for (let j = 0; j < numberOfColumns; j++){
      row.push(null);
    }
    board.push(row);
  }

  let numberOfBombsPlaced = 0;    // Bomb counter
  while (numberOfBombsPlaced < numberOfBombs){
    const randomRowIndex = Math.floor(Math.random() * numberOfRows);
    const randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

    board[randomRowIndex][randomColumnIndex] = 'B';   // Bomb at a random location
    numberOfBombsPlaced++;

    // IMPORTANT!: The code in your while loop has the potential to place bombs on top of already existing bombs.
  }
  return board;
};





/*
This updated printBoard() function will accept a game board as a parameter,
iterate through each of its rows, join the individual elements in each row,
and then join all rows together. It will return a brand new game board as
a single string to be easily printed.
*/

const printBoard = board => {
  // .map(), .join() - Returns an array of formatted rows
  // .join() - This will join together the array of rows with new lines, placing each row on its own line when printed.
  console.log(board.map(row => row.join(' | ')).join('\n'));
};


const playerBoard = generatePlayerBoard(3, 3);
const bombBoard = generateBombBoard(3, 2, 2);

printBoard(playerBoard);
