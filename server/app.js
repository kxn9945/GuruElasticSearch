const path = require('path');
const fs = require('fs');
const express = require('express');
const compression = require('compression');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
const expressHandlebars = require('express-handlebars');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const csrf = require('csurf');
const React = require('react');
const es = require('elasticsearch');
const highlighter = require('keyword-highlighter');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

// const dbURL = process.env.MONGODB_URI || 'mongodb://localhost/GuruElastic';

// for uploading file to elasticsearch

// const data = fs.readFileSync('hosted/rd-consult.json', 'utf8');
// const words = JSON.parse(data);

/* mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});
*/

const client = new es.Client({
  host: 'your url',
  log: 'trace',
});


let redisURL = {
  hostname: 'localhost',
  port: 6379,
};
let redisPASS;

if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisPASS = redisURL.auth.split(':')[1];
}

const router = require('./router.js');


const app = express();
app.use('/assets', express.static(path.resolve(`${__dirname}/../hosted/`)));
// app.use(favicon(`${__dirname}/../hosted/img/favicon.png`));
app.use(compression());
app.disable('x-powered-by');
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.set('views', `${__dirname}/../views`);
app.use(cookieParser());
app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    host: redisURL.hostname,
    port: redisURL.port,
    pass: redisPASS,
  }),
  secret: 'Domo Arigato',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));
app.use(csrf());
app.use((err, req, res, next) => {
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  console.log('Missing CSRF token');
  return false;
});
app.set('client', client);


// router(app, words,client);
router(app, client);

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.log(`Listening on port ${port}`);
});
