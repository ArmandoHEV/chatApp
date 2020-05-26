const express = require('express');
const app = express();


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index');
})

const PORT = process.env.PORT || 8080;
server = app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});

const io = require('socket.io')(server)

io.on('connection', (socket) => {
    console.log('New user connected');

    //Default Username
    socket.username = "Anonymous";

    //Listen on change Username
    socket.on('change_username', (data) => {
        socket.username = data.username;
    })

    //Listen on new_message
    socket.on('new_message', (data) => {
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
        socket.broadcast.emit('typing', {username : socket.username})
    })

})

