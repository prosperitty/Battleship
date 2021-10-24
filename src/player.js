import { Gameboard } from './gameboard';
export { Player };

function Player(name) {
  let turn = false;
  const gameboard = Gameboard();

  const toggleTurn = () => !turn ? turn = true : turn = false;
  const getName = () => name;

  const attack = (enemyBoard) => {
    if (turn) {
      let randomCoordinate = [randomNum(), randomNum()];
      enemyBoard.receiveAttack(...randomCoordinate);
      this.toggleTurn();
    }
  };

  function randomNum() {
    return Math.round(Math.random() * (0 - 10) + 10);
  }

  return { gameboard, attack, toggleTurn, getName };
}