import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

const server = createServer(app);
const io = new Server(server, { cors: { origin:"http://localhost:4200" } });

app.post('/activity', (req, res) => {
  res.json({ message: req.body });
});

io.on('connection', (socket) => {
  console.log('Client connected successfully:', socket.id);
})

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
