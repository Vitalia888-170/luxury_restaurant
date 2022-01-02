const { Router } = require('express');
const router = Router();
const Dish = require('../models/dishes');

router.get('/:category', async (req, res) => {
    let categoryItem = req.params.category;
    let dishesAll = await Dish.find();
    let dishesCategory = dishesAll.filter(item => item.category === categoryItem);
    console.log(dishesAll);
    res.render('menu', {
        title: 'Menu',
        dishes: categoryItem === 'all' ? dishesAll : dishesCategory,
    })
})

router.get('/dishes/:id', async (req, res) => {
    let currentDish = await Dish.findById(req.params.id);
    console.log(currentDish);
    res.render('dish', {
        title: `${currentDish.title}`,
        currentDish
    })
})
module.exports = router;