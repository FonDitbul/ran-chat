const socket = io('/chats');

//socket on 리스트
socket.on('user_entry', (username) => {
  //신규 유저 접속
  drawUserEntry(username);
});
socket.on('user_exit', (username) => {
  //유저 disconnect
  drawUserExit(username);
});
socket.on('chatting', (chat) => {
  //채팅 받았을 때
  drawChattingContent(chat.id, chat.text);
});

//HTML Tage 받아오기
const chatlistDiv = document.getElementById('chat-list'); //chatting 내역
const userInfoForm = document.getElementById('user-info-form'); //유저 input tag
const chatInfoForm = document.getElementById('chat-info-form'); //채팅 input tag

// draw 함수
const drawUserEntry = (username) => {
  const textDiv = document.createElement('div');
  textDiv.innerText = username + '님이 입장하셨습니다.';
  chatlistDiv.appendChild(textDiv);
};
const drawUserExit = (username) => {
  const textDiv = document.createElement('div');
  textDiv.innerText = username + '님이 퇴장하셨습니다.';
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
  sessionStorage.setItem('username', inputValue);
  socket.emit('username', inputValue);
  event.target.elements[0].value = '';
};

const onChatFormSubmit = (event) => {
  //chatting 내역 전송
  event.preventDefault();
  const inputValue = event.target.elements[0].value;
  socket.emit('chatting', {
    username: sessionStorage.getItem('username'),
    text: inputValue,
  });
  drawChattingContent('나', inputValue);
  event.target.elements[0].value = '';
};

//Form event 추가
userInfoForm.addEventListener('submit', onUserFormSubmit);
chatInfoForm.addEventListener('submit', onChatFormSubmit);
