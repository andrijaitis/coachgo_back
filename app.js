const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;

// mongoose.connect('mongodb://localhost/coach-database'); //localhost database
mongoose.connect('mongodb://vidas:vidas123@coachgo-shard-00-00-dqxa6.mongodb.net:27017/coachgo?ssl=true&authSource=admin');


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
console.log('DB connect success');
});

// const origin = 'https://coachgo.herokuapp.com';
// // var allowedOrigins = ['http://localhost:4200', 'https://coachgo.herokuapp.com'];
// if (port === 3000){origin = allowedOrigins[0]} else {origin = allowedOrigins[1]}
// app.use(cors({
// origin: [origin],
// credentials: true,
// }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const origin = 'https://coachgo.herokuapp.com';
var allowedOrigins = ['http://localhost:4200', 'https://coachgo.herokuapp.com'];
// if (port === 3000){origin = allowedOrigins[0]} else {origin = allowedOrigins[1]}
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', origin); 
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});

const routes = require('./routes/authentication');
const athleteRoutes = require('./routes/athlete');

app.use('/api/', routes,athleteRoutes);

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
  console.log('CoachGO app listening on port ', port);
});