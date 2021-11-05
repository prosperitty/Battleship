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
      startGame();
    });
  }

  return { initialize };
}

function startGame() {
  const gameboards = document.querySelectorAll('.gameboard-grid');
  const player = Player('player');
  const computer = Player('computer');
  const playerUIBoard = [...gameboards[0].children];
  const computerUIBoard = [...gameboards[1].children];
  const playerGameboard = Gameboard(gameboards[0].children);
  const computerGameboard = Gameboard(gameboards[1].children);
  playerGameboard.placeShips();
  computerGameboard.placeShips();
  player.toggleTurn();

  computerUIBoard.forEach((plot) => {
    plot.addEventListener('click', () => {
      let rowIndex = parseInt(plot.dataset.x);
      let columnIndex = parseInt(plot.dataset.y);
      if (player.turn && !isGameOver(playerGameboard, computerGameboard)) {
        if (
          computerGameboard.board[rowIndex][columnIndex].isMiss === false &&
          computerGameboard.board[rowIndex][columnIndex].isHit === false
        ) {
          player.attack(computerGameboard, rowIndex, columnIndex);
          computer.toggleTurn();
          let coordinates = computer.attack(playerGameboard);
          console.log(coordinates);
          playerUIBoard[coordinates].style.background = 'green';
          player.toggleTurn();
          plot.style.background = 'green';
        } else {
          console.log('try again!');
        }
      } 
    });
  });
}

function createGameboards() {
  const gameboard = document.querySelectorAll('.gameboard-grid');
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const plot1 = document.createElement('div');
      const plot2 = document.createElement('div');
      plot1.classList.add('gameboard-grid-item');
      plot2.classList.add('gameboard-grid-item');
      plot1.dataset.x = i;
      plot1.dataset.y = j;
      plot2.dataset.x = i;
      plot2.dataset.y = j;
      gameboard[0].appendChild(plot1);
      gameboard[1].appendChild(plot2);
    }
  }
}

function displayContent() {
  const resetBtn = document.querySelector('.button-reset');
  const gameboardsContainer = document.querySelector('.gameboards-container');
  resetBtn.style.display = 'inline-block';
  gameboardsContainer.style.opacity = 1;
}

function isGameOver(playersBoard, computersBoard) {
  if (playersBoard.isGameOver()) {
    return true;
  } else if (computersBoard.isGameOver()) {
    return true;
  } else {
    return false;
  }
}

Game().initialize();
