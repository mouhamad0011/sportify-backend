const express = require('express');
const router = express.Router();
const controllers = require('../Controllers/userController');

router.post('/add', controllers.createUser);
router.get('/getAll', controllers.getAllUsers);
router.get('/getAllCoaches', controllers.getAllCoaches);
router.get('/getAllTrainees', controllers.getAllTrainees);
router.get('/getOneUserById/:id', controllers.getOneUserById);
router.get('/getOneUserByName/:name', controllers.getOneUserByName);
router.get('/getOneUserByEmailPassword/:email/:password',controllers.getOneUserByEmailPassword);
router.delete('/delete/:id',controllers.deleteUser);


module.exports = router;