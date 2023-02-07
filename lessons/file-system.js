const dotenv = require('dotenv');
dotenv.config();

const fs = require('fs');
const path = require('path');

const td = path.join(__dirname, 'test1');
const td2 = path.join(__dirname, 'test1', 'test2');
// console.log(td2);
// fs.mkdirSync(td2, { recursive: true });

// console.log('START');
// fs.mkdir(td, (err) => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Папка создана ');
// });
// console.log('END');

// console.log('START2');
// fs.promises.mkdir(td2, { recursive: true }).then(console.log('Папки созданы'));
// console.log('END2');

fileName = path.resolve(__dirname, 'file.txt');
fileNameCount = path.resolve(__dirname, 'count.txt');

// fs.writeFile(fileName, 'weed eerr111 222', (err) => {
//   if (err) {
//     console.log('Something went wrong...');
//     return;
//   }
//   fs.appendFile(fileName, ' .....1!!!!!', () => {});
// });

const writeFileAsync = async (path, data) => {
  return new Promise((resolve, reject) =>
    fs.writeFile(path, data, (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve();
    })
  );
};

const appendFileAsync = async (path, data) => {
  return new Promise((resolve, reject) =>
    fs.appendFile(path, data, (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve();
    })
  );
};

const readFileAsync = async (path) => {
  return new Promise((resolve, reject) =>
    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (err) {
        return reject(err.message);
      }
      resolve(data);
    })
  );
};

const removeFileAsync = async (path) => {
  return new Promise((resolve, reject) =>
    fs.rm(path, (err) => {
      if (err) {
        return reject(err.message);
      }
      resolve();
    })
  );
};

// writeFileAsync(fileName, 'my promise!')
//   .then(() => appendFileAsync(fileName, ' this is from append'))
//   .then(() => appendFileAsync(fileName, ' second append!!!!'))
//   .then(() => readFileAsync(fileName))

//   .then((data) => console.log(data))
//   .then(() => removeFileAsync(fileName))
//   .catch((err) => console.log(err));

const text = process.env.TEXT || '';
writeFileAsync(fileName, text)
  .then(() => readFileAsync(fileName))
  .then((data) => data.split(' ').length)
  .then((count) =>
    writeFileAsync(fileNameCount, `Кол-во слов в файле ${count}`)
  )
  .then(() => removeFileAsync(fileName));
