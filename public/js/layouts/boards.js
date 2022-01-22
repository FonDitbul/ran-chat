const createBoardButton = document.getElementById('create-board');

const createBoard = async () => {
  const access_token = localStorage.getItem('access_token');
  if (!access_token) return alert('로그인 후 이용해 주세요.');
  return window.location.replace('/board/create');
};
createBoardButton.addEventListener('click', createBoard);
