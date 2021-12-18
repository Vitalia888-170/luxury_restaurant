const { Router } = require('express');
const router = Router();
const Dish = require('../models/dishes');
const { dishesValidator } = require('../utils/validators');
const { validationResult } = require('express-validator/check')
const auth = require('../middleware/auth');

router.get('/dish', (req, res) => {
  res.render('addDish', {
    title: 'Add dish'
  })
});

router.get('/top', async (req, res) => {
  const dishes = await Dish.find();
  res.render('topDishes', {
    title: 'Top dishes',
    dishes
  })
})

router.post('/add/dish', auth, dishesValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('addDish', {
      title: 'Add dish',
      error: errors.array()[0].msg,
      data: {
        title: req.body.title,
        category:req.body.category,
        description: req.body.description,
        image: req.body.imageUrl,
        price: req.body.price,
        isSpecial: req.body.isSpecial,
      }
    })
  }
  const special = req.body.isSpecial === 'on' ? true : false;
  console.log(req.body.category);
  const dishes = new Dish({
    title: req.body.title,
    category:req.body.category,
    description: req.body.description,
    image: req.body.image,
    price: req.body.price,
    isSpecial: special,
  });
  try {
    await dishes.save();
    res.redirect('/');
  } catch (e) {
    console.log(e);
  }
})
router.post('/top/select', async (req, res) => {
  try {
    const selectedDishes = req.body.select;
    const updatedDishes = await Dish.updateMany({ title: { $in: selectedDishes } }, { $set: { isSpecial: true } });
    res.redirect('/');
  } catch (e) {
    console.log(e)
  }
});
router.post('/top/delete', async (req, res) => {
  const modifyStatus = await Dish.updateMany({}, { $set: { isSpecial: false } });
  res.redirect('/');
})
module.exports = router;