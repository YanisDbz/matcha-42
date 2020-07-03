const express = require('express')
const activateController = require('../controllers/activateUser')
const router = express.Router()

router.post('/activate', activateController.activate);

module.exports = router