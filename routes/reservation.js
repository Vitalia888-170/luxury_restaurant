const { Router } = require('express');
const reservedList = require('../models/reservedList');

const router = Router();
router.get('/', (req, res) => {
  res.render('booking', {
    title: 'Reservation'
  })
})
router.post('/', async (req, res) => {
  const {guests, date, hours} = req.body;
 const guestsNumber=Number(guests);
 await req.user.makeReservation(date, hours, guestsNumber)
 res.redirect('/reservation');
})

module.exports = router;