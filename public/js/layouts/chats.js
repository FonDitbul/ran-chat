(() => {
  const socket = io('/chats');
  const MESSAGE_DIV = document.getElementById('message');

  //socket on 리스트
  socket.on('randomUserEntry', (data) => {
    //랜덤 유저 매칭 성공
    MESSAGE_DIV.appendChild(drawChattingContent('상대방님이 입장하셨습니다.'));
  });
  socket.on('randomUserExit', (data) => {
    //랜덤 유저 disconnect
    MESSAGE_DIV.appendChild(drawChattingContent('상대방님이 퇴장하셨습니다.'));
  });
  socket.on('chatting', (data) => {
    //채팅 받았을 때
    drawChattingContent(data.userName, data.text);
  });

  socket.emit('matchingUser', {});

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
    return messageDivElement;
  };
  const drawChattingContent = (text) => {
    const createDiv = document.createElement('div');
    const createSpan = document.createElement('span');
    createDiv.className =
      'bg-gray-400 rounded px-4 py-2 my-2 text-white relative';
    createSpan.innerText = text;
    createDiv.appendChild(createSpan);
    return createDiv;
  };

  // 랜덤채팅 시작하기
  const ranChatMatchButton = document.getElementById('ran-chat-match');
  const onClickMatchButton = (event) => {
    event.target.innerText = '... 매칭을 기다리는 중 ...';
    const chattingForm =
      event.target.parentElement.getElementsByTagName('div')[0];
    visibleElement(chattingForm);
  };
  const visibleElement = (element) => {
    if (element.style.display === 'none')
      return (element.style.display = 'flex');
    return (element.style.display = 'none');
  };
  ranChatMatchButton.addEventListener('click', onClickMatchButton);
})();
