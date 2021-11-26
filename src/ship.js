export { Ship };

function Ship(type, length) {
  const getLength = () => length;
  let shipStatus = { health: length, type };
  let hitPositions = [];
  let shipCoordinates = [];

  function resetShip() {
    hitPositions = [];
    shipCoordinates = [];
    this.shipStatus.health = getLength();
  }

  const hit = (position) => {
    hitPositions.push(position);
    shipStatus.health -= 1;
  };

  function isSunk() {
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
        cellList[i] = board[corner[0]][corner[1] + i];
      }
    }
    if (direction === 'v') {
      for (let i = 0; i < getLength(); i++) {
        cellList[i] = board[corner[0] + i][corner[1]];
      }
    }
    return cellList;
  }

  function canFit(board, direction, corner) {
    let cellList = cells(board, direction, corner);
    for (let i = 0; i < getLength(); i++) {
      if (cellList[i].ship) {
        return false;
      }
    }
    return true;
  }

  function insert(board, direction, corner) {
    let cellList = cells(board, direction, corner);
    let coordinate = [];
    for (let i = 0; i < getLength(); i++) {
      coordinate.push(cellList[i].coordinate);
      cellList[i].ship = this;
    }
    this.shipCoordinates = [...coordinate];
  }

  return {
    hit,
    isSunk,
    shipStatus,
    shipCoordinates,
    getLength,
    canFit,
    insert,
    resetShip,
  };
}
