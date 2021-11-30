/** 로그인 javascript **/
const loginId = document.getElementById('login-id');
const loginPassword = document.getElementById('login-password');
const loginButton = document.getElementById('login-button');

const submitLogin = async () => {
  const uid = loginId.value;
  if (!uid) {
    return alert('유저 아이디를 입력해 주세요!');
  }
  sessionStorage.setItem('userName', uid);
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
  const uid = event.target.elements[0].value;
  const password = event.target.elements[1].value;
  const passwordConfirm = event.target.elements[2].value;
  if (!uid) {
    return alert('유저 아이디를 입력해 주세요!');
  }

  sessionStorage.setItem('userName', uid);
  return (window.location.href = '/');
};
const signUpform = document.getElementById('signup-form');
signUpform.addEventListener('submit', submitSignup);
