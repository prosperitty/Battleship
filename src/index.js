import './style.scss';
import { Gameboard } from './gameboard';
import { Player } from './player';
import { Controller } from './dom';

function Game() {
  const controller = Controller();

  function initialize() {
    const startBtn = document.querySelector('.button-start');
    startBtn.addEventListener('click', () => {
      startBtn.style.display = 'none';
      controller.displayUIHeader();
      controller.createUIGameboards();
      startGame();
    });
  }

  function startGame() {
    const resetBtn = document.querySelector('.button-reset');
    const gameboards = document.querySelectorAll('.gameboard-grid');
    const player = Player('player');
    const computer = Player('computer');
    const playerUIBoard = [...gameboards[0].children];
    const computerUIBoard = [...gameboards[1].children];
    const playerGameboard = Gameboard();
    const computerGameboard = Gameboard();
    let gameOver = false;
    playerGameboard.placeShips();
    playerGameboard.displayShip();
    computerGameboard.placeShips();
    player.toggleTurn();

    computerUIBoard.forEach((plot) => {
      plot.addEventListener('click', () => {
        let row = parseInt(plot.dataset.x);
        let col = parseInt(plot.dataset.y);
        if (player.turn && !gameOver) {
          if (
            computerGameboard.board[row][col].isMiss === false &&
            computerGameboard.board[row][col].isHit === false
          ) {
            player.attack(computerGameboard, row, col, plot);
            gameOver = isGameOver(playerGameboard, computerGameboard);
            computer.toggleTurn();
            if (computerGameboard.board[row][col].isHit) {
              controller.showHitMarker(plot);
            } else if (computerGameboard.board[row][col].isMiss) {
              controller.showMissMarker(plot);
            }
          }
        }
        if (computer.turn && !gameOver) {
          computerPlay(computer, playerGameboard, playerUIBoard);
          gameOver = isGameOver(playerGameboard, computerGameboard);
          player.toggleTurn();
        }
      });
    });

    resetBtn.addEventListener('click', () => {
      controller.resetUIBoard();
      playerGameboard.placeShips();
      playerGameboard.resetShips();
      playerGameboard.displayShip();
      computerGameboard.placeShips();
      computerGameboard.resetShips();
      player.turn = false;
      computer.turn = false;
      gameOver = false;
      player.toggleTurn();
    });
  }

  function computerPlay(computer, enemyBoard, enemyUIBoard) {
    let coordinates = computer.attack(enemyBoard);
    let row = coordinates[0];
    let col = coordinates[1];
    if (enemyBoard.board[row][col].isHit) {
      controller.showHitMarker(enemyUIBoard[parseInt(coordinates.join(''))]);
    } else if (enemyBoard.board[row][col].isMiss) {
      controller.showMissMarker(enemyUIBoard[parseInt(coordinates.join(''))]);
    }
  }

  function isGameOver(playersBoard, computersBoard) {
    if (playersBoard.isGameOver()) {
      console.log('computer wins!');
      return true;
    } else if (computersBoard.isGameOver()) {
      console.log('you win!');
      return true;
    } else {
      return false;
    }
  }

  return { initialize };
}

Game().initialize();
