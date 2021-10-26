import './style.scss';
import { Gameboard } from './gameboard';
import { Player } from './player';
import { Ship } from './ship';

function Game() {
  function initialize() {
    const startBtn = document.querySelector('.button-start');
    startBtn.addEventListener('click', () => {
      startBtn.style.display = 'none';
      displayContent();
      createGameboards();
      setUpPlayers();
    });
  }

  return { initialize };
}

function setUpPlayers() {
  const player = Player('player', Gameboard());
  const computer = Player('computer', Gameboard());
}

function createGameboards() {
  const gameboard = document.querySelectorAll('.gameboard-grid');
  for (let i = 0; i < 100; i++) {
    const plots1 = document.createElement('div');
    const plots2 = document.createElement('div');
    plots1.classList.add('gameboard-grid-item');
    plots2.classList.add('gameboard-grid-item');
    gameboard[0].appendChild(plots1);
    gameboard[1].appendChild(plots2);
  }
}

function displayContent() {
  const resetBtn = document.querySelector('.button-reset');
  const gameboardsContainer = document.querySelector('.gameboards-container');
  resetBtn.style.display = 'inline-block';
  gameboardsContainer.style.opacity = 1;
}

Game().initialize();
