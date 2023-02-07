// console.log(process.pid);
// while (true) {}

const http = require('http');
const EventEmitter = require('events');
const Router = require('./framework/Router');
const Application = require('./framework/Application');
const userRouter = require('./src/user-router');
const parseJson = require('./framework/parseJson');
const parseUrl = require('./framework/parseUrl');
const mongoose = require('mongoose');
const emitter = new EventEmitter();

const PORT = process.env.PORT || 5000;
const app = new Application();

// const router = new Router();
// router.get('/users', (req, res) => {
//   console.log('This is our get');
//   res.end('YOU SEND REQUEST TO /users!!!!!!! with framework!');
// });
// router.get('/posts', (req, res) => {
//   console.log('This is our post');
//   res.end('YOU SEND REQUEST TO /posts');
// });

// const server = http.createServer((request, response) => {
//   emitter.emit(`[${request.url}]:[${request.method}]`, request, response);
//   // response.end(request.url);
// });

// server.listen(PORT, () => {
//   console.log(`Server has started on port ${PORT}`);
// });

app.use(parseJson);
app.use(parseUrl(`http://localhost:${PORT}`));
app.addRouter(userRouter);
// app.listen(PORT, () => {
//   console.log(`Server has started on port ${PORT}`);
// });

const start = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://user:123@cluster0.7v4hjb3.mongodb.net/?retryWrites=true&w=majority'
    );
    app.listen(PORT, () => {
      console.log(`Server has started on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
