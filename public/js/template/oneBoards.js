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
  const likeDiv = document.getElementById('like');

  // 좋아요 GET
  const getLike = async (boardID) => {
    const response = await axios.get('/board/like/' + boardID);
    const boardLike = response.data;
    return boardLike;
  };
  //좋아요 POST
  const updateLike = async (boardID, uid) => {
    await axios.patch(`/board/like?id=${boardID}&uid=${uid}`);
  };
  //좋아요 눌렀는지 확인
  const validateLike = (boardID, uid) => {
    const sessionUid = sessionStorage.getItem('uid');
    if (!sessionUid) return alert('로그인 후 이용해주세요!');
    return sessionUid === uid;
  };
  //좋아요 클릭 이벤트
  const clickLike = async (event) => {
    const boardID = location.pathname.split('/')[2];
    const userName = sessionStorage.getItem('userName');
    const userResponse = await axios.get('/users/' + userName);
    const uid = userResponse.data.id;
    let Like = await getLike(boardID);
    likeDiv.innerText = Like + 1;
    console.log(await getLike(boardID));
    if (validateLike(boardID, uid)) {
    }
    await updateLike(boardID, uid);
  };

  likeDiv.addEventListener('click', clickLike);

  //reply 답글 만들기
  // const replyCreate = async () => {
  //   console.log('답글 만들기');
  // };
  // const replyComment = document.getElementById('reply-comment');
  // replyComment.addEventListener('click', replyCreate);
})();
