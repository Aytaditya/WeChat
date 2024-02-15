
// node server which will handle socket io requests
//const io = require('socket.io')(8000);
const io = require('socket.io')({
    cors: {
      origin: '*',
    },
  });
  
  io.listen(8000);

const users = {};   

io.on('connection', socket => {
    // Event (new-user-joined) when user joins
    socket.on('new-user-joined', name => {
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    // Event (send) when someone sends a chat
    // recieve and send are name of events and can be any name
    socket.on('send', message => {
        socket.broadcast.emit('receive', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', {name: users[socket.id]});
        delete users[socket.id]
    });

    
});
