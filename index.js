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

// const path = require('path');
// const express = require('express');
// const exphbs = require('express-handlebars');

// const app = express();

// app.engine(
//   '.hbs',
//   exphbs({
//     defaultLayout: 'main',
//     extname: '.hbs',
//     layoutsDir: path.join(__dirname, 'views/layouts')
//   })
// );

// app.set('view engine', '.hbs');
// app.set('views', path.join(__dirname, 'views'));

// app.get('/', (request, response) => {
//   response.render('home', {
//     name: 'Fyunka'
//   });
// });

// DEBUG = express * app.listen(3000);

// Chapter 5

// 'use strict';

// const pg = require('pg');
// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const port = 3000;

// const config = {
//   user: 'your-postgresqlusername-here',
//   database: 'your-dbname-here',
//   password: 'your-password-here',
//   port: 5432 // by Default
// };

// pool takes the object above -config- as parameter
// const pool = new pg.Pool(config);

// Example 1
// pool.connect(function(err, client, done) {
//   if (err) {
//     return console.error('error fetching client from pool', err);
//   }
//   client.query('SELECT $1::varchar AS my_first_query', ['node hero'], function(
//     err,
//     result
//   ) {
//     done();

//     if (err) {
//       return console.error('error happened during query', err);
//     }
//     console.log(result.rows[0]);
//     process.exit(0);
//   });
// });

// Additional example
// app.get('/', (req, res, next) => {
//   pool.connect(function(err, client, done) {
//     if (err) {
//       console.log('Can not connect to the DB' + err);
//     }
//     client.query('SELECT * FROM users', function(err, result) {
//       done();
//       if (err) {
//         console.log(err);
//         res.status(400).send(err);
//       }
//       res.status(200).send(result.rows);
//     });
//   });
// });

// Example 2
// NB: Andrey Melikhov, [Nov 23, 2019 at 00:00:31]: В пятой главе это опущено, но подразумевается, что у тебя должен быть подключён bodyparser чтобы забирать данные из post-запросов

// app.use(bodyParser.json());
// app.post('/users', (req, res, next) => {
//   const user = req.body;

//   pool.connect(function(err, client, done) {
//     if (err) {
//       // Передача ошибки в обработчик express
//       return next(err);
//     }
//     client.query(
//       'INSERT INTO users (name, stack) VALUES ($1, $2);',
//       [user.name, user.stack],
//       function(err, result) {
//         done(); // Этот коллбек сигнализирует драйверу pg, что соединение может быть закрыто или возвращено в пул соединений
//         if (err) {
//           // Передача ошибки в обработчик express
//           return next(err);
//         }
//         res.send(200);
//       }
//     );
//   });
// });

// роут для поиска пользователей Example 3
// app.get('/users', (req, res, next) => {
//   pool.connect(function(err, client, done) {
//     if (err) {
//       // Передача ошибки в обработчик express
//       return next(err);
//     }
//     client.query('SELECT name, stack FROM users;', [], function(err, result) {
//       done();
//       if (err) {
//         // Передача ошибки в обработчик express
//         return next(err);
//       }
//       res.json(result.rows);
//     });
//   });
// });

// app.listen(port, () => {
//   console.log(`Server running at: http://localhost:${port}/`);
// });

// Chapter 6
// const request = require('request-promise');
// // Отправка GET-запроса:
// const options = {
//   method: 'GET',
//   uri: 'https://risingstack.com'
// };

// request(options)
//   .then(function(response) {
//     // Запрос был успешным, используйте объект ответа как хотите
//   })
//   .catch(function(err) {
//     // Произошло что-то плохое, обработка ошибки
//   });

// Отправка POST-запроса:
// const options = {
//   method: 'POST',
//   uri: 'https://risingstack.com/login',
//   body: {
//     foo: 'bar'
//   },
//   json: true
//   // Тело запроса приводится к формату JSON автоматически
// };

// request(options)
//   .then(function(response) {
//     // Обработка ответа
//   })
//   .catch(function(err) {
//     // Работа с ошибкой
//   });

const express = require('express');
const rp = require('request-promise');
const exphbs = require('express-handlebars');
const path = require('path');
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

app.get('/:city', (req, res) => {
  rp({
    uri: 'http://dataservice.accuweather.com/locations/v1/cities/search',
    qs: {
      q: req.params.city,
      apikey: 'api-key'
      // Используйте ваш ключ для accuweather API
    },
    json: true
  })
    .then(data => {
      res.render('home', {
        res: JSON.stringify(data)
      });
    })
    .catch(err => {
      console.log(err);
      res.render('error');
    });
});

app.listen(3000);
