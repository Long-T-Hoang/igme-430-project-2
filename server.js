const express = require('express');
const app = express();
const port = process.env.PORT || 3001;
const unirest = require("unirest");
const path = require('path');
const router = require('./router');
const compression = require('compression');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const url = require('url');
const redis = require('redis');
const csrf = require('csurf');
const multer = require('multer');

// MongooseDB initialization and connect
const dbURL = process.env.MONGODB_URI || 'mongodb+srv://lth1092:Vrael13071527@cluster0.ywnt7.mongodb.net/GundamCollection?retryWrites=true&w=majority';

// otherwise use this
// delete before upload to GitHub
//const dbURL = ;

// attempt connection to MongoDB
mongoose.connect(dbURL, (err) => {
  if (err) {
    console.log('Could not connect to database');
    throw err;
  }
});

// Redis initialization
let redisURL = {
  hostname: 'redis-10048.c291.ap-southeast-2-1.ec2.cloud.redislabs.com',
  port: 10048,
};

let redisPASS = 'aA9myz8n9XvFijZCYLDgJS58oYKoekqJ';

if (process.env.REDISCLOUD_URL) {
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  [, redisPASS] = redisURL.auth.split(':');
}

const redisClient = redis.createClient({
  host: redisURL.hostname,
  port: redisURL.port,
  password: redisPASS,
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));
app.use('uploads', express.static('uploads'));
app.use(compression());

app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use(bodyParser.json());

app.use(session({
  key: 'sessionid',
  store: new RedisStore({
    client: redisClient,
  }),
  secret: 'IT\'S A GUNDAMMMM',
  resave: true,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
  },
}));

app.disable('x-powered-by');
app.use(cookieParser());

// set up csrf
app.use(csrf());
app.use((err, req, res, next) => {
  console.log(err.code);
  if (err.code !== 'EBADCSRFTOKEN') return next(err);

  console.log('Missing CSRF token');
  return false;
});

router(app);

app.listen(port, () => {
  console.log(`gunpla-collection-app listening on port ${port}`);
});