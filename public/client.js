const socket = io();

const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');
const messages = document.getElementById('messages');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value) {
        socket.emit('chat message', input.value);
        addMessage(input.value, 'sent');
        input.value = '';
    }
});

socket.on('chat message', (msgObj) => {
    if (msgObj && msgObj.text) {
        addMessage(msgObj.text, 'received');
    }
});

function addMessage(msg, type) {
    const item = document.createElement('li');
    item.textContent = msg;
    item.classList.add(type);
    messages.appendChild(item);
    messages.scrollTop = messages.scrollHeight;
}
