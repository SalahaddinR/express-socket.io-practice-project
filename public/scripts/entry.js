document.querySelector('.container').addEventListener('submit', event => {
    const username = document.getElementById('username').value;
    if (!username || username.trim() === '') {
        event.preventDefault();
    }
})