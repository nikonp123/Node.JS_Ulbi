const Emitter = require('events');
const dotenv = require('dotenv');
dotenv.config();

const emitter = new Emitter();

const cb = (data, second, third) => {
  console.log('You send ' + data);
  console.log('Second argument ' + second);
};

emitter.on('message', cb);

const MESSAGE = process.env.MESSAGE || '';
if (MESSAGE) {
  emitter.emit('message', MESSAGE, '12345');
} else {
  emitter.emit('message', 'Вы не указали сообщение!');
}

//in terminal cross-env MESSAGE='This is message' node .\lessons\events.js
emitter.removeListener('message', cb);
