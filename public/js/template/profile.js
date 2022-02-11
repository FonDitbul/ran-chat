const logoutButton = document.getElementById('logout-button');

logoutButton.onclick = () => {
  // localStorage.setItem('userName', '');
  // localStorage.setItem('uid', '');
  // localStorage.setItem('access_token', '');
  localStorage.clear();
  return (window.location.href = '/');
};
