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



router.get('/test', function (req, res, next) {
  return res.send('shit works');
});


module.exports = router;



