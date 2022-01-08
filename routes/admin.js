const { Router } = require('express');
const router = Router();
const Dish = require('../models/dishes');
const { dishesValidator } = require('../utils/validators');
const { validationResult } = require('express-validator/check')
const auth = require('../middleware/auth');
const User = require('../models/user');
const ReservedList = require('../models/reservedList');
const Order = require('../models/orders');


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
router.get('/reservation', async (req, res) => {
  let userList = await User.find({ "reservation.details.isConfirm": "false" });
  console.log(userList);
  res.render('reservation', {
    title: "Reservation",
    waitingList: userList
  })
});
router.get('/order', async (req, res) => {
  let index=1;
  try {
     const orders = await Order.find();
     res.render('orders', {
        title: 'Orders',
        isOrder: true,
        index:index++,
        orders: orders.map(order => {
           return {
              ...order._doc,
              price: order.dishes.reduce((total, item) => {
                 return total += item.count * item.dish.price
              }, 0)
           }
        })
     })
  } catch (e) {
     console.log(e);
  }
})
router.post('/add/reservation', async (req, res) => {
  const { date, hour,tables} = req.body;
  let dateList = new ReservedList({
    date, hour:{value:hour, tables}
  })
  try {
    await dateList.save();
  } catch (e) {
    console.log(e);
  }
})
router.post('/add/dish', auth, dishesValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).render('addDish', {
      title: 'Add dish',
      error: errors.array()[0].msg,
      data: {
        title: req.body.title,
        category: req.body.category,
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
    category: req.body.category,
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


router.post('/orders', async (req, res) => {
  try {
     const user = await User.findById(req.body.userId).populate('cart.items.dishId')
     const dishes = user.cart.items.map(item => ({
        count: item.count,
        dish: { ...item.dishId._doc }
     }))
     const order = new Order({
        user: {
           name: user.name,
           email: user.email
        },
        dishes: dishes,
        isAccept:false
     })
     await order.save()
     await req.user.clearCart()
     res.redirect('/cart')
  } catch (e) {
     console.log(e);
  }
});

router.post('/orders/accepted', async(req, res)=>{
  try{
    let order=await Order.findByIdAndUpdate(req.body.orderId, {isAccept:true});
    await order.save();
    console.log(order);
    res.redirect('/admin/order')
  }catch(e){
    console.log(e);
  }
})


module.exports = router;