(() => {
  const roomID = window.location.pathname.split('/').pop();
  const socket = io('/chats');

  const chatForm = document.getElementById('chat-form');
  const historyMessageDiv = document.getElementById('message');

  socket.emit('joinRoom', {
    userName: localStorage.getItem('userName'),
    uid: localStorage.getItem('uid'),
    roomID: 'chatting' + roomID,
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
      uid: localStorage.getItem('uid'),
      userName: localStorage.getItem('userName'),
      text: value,
    });
    event.target.elements[0].value = '';
  };

  const drawFunction = (userName, data) => {
    const userNameSpan = document.createElement('span');
    const messageDiv = document.createElement('div');
    const messageInnerDiv = document.createElement('div');
    const messageTextSpan = document.createElement('span');
    const messageTimeSpan = document.createElement('span');
    messageDiv.className = 'w-full flex justify-start';
    messageInnerDiv.className =
      'bg-gray-100 rounded px-4 py-2 my-2 text-gray-700 relative';
    messageInnerDiv.style.maxWidth = '200px';
    messageTextSpan.className = 'block';
    messageTimeSpan.className = 'block text-xs text-right';
    userNameSpan.innerText = userName;
    messageTextSpan.innerText = data;
    messageTimeSpan.innerText = '11:30pm';

    if (userName === '나') {
      userNameSpan.innerText = '';
      messageDiv.className = 'w-full flex justify-end';
      messageInnerDiv.className =
        'bg-indigo-600 w-3/4 ml-auto mr-4 my-2 p-2 rounded-lg clearfix break-all text-white';
    }
    messageInnerDiv.appendChild(messageTextSpan);
    messageInnerDiv.appendChild(messageTimeSpan);
    messageDiv.appendChild(messageInnerDiv);
    historyMessageDiv.appendChild(userNameSpan);
    historyMessageDiv.appendChild(messageDiv);
    return true;
  };
  chatForm.addEventListener('submit', chatSubmit);
})();
