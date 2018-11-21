const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');
const trainingController = require('../controllers/training');
const { body } = require('express-validator/check');

router.post('/training', isAuth, trainingController.createTrainingBasket);
router.post('/trainings', isAuth, trainingController.getTrainings);
router.get('/alltrainings', isAuth, trainingController.getAllTrainings); 
  


  module.exports = router;

  