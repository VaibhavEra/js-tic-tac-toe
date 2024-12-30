const gameBoard = (function () {
  const grid = ["", "", "", "", "", "", "", "", ""];

  const fetchGrid = () => grid;
  const updateGrid = (choice, pos1) => (grid[pos1] = choice);

  return { fetchGrid, updateGrid, grid };
})();

const gameController = (function () {
  //input player choice
  let symbolX = true;
  const choice = (position1) => {
    if (symbolX) {
      gameBoard.updateGrid("X", position1);
      symbolX = false;
    } else {
      gameBoard.updateGrid("O", position1);
      symbolX = true;
    }
    let win = false;
    win = checkWinCondition();
    if (!win) {
      checkTieCondition();
    }
  };

  function checkWinCondition() {
    for (let i = 0; i < 9; i += 3) {
      if (
        gameBoard.fetchGrid()[i] != "" &&
        gameBoard.fetchGrid()[i + 1] != "" &&
        gameBoard.fetchGrid()[i + 2] != ""
      ) {
        if (
          gameBoard.fetchGrid()[i] == gameBoard.fetchGrid()[i + 1] &&
          gameBoard.fetchGrid()[i + 1] == gameBoard.fetchGrid()[i + 2]
        ) {
          console.log("win");
          return true;
        }
      }
    }

    for (let i = 0; i < 3; i++) {
      if (
        gameBoard.fetchGrid()[i] != "" &&
        gameBoard.fetchGrid()[i + 3] != "" &&
        gameBoard.fetchGrid()[i + 6] != ""
      ) {
        if (
          gameBoard.fetchGrid()[i] == gameBoard.fetchGrid()[i + 3] &&
          gameBoard.fetchGrid()[i + 3] == gameBoard.fetchGrid()[i + 6]
        ) {
          console.log("win");
          return true;
        }
      }
    }
    if (
      gameBoard.fetchGrid()[0] != "" &&
      gameBoard.fetchGrid()[4] != "" &&
      gameBoard.fetchGrid()[8] != ""
    ) {
      if (
        gameBoard.fetchGrid()[0] == gameBoard.fetchGrid()[4] &&
        gameBoard.fetchGrid()[4] == gameBoard.fetchGrid()[8]
      ) {
        console.log("win");
        return true;
      }
    } else if (
      gameBoard.fetchGrid()[2] != "" &&
      gameBoard.fetchGrid()[4] != "" &&
      gameBoard.fetchGrid()[6] != ""
    ) {
      if (
        gameBoard.fetchGrid()[2] == gameBoard.fetchGrid()[4] &&
        gameBoard.fetchGrid()[4] == gameBoard.fetchGrid()[6]
      ) {
        console.log("win");
        return true;
      }
    }
    return false;
  }

  function checkTieCondition() {
    let tie = true;
    for (let i = 0; i < 9; i++) {
      if (gameBoard.fetchGrid()[i] == "") {
        tie = false;
        break;
      }
    }
    if (tie) {
      console.log("Tie!");
    }
  }

  return { choice };
})();

function createPlayer(name) {
  const displayName = "@" + name;
  const { choice } = gameController;
  return { displayName, choice };
}

const bill = createPlayer("bill");
const stan = createPlayer("stan");
