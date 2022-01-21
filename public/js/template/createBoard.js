$('#summernote').summernote({
  placeholder: 'Hello Bootstrap 4',
  tabsize: 2,
  height: 600,
  toolbar: [
    ['style', ['style']],
    ['font', ['bold', 'underline', 'clear']],
    ['color', ['color']],
    ['para', ['ul', 'ol', 'paragraph']],
    ['table', ['table']],
    ['insert', ['link', 'picture', 'video']],
    ['view', ['fullscreen', 'codeview', 'help']],
  ],
});

const createBoard = async (event) => {
  event.preventDefault();
  const title = event.target.elements[0].value;
  const content = event.target.elements[1].value;
  const userName = sessionStorage.getItem('userName');
  const uid = sessionStorage.getItem('uid');
  await axios.post('/board', {
    title: title,
    category: '게시판',
    uid: uid,
    content: content,
  });
  return window.location.replace('/board');
};

const createBoardForm = document.getElementById('create-board-form');

createBoardForm.addEventListener('submit', createBoard);
