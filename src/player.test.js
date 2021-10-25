import { Player } from './player';

test('toggle players turn', () => {
  const player1 = Player('player1');
  expect(player1.toggleTurn()).toBeTruthy();
  expect(player1.toggleTurn()).toBeFalsy();
});
