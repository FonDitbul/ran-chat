const createRoomButton = document.getElementById('create-room-button');
const chatTable = document.querySelector('table');

async function createPublicRoom() {
  const title = '생성테스트';
  const uid = 1;
  await axios.post('/public-chat', {
    title: title,
    uid: uid,
  });
  location.reload();
}
// Modal 생성 Click 이벤트로 parameter 받기
createRoomButton.addEventListener('click', createPublicRoom);
