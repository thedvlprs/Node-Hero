// console.log('hello from Node.js')
// require('./app/index');

// const _ = require('lodash');

// _.assign({ a: 1 }, { b: 2 }, { c: 3 });

// const fs = require('fs');

// console.log('start reading a file...');

// fs.readFile('file.md', 'utf-8', function(err, content) {
//   if (err) {
//     console.log('error happened during reading the file');
//     return console.log(err);
//   }
//   console.log(content);
// });

// console.log('end of the file');

// function stats(file) {
//   return new Promise((resolve, reject) => {
//     fs.stat(file, (err, data) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(data);
//     });
//   });
// }

// Promise.all([stats('file1'), stats('file2'), stats('file3')])
//   .then(data => console.log(data))
//   .catch(err => console.log(err));

// const http = require('http');
// const port = 3000;

// const requestHandler = (request, response) => {
//   console.log(request.url);
//   response.end('Hello Node.js Server!');
// };

// const server = http.createServer(requestHandler);

// server.listen(port, err => {
//   if (err) {
//     return console.log('something bad happened', err);
//   }

//   console.log(`server is listening on ${port}`);
// });

// const express = require('express');
// const app = express();
// const port = 3000;

// app.get('/', (request, response) => {
//   response.send('Hello from Express!');
// });

// app.listen(port, err => {
//   if (err) {
//     return console.log('something bad happened', err);
//   }

//   console.log(`server is listening on ${port}`);
// });

const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');

const app = express();

app.engine(
  '.hbs',
  exphbs({
    defaultLayout: 'main',
    extname: '.hbs',
    layoutsDir: path.join(__dirname, 'views/layouts')
  })
);

app.set('view engine', '.hbs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (request, response) => {
  response.render('home', {
    name: 'Fyunka'
  });
});

DEBUG = express * app.listen(3000);
