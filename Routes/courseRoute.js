const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/courseController');

router.post('/add',controllers.addCourse);
router.get('/getAll',controllers.getAllCourses);
router.get('/getCourseById',controllers.getCourseById);
router.delete('/delete/:id',controllers.deleteCourse);
router.get('/getAllCoursesByCoachName/:name',controllers.getAllCoursesByCoachName);
router.get('/getAllCoursesWithCoachName',controllers.getAllCoursesWithCoachName);
router.get('/getCourseIdByCourseName/:name',controllers.getCourseIdByCourseName);
router.get('/getAllCoursesByTraineeId/:id',controllers.getAllCoursesByTraineeId);
module.exports=router;
