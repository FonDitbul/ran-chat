(() => {
  //댓글 시스템
  const createComment = async (event) => {
    event.preventDefault();
    const userName = sessionStorage.getItem('userName');
    const response = await axios.get('/users/' + userName);
    const uid = response.data.id;
    const boardID = location.pathname.split('/')[2];
    const content = event.target.elements[0].value;
    await axios.post('/board/comment', {
      uid: uid,
      boardID: boardID,
      content: content,
    });
    return window.location.replace('/board/' + boardID);
  };
  const createCommentForm = document.getElementById('create-comment-form');
  createCommentForm.addEventListener('submit', createComment);

  // 좋아요 싫어요
})();
