const enrollementController = require('../Controllers/enrollementController');
const express = require('express');
const router = express.Router();

router.get('/getAll', enrollementController.getEnrollements);
router.get('/getTraineesByClassId/:id',enrollementController.getEnrollementByClassId);
router.get('/getAttendanceByClassId/:id',enrollementController.getAttendanceByClassId);
router.post('/add',enrollementController.addEnrollement);
router.put('/update/:name/:id',enrollementController.updateEnrollementByTraineeName);
router.delete('/delete/:id/:ID',enrollementController.deleteEnrollement);
router.get('/getEnrollementByTraineeId/:id', enrollementController.getEnrollementByTraineeId)
module.exports = router;