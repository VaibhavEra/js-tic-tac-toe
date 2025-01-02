const gameBoard = (function () {
  const grid = ["", "", "", "", "", "", "", "", ""];

  // Fetch the current state of the grid
  const fetchGrid = () => grid;

  // Update the grid with the player's move
  const updateGrid = (makeMove, positionIdx) => (grid[positionIdx] = makeMove);

  return { fetchGrid, updateGrid };
})();

const gameController = (function () {
  // Caching fetchGrid
  const grid = gameBoard.fetchGrid();

  let firstMarker = true; // Determines which player's turn it is
  let gameOver = false;
  let player1 = null;
  let player2 = null;

  // Function to make a move
  const makeMove = (positionIdx) => {
    if (gameOver) {
      return; // Prevent further moves if the game is over
    }

    // Determine current player and marker
    const currentPlayer = firstMarker ? player1 : player2;
    const marker = firstMarker ? "X" : "O";

    // Update grid with the current player's move
    gameBoard.updateGrid(marker, positionIdx);
    firstMarker = !firstMarker; // Toggle turn

    // Render the display and update the player name display
    displayController.renderDisplay();
    displayController.renderPlayerName(
      firstMarker ? player1.displayName : player2.displayName,
      false
    );

    // Check win or tie conditions
    if (checkWinCondition()) {
      console.log(`${currentPlayer.name} Wins!`);
      displayController.renderPlayerName(`${currentPlayer.name} Wins!`, true);
      gameOver = true;
    } else if (checkTieCondition()) {
      displayController.renderPlayerName(`Tie, TOP Rocks!`, true);
      console.log("Tie!");
      gameOver = true;
    }
  };

  // Check if a player has won
  function checkWinCondition() {
    const winPatterns = [
      [0, 1, 2], // Rows
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6], // Columns
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8], // Diagonals
      [2, 4, 6],
    ];

    for (const [a, b, c] of winPatterns) {
      if (grid[a] && grid[a] === grid[b] && grid[b] === grid[c]) {
        return true;
      }
    }
    return false;
  }

  // Check if the game is a tie
  function checkTieCondition() {
    return grid.every((cell) => cell !== "");
  }

  // Reset the game state
  const resetGame = () => {
    grid.fill("");
    firstMarker = true;
    gameOver = false;
    displayController.renderDisplay();
  };

  // Set the player objects
  const setPlayers = (p1, p2) => {
    player1 = p1;
    player2 = p2;
    displayController.renderPlayerName(player1.displayName, false); // Start with Player 1's turn
  };

  return { makeMove, resetGame, setPlayers };
})();

// Factory function to create a player
function createPlayer(name) {
  const displayName = "@" + name;
  return { name, displayName };
}

const displayController = (function () {
  const cells = document.querySelectorAll(".cell");
  const dialog = document.querySelector("#dialog");
  const submit_btn = document.querySelector("#submit-btn");
  const player1Name = document.querySelector("#player1_name");
  const player2Name = document.querySelector("#player2_name");
  const playerNameDiv = document.querySelector(".playerName");
  const restart_btn = document.querySelector("#restart_btn");

  // Cache fetchGrid
  const grid = gameBoard.fetchGrid();

  function init() {
    initDialog();
    cellEventListener();
    submitBtnEvent();
    restartBtn();
  }

  // Render the game board on the page
  const renderDisplay = () => {
    cells.forEach((cell, idx) => {
      cell.textContent = grid[idx]; // Assign grid value to each cell
    });
  };

  // Initialize the dialog for player name input
  function initDialog() {
    dialog.showModal();

    // Disable submit button
    submit_btn.addEventListener("click", (e) => {
      e.preventDefault();
    });

    // Disable Esc button
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "Escape") e.preventDefault();
    });
  }

  // Attach event listeners to each cell for making a move on click
  function cellEventListener() {
    cells.forEach((cell, idx) => {
      cell.addEventListener("click", () => {
        if (grid[idx] === "") {
          gameController.makeMove(idx); // Only allow clicking empty cells
        }
      });
    });
  }

  // Handle submit button click event
  function submitBtnEvent() {
    submit_btn.addEventListener("click", () => {
      const player1 = createPlayer(player1Name.value);
      const player2 = createPlayer(player2Name.value);
      gameController.setPlayers(player1, player2); // Pass players to gameController
      dialog.close();
    });
  }

  // Render the player's name whose turn it is
  function renderPlayerName(name, bool) {
    bool
      ? (playerNameDiv.textContent = `${name}`)
      : (playerNameDiv.textContent = `${name}'s Turn`);
  }

  // Handle restart button click event
  function restartBtn() {
    restart_btn.addEventListener("click", () => {
      player1Name.value = "";
      player2Name.value = "";
      gameController.resetGame();
      init();
    });
  }

  init();

  return { renderDisplay, renderPlayerName };
})();
