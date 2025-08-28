import { createServer } from 'node:http';
import next from 'next';
import { Server } from 'socket.io';

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = 3000;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);

  let onlineUsers = [];

  io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('addNewUser', (authUser) => {
      if (
        authUser &&
        !onlineUsers.some((user) => user?.userId === authUser.id)
      ) {
        onlineUsers.push({
          userId: authUser.id,
          sockedId: socket.id,
          profile: authUser,
        });
        io.emit('getUser', onlineUsers);
      }
    });

    socket.on('disconnect', () => {
      onlineUsers = onlineUsers.filter((user) => user.sockedId !== socket.id);

      io.emit('getUsers', onlineUsers);
    });
    // ...
  });

  httpServer
    .once('error', (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});

console.log('Server Started::30000');
