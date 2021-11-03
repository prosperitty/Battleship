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

  return { getHitPositions, hit, isSunk, shipStatus, getLength };
}