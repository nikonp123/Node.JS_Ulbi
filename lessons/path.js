const path = require('path');

// console.log(path.join(__dirname, 'first', 'second'));
// console.log(__filename);
// console.log(__dirname);
// console.log(path.join(__dirname, '..'));

// console.log('resolve---------------');
// //лучше не использовать, т.к. надо точно понимать как она работает
// console.log('Абсолютный путь: ', path.resolve('first', 'second'));

// // -----------------------
// const fullpath = path.resolve('first', 'second', 'test.js');
// console.log('Parsing', path.parse(fullpath));
// console.log('File name: ', path.basename(fullpath));
// console.log('Extantion: ', path.extname(fullpath));

// ----------------------------------URL
const siteURL = 'http://localhost:8080/users?id=45';
const url = new URL(siteURL);
console.log(url);
