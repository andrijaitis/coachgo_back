var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/logout', function (req, res, next) {
  if (req.session) {
    req.session.destroy(function (err) {
      if (err) {
        return next(err);
      } else {
        return res.send('logged out');
      }
    });
  }
});


router.post('/login', function (req, res, next) {
  
  (req.body.email && req.body.password) 
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        // return next(err);
        return res.json({ status: false });
      } else {
        req.session.userId = user._id;
        return res.json({ status: true });
      }
    });
 
});


router.post('/register', function (req, res, next) {
console.log(req.body);
  if (req.body.email &&
    req.body.firstName &&
    req.body.password ) {

    var userData = {
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      type: 'coach'
    }

    User.create(userData, function (error, user) {
      if (error) {
        console.log(error);
        return next(error);
      } else {
        console.log('success');
        req.session.userId = user._id;
        return res.json({ status: true });
      }
    });

  }  
});





router.post('/athlete', function (req, res) {

  console.log(req.body);
  return res.json({ status: true });
});

router.get('/athletes', function (req, res) {
  return res.send([{
    id: '1',
    email: 'bybis@dd.t',
    activity: 'Football',
    firstName: 'Hansas',
    lastName: 'Andersenas',
    age: '24',
    height: '181',
    dateCreated: '20140313T00:00:00',
    sport: 'football',
    phone: '123456',
    active: 'true'
  },
  {
    id: '2',
    email: 'hans@gmail.com',
    activity: 'Basketball',
    firstName: 'Endeman',
    lastName: 'Skrautenwagen',
    age: '32',
    height: '200',
    dateCreated: '20140313T00:00:00',
    sport: 'Basketball',
    phone: '84654',
    active: 'false'
  },
  {
    id: '2',
    email: 'hans@gmail.com',
    activity: 'Cricket',
    firstName: 'Roplys',
    lastName: 'Lopas',
    age: '32',
    height: '200',
    dateCreated: '20140313T00:00:00',
    sport: 'Basketball',
    phone: '84654',
    active: 'false'
  }]);
});




router.get('/test', function (req, res, next) {
  return res.send({
    id: '1',
    email: 'bybis@dd.t',
    activity: 'Football',
    firstName: 'Hansas',
    lastName: 'Andersenas',
    age: '24',
    height: '181',
    dateCreated: '20140313T00:00:00',
    sport: 'football',
    phone: '123456',
    active: 'true'
  },
  );
});


module.exports = router;



