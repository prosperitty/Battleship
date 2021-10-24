export { Gameboard };
import { Ship } from './ship';

function Gameboard() {
  const carrier = Ship('carrier', 5);
  const battleship = Ship('battleship', 4);
  const cruiser = Ship('cruiser', 3);
  const destroyer1 = Ship('destroyer1', 2);
  const destroyer2 = Ship('destroyer2', 2);
  const submarine1 = Ship('submarine1', 1);
  const submarine2 = Ship('submarine2', 1);
  let board = [[], [], [], [], [], [], [], [], [], []];

  (function initializeCoordinates() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board[i][j] = {
          coordinate: [i,j],
          ship: null,
          isHit: false,
          isMiss: false,
        };
      }
    }
  })();

  const placeShips = () => {
    for (let i = 0; i < carrier.getLength(); i++) {
      board[0][i].ship = carrier;
    }
    for (let i = 0; i < battleship.getLength(); i++) {
      board[9][i].ship = battleship;
    }
    for (let i = 0; i < cruiser.getLength(); i++) {
      board[2][i].ship = cruiser;
    }
    board[4][0].ship = destroyer1;
    board[4][1].ship = destroyer1;
    board[4][4].ship = destroyer2;
    board[4][5].ship = destroyer2;
    board[6][7].ship = submarine1;
    board[2][8].ship = submarine2;
  };

  const receiveAttack = (row, column) => {
    let plot = board[row][column];
    if (plot.ship !== null && plot.isHit !== true && plot.isMiss !== true) {
      return plot.ship.hit(plot);
    } else if (
      plot.ship === null &&
      plot.isHit === false &&
      plot.isMiss === false
    ) {
      return (plot.isMiss = true);
    }
  };

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

  return { board, placeShips, receiveAttack, isGameOver };
}

// function findCoordinate(board, num) {
//   const reducedBoard = board.reduce((a, b) => a.concat(b));
//   return reducedBoard[num];
// }
