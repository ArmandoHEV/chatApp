$(function(){
    var socket = io();

    //buttons & inputs
    var message = $("#message")
    var username = $("#username")
    var send_message = $("#send_message")
    var send_username = $("#send_username")
    var chatroom = $("#chatroom")
    var feedback = $("#feedback")

    send_message.click(function(){
        socket.emit('new_message', {message : message.val()})
    })

    socket.on("new_message", (data) => {
        feedback.html('');
        message.val('');
        chatroom.append("<p class = 'message'>" + data.username + ": " + data.message + "</p>")
    })

    send_username.click(function () {
        console.log(username.val())
        socket.emit("change_username", { username : username.val()})
    })

    //Emite el que se encuentra escribiendo
    message.bind("keypress", () => {
        socket.emit('typing')
    })

    //Listen on typing
    socket.on('typing', (data) => {
        feedback.html("<p>" + data.username + " is typing a message..." + "</p>")
    })

});