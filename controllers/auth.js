const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.login = (req, res, next) => {
  
    (req.body.email && req.body.password) 
      User.authenticate(req.body.email, req.body.password, function (error, user) {
      console.log(req.body);
      console.log
        if (error || !user) {
          var err = new Error('Wrong email or password.');
          err.status = 401;
          // return next(err);
          return res.json({ status: false, err: err });
        } else {
  
          const token = jwt.sign(
            {
              email: user.email,
              userId: user._id.toString(),
            },
            'mantDubbbz',
            { expiresIn: '5h' }
          );
          console.log(token.exp);
          res.status(200).json({status: true ,token: token, userId: user._id.toString(), usrEmail: user.email.toString()});
          // return res.json({ status: true, userId:  req.session.userId });
        }
      });
   
  }


  exports.register = (req, res, next) => {
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
  }








