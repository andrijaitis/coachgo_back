var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Athlete = require('../models/athlete');
const jwt = require('jsonwebtoken');
const isAuth = require('../middleware/isAuth');

// router.get('/logout', function (req, res, next) {
//   if (req.session) {
//     req.session.destroy(function (err) {
//       if (err) {
//         return next(err);
//       } else {
//         return res.send('logged out');
//       }
//     });
//   }
// });


router.post('/login', function (req, res, next) {
  
  (req.body.email && req.body.password) 
    User.authenticate(req.body.email, req.body.password, function (error, user) {
      if (error || !user) {
        var err = new Error('Wrong email or password.');
        err.status = 401;
        // return next(err);
        return res.json({ status: false });
      } else {


        const token = jwt.sign(
          {
            email: user.email,
            userId: user._id.toString()
          },
          'mantDubbbz',
          { expiresIn: '1h' }
        );
        res.status(200).json({status: true ,token: token, userId: user._id.toString() });
        // return res.json({ status: true, userId:  req.session.userId });
      }
    });
 
});


router.post('/register', function (req, res, next) {
  console.log(req.get('Cookie'));
// console.log(req.body);
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
        return res.json({ status: true });
      }
    });

  }  
});










router.get('/test', function (req, res, next) {


    return res.send('smth');
});





module.exports = router;



