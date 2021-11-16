export { Ship };

function Ship(type, length) {
  const getLength = () => length;
  let shipStatus = { health: length, type };
  let hitPositions = [];

  function getHitPositions(board) {
    const plots = board
      .reduce((a, b) => a.concat(b))
      .filter(
        (coordinate) => coordinate.isHit === true && coordinate.ship === this
      );
    return plots;
  }

  const hit = (position) => {
    hitPositions.push(position);
    shipStatus.health -= 1;
  };

  function isSunk() {
    // let numOfHitPositions = this.getHitPositions(board).length;
    if (shipStatus.health === 0 && hitPositions.length === getLength()) {
      return true;
    } else {
      return false;
    }
  }

  function cells(board, direction, corner) {
    let cellList = [];
    if (direction === 'h') {
      for (let i = 0; i < getLength(); i++) {
        cellList[i] = board[corner[0] + i][corner[1]];
      }
    }
    if (direction === 'v') {
      for (let i = 0; i < getLength(); i++) {
        cellList[i] = board[corner[0]][corner[1] + i];
      }
    }
    return cellList;
  }

  function canFit(board, direction, corner) {
    let cellList = cells(board, direction, corner);
    for (let i = 0; i < getLength(); i++) {
      if (cellList[i].ship) return false;
    }
    return true;
  }

  function insert(board, direction, corner) {
    let cellList = cells(board, direction, corner);
    for (let i = 0; i < getLength(); i++) {
      cellList[i].ship = this;
    }
  }

  return {
    getHitPositions,
    hit,
    isSunk,
    shipStatus,
    getLength,
    canFit,
    insert,
  };
}
