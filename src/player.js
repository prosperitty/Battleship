import { Gameboard } from './gameboard';
export { Player };

function Player(name) {
  let turn = false;

  function toggleTurn() {
    this.turn ? (this.turn = false) : (this.turn = true);
  }

  function attack(enemyBoard, row, column) {
    if (this.turn && name === 'player') {
      if (enemyBoard.receiveAttack(row, column)) {
        this.toggleTurn();
      }
    } else if (this.turn && name === 'computer') {
      let randomCoordinate = [randomNum(), randomNum()];
      if (enemyBoard.receiveAttack(...randomCoordinate)) {
        this.toggleTurn();
        return findReducedIndex(enemyBoard, ...randomCoordinate);
      } else {
        return this.attack(enemyBoard);
      }
    }
  }

  function findReducedIndex(enemyBoard, x, y) {
    let flatBoard = enemyBoard.board.flat();
    return flatBoard.indexOf(enemyBoard.board[x][y]);
  }

  function randomNum() {
    return Math.round(Math.random() * (0 - 9) + 9);
  }

  return { attack, turn, toggleTurn };
}
