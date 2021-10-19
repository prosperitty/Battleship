export { Ship };

function Ship(type, length) {
  let shipStatus = { health: length, type: type };

  function getHitPositions(board) {
    const plots = board
      .reduce((a, b) => a.concat(b))
      .filter(
        (coordinate) => coordinate.isHit === true && coordinate.ship === this
      );
    return plots;
  }

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

  return { getHitPositions, hit, isSunk, shipStatus };
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
