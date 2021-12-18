const { body } = require('express-validator');
const User = require('../models/user');
const Dishes = require('../models/dishes');
exports.registerValidator = [
  body('email').isEmail().withMessage('Enter correct email').custom(async (value, { req }) => {
    try {
      let candidate = await User.findOne({ email: value });
      if (candidate) {
        return Promise.reject('Email has been already used')
      }
    } catch (e) {
      console.log(e)
    }
  }).normalizeEmail(),
  body('password', 'Password must have minimum 6 symbols').isLength({ min: 6, max: 20 }).isAlphanumeric().trim(),
  body('confirm').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password')
    }
    return true
  }).trim(),
  body('name').isLength({ min: 3 }).withMessage('The name mush have 3 letters minimum').trim()
]

exports.dishesValidator = [
  body('title').isLength({min:3}).withMessage('Minimum 3 letters').trim(),
  body('price').isNumeric().withMessage('Enter valid price'),
  body('image', 'Enter correct image URL').isURL()
]