// import './style.scss';
export { Gameboard, Ship };

function Gameboard() {
  let carrier = undefined;
  let battleship = undefined;
  let cruiser = undefined;
  let destroyer1 = undefined;
  let destroyer2 = undefined;
  let submarine1 = undefined;
  let submarine2 = undefined;
  let board = [[], [], [], [], [], [], [], [], [], []];

  function initializeCoordinates() {
    const letterCoordinate = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board[i][j] = {
          coordinate: `${letterCoordinate[i]}${j}`,
          ship: null,
          isHit: false,
          isMiss: false,
        };
      }
    }
  }

  const placeShips = () => {
    carrier = Ship('carrier', 5);
    battleship = Ship('battleship', 4);
    cruiser = Ship('cruiser', 3);
    destroyer1 = Ship('destroyer1', 2);
    destroyer2 = Ship('destroyer2', 2);
    submarine1 = Ship('submarine1', 1);
    submarine2 = Ship('submarine2', 1);

    for (let i = 0; i < carrier.shipStatus.health; i++) {
      board[0][i].ship = carrier;
    }
    for (let i = 0; i < battleship.shipStatus.health; i++) {
      board[9][i].ship = battleship.shipStatus;
    }
    for (let i = 0; i < cruiser.shipStatus.health; i++) {
      board[2][i].ship = cruiser.shipStatus;
    }
    for (let i = 0; i < destroyer1.shipStatus.health; i++) {
      board[4][i].ship = destroyer1.shipStatus;
    }
    board[4][4].ship = destroyer2.shipStatus;
    board[4][5].ship = destroyer2.shipStatus;
    board[6][7].ship = submarine1.shipStatus;
    board[2][8].ship = submarine2.shipStatus;
  };

  const receiveAttack = (num) => {
    let plot = findCoordinate(board, num);
    if (plot.ship !== null && plot.isHit !== true && plot.isMiss !== true) {
      return plot.ship.hit(board, num);
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
      carrier.shipStatus.health === 0 &&
      battleship.shipStatus.health === 0 &&
      cruiser.shipStatus.health === 0 &&
      destroyer1.shipStatus.health === 0 &&
      destroyer2.shipStatus.health === 0 &&
      submarine1.shipStatus.health === 0 &&
      submarine2.shipStatus.health === 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  return { board, initializeCoordinates, placeShips, receiveAttack, isGameOver };
}

function Ship(type, length) {
  let shipStatus = { health: length, type: type };

  const positionHit = (board) => {
    const indexes = board
      .reduce((a, b) => a.concat(b))
      .filter((coordinate) => coordinate.isHit === true);
    return indexes;
  };

  const hit = (board, num) => {
    let reducedPosition = findCoordinate(board, num);
    for (let row of board) {
      for (let plot of row) {
        if (plot.coordinate === reducedPosition.coordinate) {
          plot.isHit = true;
        }
      }
    }
    shipStatus.health -= 1;
  };

  const isSunk = (board) => {
    if (shipStatus.health === 0 && isAllPositionsHit(board, type)) {
      return true;
    } else {
      return false;
    }
  };

  return { positionHit, hit, isSunk, shipStatus };
}

function isAllPositionsHit(board, type) {
  for (let row of board) {
    for (let plot of row) {
      if (plot.ship.type === type && plot.isHit === true) {
        return true;
      }
    }
  }
}

function findCoordinate(board, num) {
  const reducedBoard = board.reduce((a, b) => a.concat(b));
  return reducedBoard[num];
}
