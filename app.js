// Required modules
const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Socket.IO connection event
io.on('connection', (socket) => {
  console.log('A user connected');

  // Handle the 'circleAdded' event from the client
  socket.on('circleAdded', (circleData) => {
    console.log('Circle added:', circleData);
    // Broadcast the 'circleAdded' event to all connected clients except the sender
    socket.broadcast.emit('circleAdded', circleData);
  });

  // Handle the 'circleMoved' event from the client
  socket.on('circleMoved', (circleData) => {
    console.log('Circle moved:', circleData);
    // Broadcast the 'circleMoved' event to all connected clients except the sender
    socket.broadcast.emit('circleMoved', circleData);
  });

  // Socket.IO 'disconnect' event
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Server port
const PORT = 3000;
http.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
