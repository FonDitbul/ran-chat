(() => {
  // 내용 렌더링
  const contentRender = (content) => {
    const spanTag = document.createElement('span');
    spanTag.innerHTML = content.innerText;
    content.innerText = '';
    return spanTag;
  };
  const getContent = document.getElementById('content');
  getContent.appendChild(contentRender(getContent));

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

  //햄버거 버튼 작동
  const burgerButton = document.getElementById('burger-button');
  const modifyBoardUl = document.getElementById('modify-board');
  const burgerButtonClick = () => {
    if (modifyBoardUl.style.display === 'none') {
      return (modifyBoardUl.style.display = '');
    }
    return (modifyBoardUl.style.display = 'none');
  };
  burgerButton.addEventListener('click', burgerButtonClick);

  // 수정, 삭제 버튼
  const updateButton = document.getElementById('update-button');
  const deleteButton = document.getElementById('delete-button');
  const modifyButtonClick = async (event) => {
    const boardID = window.location.pathname.split('/')[2];
    const userName = localStorage.getItem('userName');
    const uid = localStorage.getItem('uid');
    if (!userName || !uid) return alert('로그인 후 이용해주세요!');

    if (event.target.id === 'update-button') {
      return window.location.replace('/board/update?boardID=' + boardID);
    }
    if (event.target.id === 'delete-button') {
      try {
        console.log('?');
        const response = await axios.delete(
          '/board/?id=' + boardID + '&uid=' + uid,
        );
        if (response.statusCode) return alert(response.error.message);
        return window.location.replace('/board');
      } catch (error) {
        alert('유효 하지 않은 유저입니다!');
        return window.location.reload();
      }
    }
    return null;
  };
  updateButton.addEventListener('click', modifyButtonClick);
  deleteButton.addEventListener('click', modifyButtonClick);
})();
