const {Router}=require('express');
const router=Router();
const Dish = require('../models/dishes');
function mapCartItems(cart) {
    return cart.items.map(item => ({
       ...item.dishId._doc,
       id: item.dishId.id,
       count: item.count
    }))
 }
 
 function computePrice(dishes) {
    return dishes.reduce((total, dish) => {
       return total += dish.price * dish.count
    }, 0)
 }
 router.get('/', async (req, res) => {
    const user = await req.user.populate('cart.items.dishId')
    const dishes = mapCartItems(user.cart);
    res.render('cart', {
       title: 'Cart',
       isCard: true,
       dishes: dishes,
       price: computePrice(dishes)
    })
 })
router.post('/add', async(req, res)=>{
    const dish = await Dish.findById(req.body.id);
    await req.user.addToCart(dish);
    res.redirect('/cart');
})

router.delete('/remove/:id', async (req, res) => {
    await req.user.removeFromCart(req.params.id)
    const user = await req.user.populate('cart.items.dishId')
    const dishes = mapCartItems(user.cart);
    const cart = {
       dishes, price: computePrice(dishes)
    }
    res.status(200).json(cart);
 })
module.exports=router;