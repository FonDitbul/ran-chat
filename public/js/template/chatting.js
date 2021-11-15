const roomID = document.getElementById('room-id').innerText;
const socket = io('/chats');

const text = document.getElementById('user');
const chatForm = document.getElementById('chat-form');
const chatText = document.getElementById('chat-text');

socket.emit('joinRoom', { roomID: roomID });

socket.on('recMsg', function (data) {
  drawFunction(data.text);
});

const myOnClick = (event) => {
  event.preventDefault();
  const value = event.target.elements[0].value;
  socket.emit('reqMsg', { text: value });
  event.target.elements[0].value = '';
};

const drawFunction = (data) => {
  const textDiv = document.createElement('div');
  textDiv.innerText = data;
  chatText.appendChild(textDiv);
};
chatForm.addEventListener('submit', myOnClick);
