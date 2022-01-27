(() => {
  const createModalButton = document.getElementById('create-modal-button');
  const chatTable = document.querySelector('table');
  const createRoomModal = document.getElementById('create-room-modal');
  const closeButton = document.getElementById('modal-close');
  const createRoomform = document.getElementById('create-room-form');

  const createPublicRoom = async (event) => {
    event.preventDefault();
    const title = event.target.elements[0].value;
    const uid = sessionStorage.getItem('uid');
    await axios.post('/public-chat', {
      title: title,
      uid: uid,
    });
    return location.reload();
  };
  createRoomform.addEventListener('submit', createPublicRoom);

  createModalButton.onclick = function () {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) return alert('로그인 후 이용해 주세요.');
    createRoomModal.style.display = 'block';
  };

  closeButton.onclick = function () {
    event.preventDefault();
    createRoomModal.style.display = 'none';
  };

  window.onclick = function (event) {
    if (event.target == createRoomModal) {
      createRoomModal.style.display = 'none';
    }
  };
})();
