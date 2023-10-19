const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/QAController');

router.get('/get/:id',controllers.getQuesAnsByCourseId);
router.post('/add',controllers.createQuiz);
router.delete('/delete/:id',controllers.deleteQuiz);

module.exports=router;