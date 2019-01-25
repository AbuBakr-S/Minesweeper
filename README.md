# Minesweeper
This is a take on the classic 'Minesweeper' game built using JavaScript which when completed, will be playable in the local terminal.


A few of things to note:

Remember that the bomb board is randomly generated, so your output may not be an exact replica of the output depicted in the example above. Run your code a couple of more times and notice how the bombs rearrange themselves randomly.
Your bomb board may sometimes have fewer bombs on it than what was specified in the function call. This is due to the missing control flow code mentioned in Step 26.

Your bomb board will not appear as neatly formatted as the player board. This is because you are adding null to its board. This is fine, as this is a board that is intended to only hold information, and not to be printed. We are printing here to demonstrate the utility of the generateBombBoard() function.

1. Create a function that could take any number of rows x columns and create a board. We do this by iterating through the number of rows we want to add, creating a new row, and then pushing the number of blank spaces before returning the board.
2. Create a similar generate board function to store bomb locations and instead of pushing blank spaces, we pushed out nulls as the correct data type for storing no values. Then add bombs to our board with a while loop where we've got a random row and column, placing a 'B' there, with a counter incrementing until the set value is met.
3. Modify printBoard function to print any number of rows x columns. 
