const express = require('express')
const activateController = require('../controllers/activateUser')
const deleteUserImage = require('../controllers/deleteUserImg')
const getDataFromCookie = require('../controllers/cookieData')
const getUserImage = require('../controllers/userImage')
const getTagData = require('../controllers/tagData')
const verify = require('../controllers/verifyUser')
const editUser = require('../controllers/Edit/EditUser')
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
router.post('/verify',[
    check('date').notEmpty().withMessage('Date Required').isDate().withMessage('Date Wrong Format'),
    check('orientation').notEmpty().withMessage('Orientation required'),
    check('gender').notEmpty().withMessage('Gender Required')
], verify)

router.post('/user/tag', getTagData)
router.post('/user/getimage', getUserImage)
router.post('/user/edit/:slug', editUser)
router.post('/user/delete/image', deleteUserImage)

module.exports = router