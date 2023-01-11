const users = [];

function userJoin(id, username) {
    const userNameExists = users.filter(user => user.name === username);

    if (userNameExists[0]) {
        username = `${username} #${userNameExists.length + 1}`;
    }

    const newUser = {
        id,
        name: username
    };

    users.push(newUser);
    return newUser;
}

function getCurrentUser(id) {
    return users.filter(user => user.id === id);
}

module.exports = {
    userJoin,
    getCurrentUser
}