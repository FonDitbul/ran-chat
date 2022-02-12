(() => {
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
    const uid = localStorage.getItem('uid');
    const boardPath = window.location.pathname.split('/')[2]; // create, update
    if (!title) return alert('제목을 입력해 주세요!');
    if (!content) return alert('내용을 입력해 주세요!');
    if (!uid) return alert('로그인 후 이용해 주세요!');

    if (boardPath === 'update') {
      //게시판 업데이트
      const boardID = new URL(location).searchParams.get('boardID');
      try {
        const response = await axios.patch(
          '/board?id=' + boardID + '&uid=' + uid,
          {
            id: boardID,
            title: title,
            category: '게시판',
            content: content,
          },
        );
        return window.location.replace('/board/' + boardID);
      } catch (e) {
        alert('유효하지 않은 방법입니다.');
        return window.location.replace('/board');
      }
    }
    if (boardPath === 'create') {
      try {
        const response = await axios.post('/board', {
          // 게시판 생성
          title: title,
          category: '게시판',
          uid: uid,
          content: content,
        });
        return window.location.replace('/board/' + response.data.id);
      } catch (e) {
        alert('유효하지 않은 방법입니다.');
        return window.location.replace('/board');
      }
    }
  };

  const createBoardForm = document.getElementById('create-board-form');

  createBoardForm.addEventListener('submit', createBoard);
})();
