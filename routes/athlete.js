const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const athleteController = require('../controllers/athlete');

router.post('/athlete', isAuth, athleteController.createAthlete); 
  
router.get('/athletes', isAuth, athleteController.getAthletes);

  module.exports = router;