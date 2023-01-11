const socket = io();

const {username} = Qs.parse(window.location.search, {
    ignoreQueryPrefix: true
});

socket.emit('join', username);

socket.on('message', message => {
    createMessage(message);

    document.getElementById('messageContainer').scrollTop = 
        document.getElementById('messageContainer').scrollHeight;
})

document.querySelector('.sendBtn').addEventListener('click', event => {
    const message = document.getElementById('message').value;

    if(message) {
        document.getElementById('message').value = ''
        document.getElementById('message').focus();
        socket.emit('chatMessage', message);
    }
})

document.addEventListener('keypress', event => {
    if (event.which === 13) {
        event.preventDefault();

        const message = document.getElementById('message').value;

        if (message) {
            document.getElementById('message').value = ''
            document.getElementById('message').focus();
            socket.emit('chatMessage', message);
        }
    }
})

function createMessage(messageData, autoAdd = true, containerID = 'messageContainer') {
    const message = document.createElement('div');
    message.setAttribute('class', 'message');
    
    const meta = document.createElement('span');
    meta.setAttribute('class', 'meta');
    meta.innerHTML = `${messageData.username} <span class="time">${messageData.time}</span>`;

    const context = document.createElement('p');
    context.setAttribute('class', 'context');
    context.innerText = messageData.text;

    message.appendChild(meta);
    message.appendChild(context);

    const container = document.getElementById(containerID);
    if (container && autoAdd) {
        container.appendChild(message);
        return message;
    }
    return message;
}