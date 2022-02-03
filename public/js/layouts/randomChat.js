(() => {
  const socket = io('/random-chat');
  const MESSAGE_DIV = document.getElementById('message');
  let randomUser = '';
  //socket on 리스트
  socket.on('randomUserEntry', (data) => {
    //랜덤 유저 매칭 성공 출력
    randomUser = data.room;
    return MESSAGE_DIV.appendChild(drawChattingContent('대화를 나눠보쎼용'));
  });
  socket.on('randomUserExit', (data) => {
    //랜덤 유저 disconnect 출력
    return MESSAGE_DIV.appendChild(
      drawChattingContent('상대방님이 퇴장하셨습니다.'),
    );
  });
  socket.on('recMsg', function (res) {
    //채팅 메시지를 받았을 때
    return drawChattingMessage('상대방', res.text, MESSAGE_DIV);
  });

  //채팅 메시지 그리기
  const drawChattingMessage = (user, text, messageDivElement) => {
    const messageDiv = document.createElement('div');
    const innerDiv = document.createElement('div');
    const textSpan = document.createElement('span');
    innerDiv.className =
      'bg-gray-400 rounded px-4 py-2 my-2 text-white relative';
    innerDiv.style.maxWidth = '350px';
    // textSpan.className = 'block';
    textSpan.innerText = user + ' : ' + text;
    if (user === '나') {
      textSpan.innerText = user + ' : ' + text;
      messageDiv.className = 'w-full flex justify-end';
      innerDiv.className =
        'bg-blue-700 w-3/4 ml-auto mr-4 my-2 p-2 rounded text-white';
    }
    innerDiv.appendChild(textSpan);
    messageDiv.appendChild(innerDiv);
    messageDivElement.appendChild(messageDiv);
    messageDivElement.scrollTop = messageDivElement.scrollHeight;
    return messageDivElement;
  };
  //채팅 시스템 내용 그리기
  const drawChattingContent = (text) => {
    const createDiv = document.createElement('div');
    const createSpan = document.createElement('span');
    createDiv.className =
      'bg-gray-400 rounded px-4 py-2 my-2 text-white justify-center';
    createSpan.innerText = text;
    createDiv.appendChild(createSpan);
    return createDiv;
  };

  // 랜덤채팅 시작하기 버튼
  const ranChatMatchButton = document.getElementById('ran-chat-match');
  const onClickMatchButton = async (event) => {
    event.target.innerText = '... 매칭을 기다리는 중 ...';
    const chattingForm =
      event.target.parentElement.getElementsByTagName('div')[0];
    visibleElement(chattingForm);
    await socket.emit('matchingUser', {});
  };

  const visibleElement = (element) => {
    if (element.style.display === 'none')
      return (element.style.display = 'flex');
    return (element.style.display = 'none');
  };
  ranChatMatchButton.addEventListener('click', onClickMatchButton);

  //랜덤 채팅 메세지 적기
  const chatForm = document.getElementById('chat-form');
  const onClickChatForm = (event) => {
    event.preventDefault();
    const text = event.target[0].value;
    socket.emit('reqMsg', {
      room: randomUser,
      text: text,
    });
    drawChattingMessage('나', text, MESSAGE_DIV);
    //채팅 초기화
    event.target[0].value = '';
  };
  chatForm.addEventListener('submit', onClickChatForm);
})();
