const app = require('express')();
app.set('view engine', 'ejs');

const server = require('http').Server(app);
const io = require('socket.io')(server)

app.get('/', (req, res) => {
    res.render('index.pug');
})

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

    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
    });

});

if (module === require.main) {
    const PORT = process.env.PORT || 8080;
    server.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
        console.log('Press Ctrl+C to quit.');
    });
}


