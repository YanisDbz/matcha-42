const express = require('express')
const activateController = require('../controllers/activateUser')
const getDataFromCookie = require('../controllers/cookieData')
const router = express.Router()
const { check } = require('express-validator');
const forgotpwd = require('../controllers/forgotpwd')

router.post('/activate', activateController.activate);
router.post('/forgot-pwd', [
    check('email').notEmpty().withMessage('Email required')
    .isEmail().withMessage('Email Wrong format')
], forgotpwd.forgotpwd)

router.post('/changepwd', [
    check('password').notEmpty().withMessage('Password required'),
    check('passwordConfirm').notEmpty().withMessage('Password Confirm required')
], forgotpwd.changepwd)
router.get('/checkchangepwd', forgotpwd.checkChangePwd)
router.post('/getdatafromcookie', getDataFromCookie)
module.exports = router