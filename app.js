var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var MongoStore = require('connect-mongo')(session);
var port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost/coach-database'); //localhost database
mongoose.connect('mongodb://vidas:vidas123@coachgo-shard-00-01-dqxa6.mongodb.net:27017/coachgo?ssl=true&authSource=admin');



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
console.log('connectio nsucess to db');
});

app.use(session({
  secret: 'mantDubbbz',
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: db
  })
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var allowedOrigins = ['http://localhost:4200 ', 'https://coachgo.herokuapp.com', 'http://127.0.0.1:9000', 'http://localhost:9000'];
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', origin); 
  // res.setHeader('Access-Control-Allow-Origin', 'https://coachgo.herokuapp.com'); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

var routes = require('./routes/router');

app.use('/api/', routes);


app.use(function (req, res, next) {
  var err = new Error('File Not Found');
  err.status = 404;
  next(err);
});

app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.send(err.message);
});


app.listen(port, function () {
  console.log('Express app listening on port ', port);
});