const grid = document.querySelector(".grid");
const gridCell = document.querySelectorAll(".grid-cell");
const x = document.querySelector(".x");
const circle = document.querySelector(".circle");
const cells = document.querySelectorAll("[data-cell]");
const startButton = document.querySelector(".start-button");
const goodLuck = document.querySelector(".good-luck");
const winnerMessage = document.querySelector(".winning-container");
const winMsg = document.querySelector(".winner-message");
const restart = document.querySelector(".restart-button");

// Winning Combinations //
let winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let circleTurn = false;
let startGame = false;

startButton.addEventListener("click", () => {
  startGame = true;
  startButton.style.scale = "0";
  startButton.style.opacity = "0";

  if (startGame) {
    gridCell.forEach((item) => {
      item.addEventListener("click", checkTurn);
    });

    restart.addEventListener("click", restartGame);
  }
});

// ---- Functions ---- //

function checkTurn(e) {
  // Making sure that the turn switches --->
  if (
    e.target.classList.contains("x") ||
    e.target.classList.contains("circle")
  ) {
    return;
  }

  if (circleTurn) {
    e.target.classList.add("circle");
    circleTurn = false;
  } else if (!circleTurn) {
    e.target.classList.add("x");
    circleTurn = true;
  }

  // Check For the Winner ---->
  checkWinner(e);

  // Check For a Draw ----->
  checkDraw();

  if (
    checkDraw() &&
    !winningCombo.some((some) => {
      return some.every((index) => {
        return e.target
          .closest(".grid")
          .children[index].classList.contains("x");
      });
    }) &&
    !winningCombo.some((some) => {
      return some.every((index) => {
        return e.target
          .closest(".grid")
          .children[index].classList.contains("circle");
      });
    })
  ) {
    console.log("draw");
    winMsg.innerHTML = "DRAW!";
    winMsg.appendChild(restart);
    winnerMessage.classList.add("done");
  }
}

function checkWinner(e) {
  if (
    winningCombo.some((some) => {
      return some.every((index) => {
        return e.target
          .closest(".grid")
          .children[index].classList.contains("circle");
      });
    })
  ) {
    console.log("circle wins");
    gridCell.forEach((cell) => {
      cell.classList.add("game-over");
      winnerMessage.classList.add("done");
      winMsg.innerHTML = "O WINS!";
      winMsg.appendChild(restart);
      winnerMessage.classList.add("done");
    });
  } else if (
    winningCombo.some((some) => {
      return some.every((index) => {
        return e.target
          .closest(".grid")
          .children[index].classList.contains("x");
      });
    })
  ) {
    console.log("x wins");
    gridCell.forEach((cell) => {
      cell.classList.add("game-over");
      winMsg.innerHTML = "X WINS!";
      winMsg.appendChild(restart);
      winnerMessage.classList.add("done");
    });
  }
}

function checkDraw() {
  return [...gridCell].every((cell) => {
    return cell.classList.contains("x") || cell.classList.contains("circle");
  });
}

function restartGame() {
  gridCell.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.classList.remove("game-over");
  });
  winnerMessage.classList.remove("done");
  startButton.style.scale = "1";
  startButton.style.opacity = "1";
  startGame = false;
}

function restartGame() {
  gridCell.forEach((cell) => {
    cell.classList.remove("x");
    cell.classList.remove("circle");
    cell.classList.remove("game-over");
  });
  winnerMessage.classList.remove("done");
}
