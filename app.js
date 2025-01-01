const gameBoard = (function () {
  const grid = ["", "", "", "", "", "", "", "", ""];

  const fetchGrid = () => grid;
  const updateGrid = (makeMove, positionIdx) => (grid[positionIdx] = makeMove);

  return { fetchGrid, updateGrid };
})();

const gameController = (function () {
  //make player choice
  let symbolX = true;
  const makeMove = (positionIdx) => {
    if (symbolX) {
      gameBoard.updateGrid("X", positionIdx);
      symbolX = false;
    } else {
      gameBoard.updateGrid("O", positionIdx);
      symbolX = true;
    }

    // To render the display after every move
    displayController.renderDisplay();

    //check win or tie condition after every move
    let win = false;
    win = checkWinCondition();

    if (!win) {
      checkTieCondition();
    }
  };

  //caching fetchGrid
  const grid = gameBoard.fetchGrid();

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
        console.log(`${grid[a]} Wins`);
        return true;
      }
    }
    return false;
  }

  function checkTieCondition() {
    let tie = true;
    for (let i = 0; i < 9; i++) {
      if (grid[i] == "") {
        tie = false;
        break;
      }
    }
    if (tie) {
      console.log("Tie!");
    }
  }

  return { makeMove };
})();

// function createPlayer(name) {
//   const displayName = "@" + name;
//   const { makeMove } = gameController;
//   return { displayName, makeMove };
// }

// const bill = createPlayer("bill");
// const stan = createPlayer("stan");

const displayController = (function () {
  const cells = document.querySelectorAll(".cell");

  // Cache fetchGrid
  const grid = gameBoard.fetchGrid();

  // makeMove at clicked cell
  cells.forEach((cell, idx) => {
    cell.addEventListener("click", () => {
      if (grid[idx] == "") {
        // only allow to click at empty cells
        gameController.makeMove(idx);
      }
    });
  });

  // Render gameBoard on page
  const renderDisplay = () => {
    cells.forEach((cell, idx) => {
      cell.textContent = grid[idx]; // Assign grid value to each cell
    });
  };

  return { renderDisplay };
})();
