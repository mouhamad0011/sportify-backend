const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/classController');

router.post('/add',controllers.addClass);
router.get('/getAll',controllers.getAllClasses);
router.get('/getClassById',controllers.getClassById);
router.get('/getClassesByCoachId/:id',controllers.getClassesByCoachId);
router.get('/getAllClassesByCourseId/:id',controllers.getAllClassesByCourseId);
module.exports=router;
