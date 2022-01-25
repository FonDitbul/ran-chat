const ReplyComment = async (comment) => {
  const replyData = comment.parentElement.getElementsByTagName('span');
  const groupID = replyData[0].innerText;
  const replyID = replyData[1].innerText;
  const replyUserName = replyData[2].innerText;
  const commentTextarea =
    comment.parentElement.getElementsByTagName('textarea')[0];

  if (commentTextarea.style.display === 'none') {
    return (commentTextarea.style.display = 'flex');
  }

  const uid = localStorage.getItem('uid');
  const content = commentTextarea.value;
  const boardID = location.pathname.split('/')[2];
  if (!uid) return alert('로그인 후 이용해주세요');

  await axios.post('/board/comment', {
    uid: uid,
    boardID: boardID,
    groupID: groupID,
    replyID: replyID,
    replyUserName: replyUserName,
    content: content,
  });
  return window.location.replace('/board/' + boardID);
};
