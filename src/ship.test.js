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

test('take a number and mark plot as hit', () => {
  const game = Gameboard();
  const destroyer1 = Ship('destroyer1', 2);
  game.board[0][0].ship = destroyer1;
  game.board[0][1].ship = destroyer1;
  destroyer1.hit(game.board[0][0]);
  expect(game.board[0][0].isHit).toBeTruthy();
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
