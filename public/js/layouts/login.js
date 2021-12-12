/** 로그인 javascript **/
const loginId = document.getElementById('login-id');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

const submitLogin = async () => {
  const loginID = loginId.value;
  if (!loginID) {
    return alert('유저 아이디를 입력해 주세요!');
  }
  const response = await axios.get('/users/' + loginID);
  const uid = response.data.id;
  const userName = response.data.userName;
  if (!response.data) {
    return alert('존재하지 않는 아이디입니다!');
  }
  sessionStorage.setItem('uid', uid);
  sessionStorage.setItem('userName', userName);
  return window.location.replace('/');
};

loginButton.addEventListener('click', submitLogin);

/** 회원가입 modal javascript **/
const signupModal = document.getElementById('signup-modal');
const signupShowButton = document.getElementById('signup-show-button');
function signupModalActive() {
  signupModal.className = 'modal';
  signupModal.style.display = 'flex';
}
signupShowButton.addEventListener('click', signupModalActive);
window.onclick = function (event) {
  if (event.target == signupModal) {
    signupModal.style.display = 'none';
  }
};

const submitSignup = async (event) => {
  event.preventDefault();
  const userName = event.target.elements[0].value;
  const password = event.target.elements[1].value;
  const passwordConfirm = event.target.elements[2].value;
  if (!userName) {
    return alert('유저 아이디를 입력해 주세요!');
  }
  if (password !== passwordConfirm)
    return alert('비밀번호가 동일하지 않습니다!');
  const register = await axios.post('/users', {
    userName: userName,
    password: password,
  });
  const loginID = await axios.get('/users/' + userName);
  sessionStorage.setItem('uid', loginID.data.id);
  sessionStorage.setItem('userName', loginID.data.userName);
  return (window.location.href = '/');
};
const signUpform = document.getElementById('signup-form');
signUpform.addEventListener('submit', submitSignup);
