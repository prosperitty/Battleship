import './style.scss';
export { Gameboard, Ship };

function Gameboard() {
  let board = [[], [], [], [], [], [], [], [], [], []];

  function initializeCoordinates() {
    const letterCoordinate = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        board[i][j] = {
          coordinate: `${letterCoordinate[i]}${j}`,
          ship: null,
          isHit: false,
        };
      }
    }
  }

  const placeShips = (board) => {
    const carrier = Ship('carrier', 5);
    const battleship = Ship('battleship',4);
    const cruiser = Ship('cruiser',3);
    const destroyer1 = Ship('destroyer1',2);
    const destroyer2 = Ship('destroyer2',2);
    const submarine1 = Ship('submarine1',1);
    const submarine2 = Ship('submarine2',1);

    for (let i = 0; i < carrier.shipStatus.health; i++) {
      board[0][i].ship = carrier.shipStatus;
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

  return { board, initializeCoordinates, placeShips };
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
  };

  const isSunk = (board) => {
    if (shipStatus.health === 0 && isAllPositionsHit(board,type)) {
      return true;
    } else {
      return false;
    }
  };

  return { positionHit, hit, isSunk, shipStatus };
}

function isAllPositionsHit(board,type) {
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