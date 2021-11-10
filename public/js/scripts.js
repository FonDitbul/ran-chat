const socket = io('/chats');

socket.on('new_user', (username) => {
  const textDiv = document.createElement('div');
  textDiv.innerText = username;
  chatlistDiv.appendChild(textDiv);
});

socket.on('user_info', (data) => {
  console.log(data);
});

socket.on('chatting', (chat) => {
  drawChattingContent(chat.id, chat.text);
});
function drawChattingContent(id, text) {
  const textDiv = document.createElement('div');
  textDiv.innerText = id + ' : ' + text;
  chatlistDiv.appendChild(textDiv);
}
const chatlistDiv = document.getElementById('chat-list');

const userInfoForm = document.getElementById('user-info-form');
const onUserFormSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  socket.emit('user_info', inputValue);
};
userInfoForm.addEventListener('submit', onUserFormSubmit);

//chatting 전송
const chatInfoForm = document.getElementById('chat-info-form');
const onChatFormSubmit = (event) => {
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  socket.emit('chatting', inputValue);
  drawChattingContent('나', inputValue);
};

chatInfoForm.addEventListener('submit', onChatFormSubmit);
