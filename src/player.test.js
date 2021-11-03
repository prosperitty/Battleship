import { Player } from './player';

test('toggle players turn', () => {
  const player1 = Player('player1');
  player1.toggleTurn();
  expect(player1.turn).toBeTruthy();
  player1.toggleTurn();
  expect(player1.turn).toBeFalsy();
});
