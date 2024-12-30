const gameBoard = (function () {
  const grid = ["", "", "", "", "", "", "", "", ""];

  const fetchGrid = () => grid;
  const updateGrid = (makeMove, positionIdx) => (grid[positionIdx] = makeMove);

  return { fetchGrid, updateGrid, grid };
})();

const gameController = (function () {
  //input player choice
  let symbolX = true;
  const makeMove = (positionIdx) => {
    if (symbolX) {
      gameBoard.updateGrid("X", positionIdx);
      symbolX = false;
    } else {
      gameBoard.updateGrid("O", positionIdx);
      symbolX = true;
    }
    let win = false;
    win = checkWinCondition();
    if (!win) {
      checkTieCondition();
    }
  };

  function checkWinCondition() {
    const grid = gameBoard.fetchGrid();
    for (let i = 0; i < 9; i += 3) {
      if (grid[i] != "" && grid[i + 1] != "" && grid[i + 2] != "") {
        if (grid[i] == grid[i + 1] && grid[i + 1] == grid[i + 2]) {
          console.log("win");
          return true;
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      if (grid[i] != "" && grid[i + 3] != "" && grid[i + 6] != "") {
        if (grid[i] == grid[i + 3] && grid[i + 3] == grid[i + 6]) {
          console.log("win");
          return true;
        }
      }
    }
    if (grid[0] != "" && grid[4] != "" && grid[8] != "") {
      if (grid[0] == grid[4] && grid[4] == grid[8]) {
        console.log("win");
        return true;
      }
    } else if (grid[2] != "" && grid[4] != "" && grid[6] != "") {
      if (grid[2] == grid[4] && grid[4] == grid[6]) {
        console.log("win");
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
  const displayName = "@" + name;
  const { makeMove } = gameController;
  return { displayName, makeMove };
}

const bill = createPlayer("bill");
const stan = createPlayer("stan");
