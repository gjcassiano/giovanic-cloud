const express = require('express');
const router = express.Router();
const iotController = require('./iot.controller');

router.get('/', iotController.getList);
router.get('/:id', iotController.getData);
router.post('/delete/:id', iotController.deleteData);
router.post('/add', iotController.createData);

module.exports = router;
