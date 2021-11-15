const socket = io('/chats');

//socket on 리스트
socket.on('user_entry', (data) => {
  //신규 유저 접속
  drawUserDoor(data.userName, data.text);
});
socket.on('user_exit', (data) => {
  //유저 disconnect
  drawUserDoor(data.userName, data.text);
});
socket.on('chatting', (data) => {
  //채팅 받았을 때
  console.log(data);
  drawChattingContent(data.userName, data.text);
});

//HTML Tage 받아오기
const chatlistDiv = document.getElementById('chat-list'); //chatting 내역
const userInfoForm = document.getElementById('user-info-form'); //유저 input tag
const chatInfoForm = document.getElementById('chat-info-form'); //채팅 input tag

// draw 함수
const drawUserDoor = (userName, text) => {
  const textDiv = document.createElement('div');
  textDiv.innerText = userName + text;
  chatlistDiv.appendChild(textDiv);
};
const drawChattingContent = (id, text) => {
  const textDiv = document.createElement('div');
  textDiv.innerText = id + ' : ' + text;
  chatlistDiv.appendChild(textDiv);
};

// server submit event 함수
const onUserFormSubmit = (event) => {
  //User 이름 정보 전송
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  sessionStorage.setItem('userName', inputValue);
  socket.emit('userName', {
    userName: sessionStorage.getItem('userName'),
  });
  event.target.elements[0].value = '';
};

const onChatFormSubmit = (event) => {
  //chatting 내역 전송
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  socket.emit('chatting', {
    userName: sessionStorage.getItem('userName'),
    text: inputValue,
  });
  drawChattingContent('나', inputValue);
  event.target.elements[0].value = '';
};

//Form event 추가
userInfoForm.addEventListener('submit', onUserFormSubmit);
chatInfoForm.addEventListener('submit', onChatFormSubmit);

const initRender = () => {};
