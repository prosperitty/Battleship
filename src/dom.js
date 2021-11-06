export { Controller };

function Controller() {
  function createUIGameboards() {
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

  function displayUIHeader() {
    const resetBtn = document.querySelector('.button-reset');
    const gameboardsContainer = document.querySelector('.gameboards-container');
    resetBtn.style.display = 'inline-block';
    gameboardsContainer.style.opacity = 1;
  }

  function showHitMarker(element) {
    element.style.background = 'lime';
  }

  function showMissMarker(element) {
    element.style.background = 'red';
  }
  
  return { createUIGameboards, displayUIHeader, showHitMarker, showMissMarker };
}