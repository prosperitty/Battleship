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
      createGameboard();
    });
  }

  return { initialize };
}

function createGameboard() {
  const gameboard = document.querySelectorAll('.gameboard-grid');
  for (let i = 0; i < 100; i++) {
    const plot = document.createElement('div');
    plot.classList.add('gameboard-grid-item');
    gameboard[0].appendChild(plot);
  }
  for (let i = 0; i < 100; i++) {
    const plot = document.createElement('div');
    plot.classList.add('gameboard-grid-item');
    gameboard[1].appendChild(plot);
  }
}

function displayContent() {
  const resetBtn = document.querySelector('.button-reset');
  const gameboardsContainer = document.querySelector('.gameboards-container');
  resetBtn.style.display = 'inline-block';
  gameboardsContainer.style.opacity = 1;
}

Game().initialize();
