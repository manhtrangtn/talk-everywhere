var http  = require('http');
var ex = require('express');
var app = ex();
app.use(ex.static('public'));
app.set('view engine', 'ejs');
app.set('views', './views');
var users = [];
var socketUsername;
var server = http.Server(app).listen(process.env.PORT || 3141);
var io = require('socket.io')(server);
io.on("connect", function (socket) {
    console.log(socket.id + ' connected!');
    socket.on('start', function (data) { 
        if(users.indexOf(data)>=0){
            socket.emit('false');
        } else{
            socketUsername = data;
            users.push(data);
            socket.emit('true',data);
            io.sockets.emit('users', users);
        }
     })
     socket.on('send',function (data) { 
        io.sockets.emit('sent', data);
      })
    socket.on('logout', function (data) { 
        users.splice(users.indexOf(data),1);
        io.sockets.emit('users', users);
     })
     socket.on('stick',function (data) {
         if (data=='agry') {
             io.sockets.emit('stk','sticker/agry.png')
         } else if (data == 'gift') {
             io.sockets.emit('stk', 'sticker/gift.jpg')
         } else if (data == 'leuuu') {
             io.sockets.emit('stk', 'sticker/leuuuu.png')
         } else if (data == 'love') {
             io.sockets.emit('stk', 'sticker/love.png')
         } else if (data == 'simon') {
             io.sockets.emit('stk', 'sticker/simon.png')
         } 
     })
})
app.get('/',function (rq,rs) { rs.render('index') });

console.log("server starting !")
