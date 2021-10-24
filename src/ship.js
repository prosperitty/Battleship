export { Ship };

function Ship(type, length) {
  const getLength = () => length;
  let shipStatus = { health: length, type };

  function getHitPositions(board) {
    const plots = board
      .reduce((a, b) => a.concat(b))
      .filter(
        (coordinate) => coordinate.isHit === true && coordinate.ship === this
      );
    return plots;
  }

  const hit = (plot) => {
    plot.isHit = true;
    shipStatus.health -= 1;
  };

  function isSunk(board) {
    let numOfHitPositions = this.getHitPositions(board).length;
    if (shipStatus.health === 0 && numOfHitPositions === getLength()) {
      return true;
    } else {
      return false;
    }
  }

  return { getHitPositions, hit, isSunk, shipStatus, getLength };
}