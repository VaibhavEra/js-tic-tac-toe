const gameBoard = (function () {
  const grid = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  const fetchGrid = () => grid;
  const updateGrid = (choice, pos1, pos2) => (grid[pos1][pos2] = choice);

  return { fetchGrid, updateGrid, grid };
})();

const gameController = (function () {
  //input player choice
  let symbolX = true;
  const choice = (position1, position2) => {
    if (symbolX) {
      gameBoard.updateGrid("X", position1, position2);
      symbolX = false;
    } else {
      gameBoard.updateGrid("O", position1, position2);
      symbolX = true;
    }
    checkWinCondition();
  };

  function checkWinCondition() {}

  return { choice };
})();

function createPlayer(name) {
  const displayName = "@" + name;
  const { choice } = gameController;
  return { displayName, choice };
}

const bill = createPlayer("bill");
const stan = createPlayer("stan");
