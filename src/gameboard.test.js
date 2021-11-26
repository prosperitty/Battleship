import { Gameboard } from './gameboard';

test('place ships on board at random positions', () => {
  const game = Gameboard();
  let expected = {ship: null};
  game.placeShips();
  game.board.forEach((row) => {
    for (let plot of row) {
      expect(plot.ship).toEqual(expect.not.objectContaining(expected));
    }
  });
});

describe('players gameboard', () => {
  const game = Gameboard();
  let expected = [
    {
      coordinate: [expect.any(Number), expect.any(Number)],
      ship: null,
      isHit: false,
      isMiss: false,
    },
  ];
  game.placeShips();
  game.board.forEach((row) => {
    it('has empty plots', () => {
      expect(row).toEqual(expect.arrayContaining(expected));
    });
    it('has ships in plots', () => {
      expect(row).toContainEqual(expect.not.arrayContaining(expected));
    });
  });
});

test('determine if ship was missed or hit and send hit function', () => {
  const game = Gameboard();
  let expected = {
    coordinate: [expect.any(Number), expect.any(Number)],
    ship: null,
    isHit: false,
    isMiss: false,
  };
  game.placeShips();
  game.receiveAttack(...[0, 7]);
  if (game.board[0][7].ship === expected.ship) {
    expect(game.board[0][7].isMiss).toBeTruthy();
    expect(game.board[0][7].isHit).toBeFalsy();
  } else if (game.board[0][7].ship !== null) {
    expect(game.board[0][7].isMiss).toBeFalsy();
    expect(game.board[0][7].isHit).toBeTruthy();
  }
});

describe('whether all ships are sunk or not', () => {
  const game = Gameboard();
  let expected = {
    coordinate: [expect.any(Number), expect.any(Number)],
    ship: null,
    isHit: false,
    isMiss: false,
  };
  game.placeShips();
  it('reports all ships are not sunk', () => {
    expect(game.isGameOver()).toBeFalsy();
  });
  it('reports all ships are sunk', () => {
    game.board.forEach((row) => {
      for (let plot of row) {
        if (plot.ship !== expected.ship) {
          game.receiveAttack(...plot.coordinate);
        }
      }
    });
    expect(game.isGameOver()).toBeTruthy();
  });
});
