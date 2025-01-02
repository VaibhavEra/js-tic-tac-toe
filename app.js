const gameBoard = (function () {
  const grid = ["", "", "", "", "", "", "", "", ""];

  const fetchGrid = () => grid;
  const updateGrid = (makeMove, positionIdx) => (grid[positionIdx] = makeMove);

  return { fetchGrid, updateGrid };
})();

const gameController = (function () {
  //caching fetchGrid
  const grid = gameBoard.fetchGrid();

  //make player choice
  let firstMarker = true;
  const makeMove = (positionIdx) => {
    if (firstMarker) {
      gameBoard.updateGrid("X", positionIdx);
      firstMarker = false;
    } else {
      gameBoard.updateGrid("O", positionIdx);
      symbolfirstMarker = true;
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

function createPlayer(name) {
  const displayName = () => {
    "@" + name;
  };
  const { makeMove } = gameController;
  return { displayName, makeMove };
}

const displayController = (function () {
  const cells = document.querySelectorAll(".cell");
  const dialog = document.querySelector("#dialog");
  const submit_btn = document.querySelector("#submit-btn");
  const player1Name = document.querySelector("#player1_name");
  const player2Name = document.querySelector("#player2_name");
  const playerNameDiv = document.querySelector(".playerName");

  // Cache fetchGrid
  const grid = gameBoard.fetchGrid();

  function init() {
    initDialog();
    cellEventListener();
  }

  // Render gameBoard on page
  const renderDisplay = () => {
    cells.forEach((cell, idx) => {
      cell.textContent = grid[idx]; // Assign grid value to each cell
    });
  };

  function initDialog() {
    dialog.showModal();

    //to disable submit btn
    submit_btn.addEventListener(
      "click",
      (e) => {
        e.preventDefault();
      },
      false
    );

    //to disable esc button
    dialog.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
      }
    });
  }

  function cellEventListener() {
    //attach event listner to every cell for making a move on click
    cells.forEach((cell, idx) => {
      cell.addEventListener("click", () => {
        if (grid[idx] == "") {
          // only allow to click at empty cells
          gameController.makeMove(idx);
        }
      });
    });
  }

  submit_btn.addEventListener("click", () => {
    const player1 = createPlayer(player1Name);
    const player2 = createPlayer(player2Name);
    renderPlayerName(player1.displayName());
    dialog.close();
  });

  function renderPlayerName(name) {
    playerNameDiv.textContent = `${name}`;
  }

  init();

  return { renderDisplay, renderPlayerName };
})();
