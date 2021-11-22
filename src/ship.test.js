import { Gameboard } from './gameboard';
import { Ship } from './ship';

test('reduce the health of a ship by 1', () => {
  const game = Gameboard();
  game.placeShips();
  const destroyer1 = Ship('destroyer1', 2);
  game.board[0][0].ship = destroyer1;
  game.board[0][1].ship = destroyer1;
  destroyer1.hit(game.board[0][0]);
  expect(destroyer1.shipStatus.health).toEqual(1);
});

test('check if all positions hit and ship is sunk', () => {
  const game = Gameboard();
  game.placeShips();
  const destroyer1 = Ship('destroyer1', 2);
  game.board[0][0].ship = destroyer1;
  game.board[0][1].ship = destroyer1;
  destroyer1.hit(game.board[0][0]);
  destroyer1.hit(game.board[0][1]);
  expect(destroyer1.isSunk(game.board)).toBeTruthy();
});

test('getting ships length', () => {
  const destroyer1 = Ship('destroyer1', 2);
  expect(destroyer1.getLength()).toEqual(2);
});

describe('if ship can fit or not', () => {
  const game = Gameboard();
  const destroyer1 = Ship('destroyer1', 2);
  const destroyer2 = Ship('destroyer2', 2);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      game.board[i][j] = {
        coordinate: [i, j],
        ship: null,
        isHit: false,
        isMiss: false,
      };
    }
  }
    it('can fit on board', () => {
      expect(destroyer1.canFit(game.board,'h',[0,0])).toBeTruthy();
    });
    it('can not fit on board', () => {
      game.board[0][0].ship = destroyer1;
      expect(destroyer2.canFit(game.board,'h',[0,0])).toBeFalsy();
    });
});

test('insert ship on to board', () => {
  const game = Gameboard();
  const destroyer1 = Ship('destroyer1', 2);
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      game.board[i][j] = {
        coordinate: [i, j],
        ship: null,
        isHit: false,
        isMiss: false,
      };
    }
  }
  destroyer1.insert(game.board,'h',[0,0]);
  expect(game.board[0][0].ship).toEqual(destroyer1);
  expect(game.board[0][1].ship).toEqual(destroyer1);
});