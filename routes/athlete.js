const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const athleteController = require('../controllers/athlete');
const { body } = require('express-validator/check');

router.post('/athlete', isAuth, athleteController.createAthlete); 
  
router.get('/athletes', isAuth, athleteController.getAthletes);

router.get('/athlete/:athleteId', isAuth, athleteController.getAthlete);

router.delete('/athlete/:athleteId', isAuth, athleteController.deleteAthlete);

router.put(
  '/athlete/:athleteId',
  isAuth,
  [
    body('email')
      .trim()
      .isLength({ min: 5 }),
    body('firstName')
      .trim()
      .isLength({ min: 5 }),
    body('lastName')
      .trim()
      .isLength({ min: 5 }),
    body('age')
      .trim(),
    body('height')
      .trim(),
    body('sport')
      .trim()
      .isLength({ min: 5 }),
    body('phone')
      .trim()
      .isLength({ min: 5 }),
    body('active')
      .trim(),
    body('gender')
      .trim(),
  ],
  athleteController.updateAthlete
);

  module.exports = router;

  