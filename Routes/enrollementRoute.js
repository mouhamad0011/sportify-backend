const enrollementController = require('../Controllers/enrollementController');
const express = require('express');
const router = express.Router();

router.get('/getAll', enrollementController.getEnrollements);
router.get('/getTraineesByClassId/:id',enrollementController.getEnrollementByClassId);
router.get('/getAttendanceByClassId/:id',enrollementController.getAttendanceByClassId);
router.post('/add',enrollementController.addEnrollement);
router.put('/update/:id',enrollementController.updateEnrollementByTraineeId);
router.delete('/delete/:id',enrollementController.deleteEnrollement);
module.exports = router;