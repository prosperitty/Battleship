import { Gameboard, Ship } from './index';

test('coordinate assignment', () => {
  const game = Gameboard();
  game.initializeCoordinates();
  expect(game.board[0][0]).toEqual({
    coordinate: 'A0',
    ship: null,
    isHit: false,
    isMiss: false,
  });
});

test("find coordinate of ship's hit spot", () => {
  const battleship = Ship(2);
  let practiceBoard = [
    [{ isHit: true }],
    [{ isHit: false }],
    [{ isHit: true }],
    [{ isHit: false }],
  ];
  expect(battleship.positionHit(practiceBoard)).toEqual([
    { isHit: true },
    { isHit: true },
  ]);
});

test('take a number and mark plot as hit', () => {
  const battleship = Ship(2);
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
  console.log(carrier.shipStatus);
  console.log(practiceBoard[0][1].ship);
  expect(carrier.isSunk(practiceBoard)).toBeTruthy();
});

test('place ships on board at specific coordinates', () => {
  const game = Gameboard();
  game.initializeCoordinates();
  game.placeShips(game.board);
  expect(game.board[0][4].ship.shipStatus).toEqual({ health: 5, type: 'carrier' });
});

test('determine if ship was missed or hit and send hit function', () => {
  const game = Gameboard();
  game.initializeCoordinates();
  game.receiveAttack(1);
  console.log(game.board[0][1]);
  expect(game.board[0][1].isMiss).toBeTruthy();
});