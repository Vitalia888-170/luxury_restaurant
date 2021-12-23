const { Router } = require('express');
const Reservation = require('../models/reservation');

const router = Router();
router.get('/', (req, res) => {
  res.render('booking', {
    title: 'Reservation'
  })
})
router.post('/', async (req, res) => {
  const { name, email, guests, phone, date, hours } = req.body;
  const booking = new Reservation({ name, email, guests, phone, date, hours });
  try {
    await booking.save();
    res.redirect('/reservation');
  } catch (e) {
    console.log(e);
  }
})

module.exports = router;