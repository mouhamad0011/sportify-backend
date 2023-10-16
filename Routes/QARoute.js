const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/QAController');

router.get('/get/:id',controllers.getQuesAnsByQuizId);
router.post('/add',controllers.createQuiz);

module.exports=router;