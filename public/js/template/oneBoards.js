(() => {
  //댓글 시스템
  const createComment = async (event) => {
    event.preventDefault();
    const userName = sessionStorage.getItem('userName');
    const uid = sessionStorage.getItem('uid');
    if (!userName || !uid) return alert('로그인 후 이용해주세요!');
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

  // 좋아요 싫어요 Element
  const likeDiv = document.getElementById('like');

  // 좋아요 GET
  const getLike = async (boardID) => {
    const response = await axios.get('/board/like/' + boardID);
    const boardLike = response.data;
    return boardLike.userLikes;
  };
  //좋아요 서버에 전송
  const addLike = async (boardID, uid) => {
    return await axios.post(`/board/like?id=${boardID}&uid=${uid}`);
  };
  const deleteLike = async (boardID, uid) => {
    return await axios.patch(`/board/like?id=${boardID}&uid=${uid}`);
  };
  //좋아요 눌렀는지 확인
  const validateLike = async (boardID, uid, Likes) => {
    const sessionUid = sessionStorage.getItem('uid');
    for (let Like of Likes) {
      if (Like.id === +sessionUid) return false;
    }
    return true;
  };
  //좋아요 클릭 이벤트
  const clickLike = async (event) => {
    const boardID = location.pathname.split('/')[2];
    const userName = sessionStorage.getItem('userName');
    if (!userName) return alert('로그인 후 이용해주세요!');
    const userResponse = await axios.get('/users/' + userName);
    const uid = userResponse.data.id;
    const Like = await getLike(boardID);
    if (await validateLike(boardID, uid, Like)) {
      likeDiv.innerText = '(좋아요) ' + (Like.length + 1);
      return await addLike(boardID, uid);
    }
    likeDiv.innerText = '(좋아요) ' + (Like.length - 1);
    return await deleteLike(boardID, uid);
  };

  likeDiv.addEventListener('click', clickLike);

  //reply 답글 만들기
  // const replyCreate = async () => {
  //   console.log('답글 만들기');
  // };
  // const replyComment = document.getElementById('reply-comment');
  // replyComment.addEventListener('click', replyCreate);
})();
