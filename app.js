var express = require('express');


var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var port = process.env.PORT || 3000;
var origin = 'https://coachgo.herokuapp.com';
var cors = require('cors');

mongoose.connect('mongodb://localhost/coach-database'); //localhost database
// mongoose.connect('mongodb://vidas:vidas@coachgo-shard-00-01-dqxa6.mongodb.net:27017/coachgo?ssl=true&authSource=admin');



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
console.log('connectio nsucess to db');
});

app.use(cors({
origin: ["http://localhost:4200"],
credentials: true,
}));



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var allowedOrigins = ['http://localhost:4200', 'https://coachgo.herokuapp.com'];
// if (port === 3000){origin = allowedOrigins[0]} else {origin = allowedOrigins[1]}


// app.use(function (req, res, next) {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200'); 
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
//   res.setHeader('Access-Control-Allow-Credentials', true);
//   next();
// });

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