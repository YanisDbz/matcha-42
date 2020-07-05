const express = require('express')
const activateController = require('../controllers/activateUser')
const router = express.Router()
const { check } = require('express-validator');
const forgotpwd = require('../controllers/forgotpwd')

router.post('/activate', activateController.activate);
router.post('/forgot-pwd', [
    check('email').notEmpty().withMessage('Email required')
    .isEmail().withMessage('Email Wrong format')
], forgotpwd.forgotpwd)

module.exports = router