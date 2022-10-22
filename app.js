const port = 8000;
const express = require('express');
const open = require('open');
const fs = require('fs');
let app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

app.get('/messagesended', (req, res) => {
    res.sendFile(__dirname + '/public/pages/messagesended.html');
})

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/pages/login.html');
})

app.get('/teacher', (req, res) => {
    res.sendFile(__dirname + '/public/pages/dashboard.html');
})

app.get('/classes', (req, res) => {
    res.sendFile(__dirname + '/public/pages/classess.html');
})

app.post('/', (req, res) => {
    let data = req.body.message;
    let file = fs.readFileSync('messages.txt') || '';
    fs.writeFileSync('messages.txt', `${file}\n${data}`);
    res.redirect(`http://localhost:${port}/messagesended`) / messagesended
})

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
    // open(`http://localhost:${port}`);
})