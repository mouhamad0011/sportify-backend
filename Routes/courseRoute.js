const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/courseController');

router.post('/add',controllers.addCourse);
router.get('/getAll',controllers.getAllCourses);
router.get('/getCourseById',controllers.getCourseById);
module.exports=router;
