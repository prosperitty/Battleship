import { Gameboard } from './gameboard';
import { Ship } from './ship';

test("find coordinate of ship's hit spot", () => {
  const game = Gameboard();
  game.initializeCoordinates();
  const destroyer1 = Ship('destroyer1', 2);
  game.board[4][4].ship = destroyer1;
  game.board[4][5].ship = destroyer1;
  game.board[0][0].isHit = true;
  game.board[4][4].isHit = true;
  game.board[4][5].isHit = true;
  expect(destroyer1.getHitPositions(game.board)).toEqual([
    { coordinate: 'E4', ship: destroyer1, isHit: true, isMiss: false},
    { coordinate: 'E5', ship: destroyer1, isHit: true, isMiss: false},
  ]);
});

test('take a number and mark plot as hit', () => {
  const battleship = Ship('destroyer1', 2);
  let practiceBoard = [
    [{ coordinate: 'A1', isHit: false }],
    [{ coordinate: 'B1', isHit: false }],
    [{ coordinate: 'C1', isHit: false }],
    [{ coordinate: 'D4', isHit: false }],
  ];
  battleship.hit(practiceBoard, 2);
  expect(practiceBoard[2][0].isHit).toBeTruthy();
});

test('check if all positions hit and ship is sunk', () => {
  const carrier = Ship('carrier', 5);
  let practiceBoard = [
    [
      { coordinate: 'A1', ship: carrier.shipStatus, isHit: true },
      { coordinate: 'A2', ship: carrier.shipStatus, isHit: true },
      { coordinate: 'A3', ship: carrier.shipStatus, isHit: true },
      { coordinate: 'A4', ship: carrier.shipStatus, isHit: true },
      { coordinate: 'A5', ship: carrier.shipStatus, isHit: true },
      { coordinate: 'A6', ship: null, isHit: false },
    ],
  ];
  practiceBoard[0][0].ship.health -= 5;
  expect(carrier.isSunk(practiceBoard)).toBeTruthy();
});