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
}

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
}
