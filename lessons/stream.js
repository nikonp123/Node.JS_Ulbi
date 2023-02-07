//Readable - чтение
//Writable - запись
//Duplex - чтение+запись
//Transform - такой же как duplex, но может изменять данные по мере чтения

const fs = require('fs');
const path = require('path');
const http = require('http');

const fileName = path.resolve(__dirname, 'text.txt');
const fileName2 = path.resolve(__dirname, 'text2.txt');

// fs.readFile(fileName, (err, data) => {
//   if (err) {
//     throw err;
//   }
//   console.log(data);
// });

// const stream = fs.createReadStream(fileName, { encoding: 'utf-8' });
// stream.on('data', (chunk) => {
//   console.log('-------------------------------------');
//   console.log(chunk);
// });

// stream.on('end', () => {
//   console.log('That is all, folks!');
// });

// stream.on('open', () => {
//   console.log('Go!!!');
// });

// stream.on('error', (e) => {
//   console.log('Error!');
//   console.log(e);
// });

const writebleStream = fs.createWriteStream(fileName2);
for (let index = 0; index < 20; index++) {
  writebleStream.write(index + '\n');
}

writebleStream.on('error', (e) => {
  console.log('Error!');
  console.log(e);
});

writebleStream.end();

http.createServer((req, res) => {
  //req - readable stream
  //res - writable stream
  // req.on('end')

  const stream = fs.createReadStream(fileName);
  //   //Стрим закончит читать раньше, чем пользователь скачает
  //   stream.on('data', (chunk) => res.write(chunk));
  //   stream.on('end', (chunk) => res.end());

  //Поэтому делаем так
  stream.pipe(res);
});
