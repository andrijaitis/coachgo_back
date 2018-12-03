const express = require('express');
const router = express.Router();
const authenticationController = require('../controllers/auth');

router.post('/login', authenticationController.login);
router.post('/register', authenticationController.register );
router.post('/logout', authenticationController.logout );
router.get('/test', function (req, res, next) {
    return res.send('smth');
});

module.exports = router;



