// Format the Game Board with printBoard()
const printBoard = board => {
  console.log('Current Board:');
  /*
  The join() method will create + returns a new string by concatenating all
  of the elements in an array, separated by a pipe.
  */
  console.log(board[0].join(' | '));
  console.log(board[1].join(' | '));
  console.log(board[2].join(' | '));
}

// Create 3 X 3 board
const board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

// Print new board
printBoard(board);

// Hard code value 1 as player's guess.
board[0][1] = '1';
// Hard code value B as the bomb.
board[2][2] = 'B';

// Print hard-coded board.
printBoard(board);
