import { Gameboard } from './gameboard';
import { Ship } from './ship';

test('find coordinate of ship\'s hit spot', () => {
  const game = Gameboard();
  const destroyer1 = Ship('destroyer1', 2);
  game.board[4][4].ship = destroyer1;
  game.board[4][5].ship = destroyer1;
  game.board[0][0].isHit = true;
  game.board[4][4].isHit = true;
  game.board[4][5].isHit = true;
  expect(destroyer1.getHitPositions(game.board)).toEqual([
    { coordinate: [4, 4], ship: destroyer1, isHit: true, isMiss: false },
    { coordinate: [4, 5], ship: destroyer1, isHit: true, isMiss: false },
  ]);
});

test('reduce the health of a ship by 1', () => {
  const game = Gameboard();
  const destroyer1 = Ship('destroyer1', 2);
  game.board[0][0].ship = destroyer1;
  game.board[0][1].ship = destroyer1;
  destroyer1.hit(game.board[0][0]);
  expect(destroyer1.shipStatus.health).toEqual(1);
});

test('check if all positions hit and ship is sunk', () => {
  const game = Gameboard();
  const destroyer1 = Ship('destroyer1', 2);
  game.board[0][0].ship = destroyer1;
  game.board[0][1].ship = destroyer1;
  destroyer1.hit(game.board[0][0]);
  destroyer1.hit(game.board[0][1]);
  expect(destroyer1.isSunk(game.board)).toBeTruthy();
});
