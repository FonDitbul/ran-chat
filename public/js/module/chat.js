const socket = io('/chats');

const text = document.getElementById('user');
const chatForm = document.getElementById('chat-form');

socket.emit('joinRoom', { roomNumber: 1 });
socket.emit('connection', { roomNumber: 1 });

socket.on('recMsg', function (data) {
  console.log(data.text);
});

const myOnClick = (event) => {
  event.preventDefault();
  const value = event.target.elements[0].value;
  socket.emit('reqMsg', { text: value });
};

chatForm.addEventListener('submit', myOnClick);
