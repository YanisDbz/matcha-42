const express = require('express')
const activateController = require('../controllers/activateUser')
const deleteUserImage = require('../controllers/deleteUserImg')
const getDataFromCookie = require('../controllers/cookieData')
const getUserImage = require('../controllers/userImage')
const getUserMatch = require('../controllers/getUserMatch')
const {getTagData, addTag, removeTag, getMatchTagData} = require('../controllers/tagData')
const verify = require('../controllers/verifyUser')
const editUser = require('../controllers/Edit/EditUser')
const matchLike = require('../controllers/matchLike')
const matchUnlike = require('../controllers/matchUnlike')
const checkMatchLike = require('../controllers/checkMatchLike')
const userSendPos = require('../controllers/userPos')
const userHistory = require('../controllers/userHistory')
const userData = require('../controllers/userData')
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

router.post('/user/activetag', getTagData)
router.post('/match/like', matchLike)
router.post('/match/unlike', matchUnlike)
router.post('/checklike', checkMatchLike)
router.post('/match/tags', getMatchTagData)
router.post('/getmatch', getUserMatch)
router.post('/user/add/tag', addTag)
router.post('/user/delete/tag', removeTag)
router.post('/user/getimage', getUserImage)
router.post('/user/edit/:slug', editUser)
router.post('/user/delete/image', deleteUserImage)
router.post('/sendpos', userSendPos)
router.post('/gethistory', userHistory)
router.post('/user/data', userData)
module.exports = router