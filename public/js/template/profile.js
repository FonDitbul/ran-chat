const logoutButton = document.getElementById('logout-button');

logoutButton.onclick = () => {
  // localStorage.setItem('userName', '');
  // localStorage.setItem('uid', '');
  // localStorage.setItem('access_token', '');
  localStorage.clear();
  return (window.location.href = '/');
};

const userDeleteButton = document.getElementById('user-delete-button');
userDeleteButton.onclick = async () => {
  const uid = localStorage.getItem('uid');
  await axios.delete('/users/' + uid);
  localStorage.clear();
  return (window.location.href = '/');
};
