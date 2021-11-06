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
      let randomCoordinates = [randomNum(), randomNum()];
      if (enemyBoard.receiveAttack(...randomCoordinates)) {
        this.toggleTurn();
        return randomCoordinates;
      } else {
        return this.attack(enemyBoard);
      }
    }
  }

  function randomNum() {
    return Math.round(Math.random() * (0 - 9) + 9);
  }

  return { attack, turn, toggleTurn };
}
