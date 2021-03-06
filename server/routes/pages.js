const express = require('express')
const activateController = require('../controllers/activateUser')
const deleteUserImage = require('../controllers/deleteUserImg')
const getDataFromCookie = require('../controllers/cookieData')
const getUserImage = require('../controllers/userImage')
const getMatchImage = require('../controllers/matchImage')
const getUserMatch = require('../controllers/getUserMatch')
const {getTagData, addTag, removeTag, getMatchTagData} = require('../controllers/tagData')
const verify = require('../controllers/verifyUser')
const editUser = require('../controllers/Edit/EditUser')
const matchLike = require('../controllers/matchLike')
const matchUnlike = require('../controllers/matchUnlike')
const checkMatchLike = require('../controllers/checkMatchLike')
const userSendPos = require('../controllers/userPos')
const userHistoryLike = require('../controllers/userHistoryLike')
const userHistoryBlock = require('../controllers/userHistoryBlock')
const userData = require('../controllers/userData')
const router = express.Router()
const { check } = require('express-validator');
const forgotpwd = require('../controllers/forgotpwd')
const matchBlock = require("../controllers/matchBlock")
const matchUnblock = require("../controllers/matchUnBlock")
const {notifUser, notifUserRead} = require("../controllers/NotifUser")
const {chatContact, chatMessage} = require("../controllers/Chat")


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
router.post('/match/block', matchBlock)
router.post('/match/unblock', matchUnblock)
router.post('/match/image', getMatchImage)
router.post('/checklike', checkMatchLike)
router.post('/match/tags', getMatchTagData)
router.post('/getmatch', getUserMatch)
router.post('/user/add/tag', addTag)
router.post('/user/delete/tag', removeTag)
router.post('/user/getimage', getUserImage)
router.post('/user/edit/:slug', editUser)
router.post('/user/delete/image', deleteUserImage)
router.post('/sendpos', userSendPos)
router.post('/history/like', userHistoryLike)
router.post('/history/block', userHistoryBlock)
router.post('/user/data', userData)
router.post('/user/totalnotif', notifUser)
router.post('/user/notif/read', notifUserRead)
router.post('/chat/getcontact', chatContact)
router.post('/chat/getmessage', chatMessage)
module.exports = router