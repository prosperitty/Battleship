import { Gameboard } from './gameboard';
export { Player };

function Player(name) {
  let turn = false;
  
  function toggleTurn() {
    this.turn ? this.turn = false : this.turn = true;
  }

  function attack(enemyBoard, row, column) {
    if (this.turn && name === 'player') {
      if (enemyBoard.receiveAttack(row, column)) {
        console.log(row, column);
        this.toggleTurn();
      }
    } else if (this.turn && name === 'computer') {
      let randomCoordinate = [randomNum(), randomNum()];
      enemyBoard.receiveAttack(...randomCoordinate);
      this.toggleTurn();
      return findReducedIndex(enemyBoard, ...randomCoordinate);
    }
  }

  function findReducedIndex(enemyBoard, x, y) {
    let flatBoard = enemyBoard.board.flat();
    return flatBoard.indexOf(enemyBoard.board[x][y]);
  }

  function randomNum() {
    return Math.round(Math.random() * (0 - 10) + 10);
  }

  return { attack, turn, toggleTurn };
}
