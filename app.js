const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('circleAdded', (circleData) => {
    console.log('Circle added:', circleData);
    socket.broadcast.emit('circleAdded', circleData);
  });

  socket.on('circleMoved', (circleData) => {
    console.log('Circle moved:', circleData);
    socket.broadcast.emit('circleMoved', circleData);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
