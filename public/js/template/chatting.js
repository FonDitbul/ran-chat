const roomID = document.getElementById('room-id').innerText;
const socket = io('/chats');

const text = document.getElementById('user');
const chatForm = document.getElementById('chat-form');
const chatText = document.getElementById('chat-text');

socket.emit('joinRoom', {
  userName: sessionStorage.getItem('userName'),
  uid: sessionStorage.getItem('uid'),
  roomID: roomID,
});

socket.on('recMsg', function (res) {
  drawFunction(res.userName, res.text);
});

const chatSubmit = (event) => {
  event.preventDefault();
  const value = event.target.elements[0].value;
  drawFunction('나', value);
  socket.emit('reqMsg', {
    roomID: roomID,
    uid: sessionStorage.getItem('uid'),
    userName: sessionStorage.getItem('userName'),
    text: value,
  });
  event.target.elements[0].value = '';
};

const drawFunction = (userName, data) => {
  const textDiv = document.createElement('div');
  textDiv.innerText = userName + ':' + data;
  if (userName === '나') {
    textDiv.className =
      'bg-indigo-600 w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all text-white';
  } else {
    textDiv.className =
      'bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all text-white';
  }
  chatText.appendChild(textDiv);
};
chatForm.addEventListener('submit', chatSubmit);
