const express = require('express');

const viewRouter = express.Router();

viewRouter.get('/', (req, res) => {
    res.render('entry.html');
})
viewRouter.get('/chat', (req, res) => {
    res.render('chat.html')
})

module.exports = viewRouter;