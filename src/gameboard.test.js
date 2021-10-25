import { Gameboard } from './gameboard';

test('coordinate assignment', () => {
  const game = Gameboard();
  expect(game.board[0][0]).toEqual({
    coordinate: [0, 0],
    ship: null,
    isHit: false,
    isMiss: false,
  });
});

test('place ships on board at specific coordinates', () => {
  const game = Gameboard();
  game.placeShips(game.board);
  expect(game.board[0][0].ship.shipStatus).toEqual({
    health: 5,
    type: 'carrier',
  });
});

test('determine if ship was missed or hit and send hit function', () => {
  const game = Gameboard();
  game.placeShips();
  game.receiveAttack(...[0, 1]);
  expect(game.board[0][1].isMiss).toBeFalsy();
  expect(game.board[0][1].isHit).toBeTruthy();
  game.receiveAttack(...[0, 7]);
  expect(game.board[0][7].isMiss).toBeTruthy();
  expect(game.board[0][7].isHit).toBeFalsy();
});

test('report whether all ships have been sunk or not', () => {
  const game = Gameboard();
  game.placeShips();
  expect(game.isGameOver()).toBeFalsy();
  for (let i = 0; i < 5; i++) {
    game.receiveAttack(...[0, i]);
  }
  for (let i = 0; i < 4; i++) {
    game.receiveAttack(...[9, i]);
  }
  for (let i = 0; i < 3; i++) {
    game.receiveAttack(...[2, i]);
  }
  game.receiveAttack(...[4, 0]);
  game.receiveAttack(...[4, 1]);
  game.receiveAttack(...[4, 4]);
  game.receiveAttack(...[4, 5]);
  game.receiveAttack(...[6, 7]);
  game.receiveAttack(...[2, 8]);
  expect(game.isGameOver()).toBeTruthy();
});
