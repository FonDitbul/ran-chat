(() => {
  // 내용 렌더링
  const contentRender = (content) => {
    content.innerHTML = content.innerText;
    return content;
  };
  const getContent = document.getElementById('content');
  contentRender(getContent);

  //댓글 시스템
  const createComment = async (event) => {
    event.preventDefault();
    const userName = localStorage.getItem('userName');
    const uid = localStorage.getItem('uid');
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
  const likeCount = document.getElementById('like-count');

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
    const localUid = localStorage.getItem('uid');
    for (let Like of Likes) {
      if (Like.id === +localUid) return false;
    }
    return true;
  };
  //좋아요 클릭 이벤트
  const clickLike = async (event) => {
    const boardID = location.pathname.split('/')[2];
    const userName = localStorage.getItem('userName');
    const uid = localStorage.getItem('uid');
    if (!userName || !uid) return alert('로그인 후 이용해주세요!');
    const Like = await getLike(boardID);
    if (await validateLike(boardID, uid, Like)) {
      likeCount.innerText = Like.length + 1;
      return await addLike(boardID, uid);
    }
    likeCount.innerText = Like.length - 1;
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
