const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/classController');

router.post('/add',controllers.addClass);
router.get('/getClassCourseDateHour/:id',controllers.getClassCourseDateHour);
router.get('/getClassNamesPresence/:id',controllers.getClassNamesPresence);
router.get('/getAll',controllers.getAllClasses);
router.get('/getClassById/:id',controllers.getClassById);
router.delete('/delete/:id',controllers.deleteClass);
router.get('/getClassesByCoachId/:id',controllers.getClassesByCoachId);
router.get('/getAllClassesWithDetails',controllers.getAllClassesWithDetails);
router.get('/getAllClassesByCourseId/:id',controllers.getAllClassesByCourseId);
router.get('/getClassesByCourseId/:id',controllers.getClassesByCourseId);

module.exports=router;
