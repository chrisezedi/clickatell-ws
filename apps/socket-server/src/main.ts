import express, { NextFunction, Request, Response } from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();

const host = process.env.HOST ?? 'localhost';
const port = process.env.PORT ? Number(process.env.PORT) : 3000;

app.use(express.json());

const server = createServer(app);
const io = new Server(server, { cors: { origin:"http://localhost:4200" } });

const validate = (req:Request, res:Response, next:NextFunction):void => {
  const { activity } = req.body as Partial<{activity:string}>;

  if (!activity || activity.trim() === '') {
    res.status(400).json({ error: 'Activity is required' });
    return;
  }

  next();
};

app.post('/activity', validate, (req, res) => {
  io.emit("activity",req.body.activity)
  res.send(req.body.activity)
});

io.on('connection', (socket) => {
  console.log('Client connected successfully:', socket.id);
})

server.listen(port, host, () => {
  console.log(`[ ready ] http://${host}:${port}`);
});
