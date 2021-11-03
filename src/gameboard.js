import { Ship } from './ship';
export { Gameboard };

function Gameboard(uiBoard) {
  const carrier = Ship('carrier', 5);
  const battleship = Ship('battleship', 4);
  const cruiser = Ship('cruiser', 3);
  const destroyer1 = Ship('destroyer1', 2);
  const destroyer2 = Ship('destroyer2', 2);
  const submarine1 = Ship('submarine1', 1);
  const submarine2 = Ship('submarine2', 1);
  let board = [[], [], [], [], [], [], [], [], [], []];

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      board[i][j] = {
        coordinate: [i, j],
        ship: null,
        isHit: false,
        isMiss: false,
      };
    }
  }

  function placeShips() {
    for (let i = 0; i < carrier.getLength(); i++) {
      board[0][i].ship = carrier;
      displayShips(board, uiBoard, board[0][i]);
    }
    for (let i = 0; i < battleship.getLength(); i++) {
      board[9][i].ship = battleship;
      displayShips(board, uiBoard, board[9][i]);
    }
    for (let i = 0; i < cruiser.getLength(); i++) {
      board[2][i].ship = cruiser;
      displayShips(board, uiBoard, board[2][i]);
    }
    board[4][0].ship = destroyer1;
    board[4][1].ship = destroyer1;
    board[4][4].ship = destroyer2;
    board[4][5].ship = destroyer2;
    board[6][7].ship = submarine1;
    board[2][8].ship = submarine2;
    displayShips(board, uiBoard, board[4][0]);
    displayShips(board, uiBoard, board[4][1]);
    displayShips(board, uiBoard, board[4][4]);
    displayShips(board, uiBoard, board[4][5]);
    displayShips(board, uiBoard, board[6][7]);
    displayShips(board, uiBoard, board[2][8]);
  }

  function receiveAttack(row, column) {
    let plot = this.board[row][column];
    if (plot.ship !== null && plot.isHit === false && plot.isMiss === false) {
      plot.ship.hit();
      plot.isHit = true;
      console.log(plot);
      return true;
    } else if (
      plot.ship === null &&
      plot.isHit === false &&
      plot.isMiss === false
    ) {
      plot.isMiss = true;
      console.log(plot);
      return true;
    } else if (plot.isHit === true || plot.isMiss === true) {
      console.log('plot has already been hit');
      return false;
    }
  }

  const isGameOver = () => {
    if (
      carrier.isSunk(board) &&
      battleship.isSunk(board) &&
      cruiser.isSunk(board) &&
      destroyer1.isSunk(board) &&
      destroyer2.isSunk(board) &&
      submarine1.isSunk(board) &&
      submarine2.isSunk(board)
    ) {
      return true;
    } else {
      return false;
    }
  };

  return { board, placeShips ,receiveAttack, isGameOver };
}

function displayShips(board, uiBoard, location) {
  const reducedBoard = board.flat();
  let uiIndex = reducedBoard.indexOf(location);
  uiBoard[uiIndex].style.background = 'black';
}

// function findCoordinate(board, num) {
//   const reducedBoard = board.reduce((a, b) => a.concat(b));
//   return reducedBoard[num];
// }
