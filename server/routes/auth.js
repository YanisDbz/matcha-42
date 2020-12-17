const express = require('express')
const authController = require('../controllers/auth')
const { check } = require('express-validator');

const router = express.Router()

router.post('/register',[
  check('firstname').notEmpty().withMessage('Frist Name is required'),
  check('lastname').notEmpty().withMessage('Last NAme is required'),
  check('email').isEmail().withMessage('Email Invalid Format'),
  check('password').notEmpty().withMessage('Password is required'),
],
authController.register)
router.post('/login', [
  check('email').notEmpty().withMessage('Email is required').isEmail().withMessage('Wrong Email format'),
  check('password').notEmpty().withMessage('Password is required')
],
authController.login)
router.post('/logout', authController.logout)
module.exports = router