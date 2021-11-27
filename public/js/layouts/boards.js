const createBoardButton = document.getElementById('create-board-button');
const createBoardModal = document.getElementById('create-board-modal');

createBoardButton.onclick = function () {
  createBoardModal.style.display = 'block';
};
window.onclick = function (event) {
  if (event.target == createBoardModal) {
    createBoardModal.style.display = 'none';
  }
};
