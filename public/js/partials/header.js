window.onload = function () {
  //로그인 여부 확인
  const loginHeaderButton = document.getElementById('login-header-button');
  const userName = localStorage.getItem('userName');
  const uid = localStorage.getItem('uid');
  if (userName) {
    loginHeaderButton.href = '/users/profile?uid=' + uid;
    loginHeaderButton.innerText = userName;
  }
};
