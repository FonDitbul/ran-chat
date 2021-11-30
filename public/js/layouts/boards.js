const createBoardButton = document.getElementById('create-board-button');
const createBoardModal = document.getElementById('create-board-modal');
const createBoardForm = document.getElementById('create-board-form');

createBoardButton.onclick = function () {
  createBoardModal.style.display = 'block';
};
window.onclick = function (event) {
  if (event.target == createBoardModal) {
    createBoardModal.style.display = 'none';
  }
};

const createBoard = async (event) => {
  event.preventDefault();
  const title = event.target.elements[0].value;
  const userName = sessionStorage.getItem('userName');
  const response = await axios.get('/users/' + userName);
  const uid = response.data.id;
  await axios.post('/board', {
    title: title,
    category: 1,
    uid: uid,
    content: '테스트 게시판입니다 123 123',
  });
  return location.reload();
};
createBoardForm.addEventListener('submit', createBoard);
