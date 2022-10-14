const port = 8000;
const express = require('express');
const open = require('open');
let app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/index.html')
})

app.listen(port, () => {
    console.log(`App listen on port ${port}`);
    open(`http://localhost:${port}`);
})