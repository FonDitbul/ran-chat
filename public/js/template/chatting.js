const roomID = document.getElementById('room-id').innerText;
const socket = io('/chats');

const text = document.getElementById('user');
const chatForm = document.getElementById('chat-form');
const chatText = document.getElementById('chat-text');

socket.emit('joinRoom', {
  userName: sessionStorage.getItem('userName'),
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
    userName: sessionStorage.getItem('userName'),
    text: value,
  });
  event.target.elements[0].value = '';
};

const drawFunction = (userName, data) => {
  const textDiv = document.createElement('div');
  textDiv.innerText = userName + ':' + data;
  chatText.appendChild(textDiv);
};
chatForm.addEventListener('submit', chatSubmit);
