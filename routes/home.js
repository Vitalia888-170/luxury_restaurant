const { Router } = require('express');
const Dish = require('../models/dishes');

const router = Router();
router.get('/', async (req, res) => {
  const dishes = await Dish.find().limit(6);
  const topDishes = await Dish.find({ isSpecial: true });
  res.render('home', {
    title: 'Home',
    dishes,
    topDishes
  })
})


module.exports = router;