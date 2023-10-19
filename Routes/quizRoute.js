const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/quizController');

router.post('/add', controllers.createQuiz);
router.get('/getAll', controllers.getAllQuizzes);
router.get('/getOneQuizById/:id', controllers.getOneQuizById);
router.get('/getOneQuizByCourseId/:id', controllers.getOneQuizByCourseId);
router.delete('/delete/:id',controllers.deleteQuiz);

module.exports = router;