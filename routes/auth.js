const { Router } = require('express');
const { registerValidator } = require('../utils/validators');
const { body, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const User = require('../models/user');
const nodemailer = require('nodemailer');
const regEmail = require('../emails/registration');
const resetEmail = require('../emails/reset');
const keys = require('../keys');
const router = Router();
const smtpTransport = require('nodemailer-smtp-transport');

let transporter = nodemailer.createTransport(smtpTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: keys.EMAIL_FROM,
    pass: keys.EMAIL_FROM_PASS
  },
  tls: {
    rejectUnauthorized: false
  }
}));


router.get('/login', (req, res) => {
  res.render('auth/login', {
    title: 'Authorization',
    isLogin: true,
    registerError: req.flash('registerError'),
    loginError:req.flash('loginError')
  })
});

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login');
  })
});

router.get('/reset', (req, res) => {
  res.render('auth/reset', {
    title: 'Forgot password',
    error: req.flash('error')
  })
});

router.get('/password/:token', async (req, res) => {
  if (!req.params.token) {
    return res.redirect('/auth/login');
  }
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      resetTokenExp: { $gt: Date.now() }
    })
    if (!user) {
      return res.redirect('/auth/login')
    } else {
      res.render('auth/password', {
        title: "Update password",
        userId: user._id.toString(),
        token: req.params.token
      })
    }
  } catch (e) {
    console.log(e);
  }
})
router.post('/password', async (req, res) => {
  try {
    const user = await User.findOne({
      _id: req.body.userId,
      resetToken: req.body.token,
      resetTokenExp: { $gt: Date.now() }
    })
    if (user) {
      user.password = await bcrypt.hash(req.body.password, 10);
      user.resetToken = undefined;
      user.resetTokenExp = undefined;
      await user.save();
      res.redirect('/auth/login');
    } else {
      req.flash('loginError', 'Lifetime of token ended')
      res.redirect('/auth/login')
    }
  } catch (e) {
    console.log(e);
  }
})
router.post('/reset', (req, res) => {
  try {
    crypto.randomBytes(32, async (err, buffer) => {
      if (err) {
        req.flash('error', 'Something went wrong. Try later');
        return res.redirect('/auth/reset');
      }
      const token = buffer.toString('hex');
      const candidate = await User.findOne({ email: req.body.email });
      if (candidate) {
        candidate.resetToken = token;
        candidate.resetTokenExp = Date.now() + 60 * 60 * 1000;
        await candidate.save();
        console.log(candidate.email, token);
        await transporter.sendMail(resetEmail(candidate.email, token));
        res.redirect('/auth/login');
      } else {
        req.flash('error', 'There is not such email');
        res.redirect('/auth/reset')
      }
    })
  } catch (e) {
    console.log(e);
  }
})
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const candidate = await User.findOne({ email });
  if (candidate) {
    const isSame = await bcrypt.compare(password, candidate.password);
    if (isSame) {
      req.session.user = candidate;
      req.session.isAuthenticated = true;
      req.session.save(err => {
        if (err) throw err;
        res.redirect('/');
      })
    } else {
      req.flash('loginError', 'Password is incorect');
      res.redirect('/auth/login');
    }
  } else {
    req.flash('loginError', 'There is not such user');
    res.redirect('/auth/login');
  }
})

router.post('/register', registerValidator, async (req, res) => {
  const { name, email, password } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    req.flash('registerError', errors.array()[0].msg)
    return res.status(422).redirect('/auth/login#register')
  }
  const hashPassword = await bcrypt.hash(password, 10)
  const user = new User({
    name, email, password: hashPassword,
    cart: { items: [] }, reservation:{details:[]}
  })
  await user.save();
  await transporter.sendMail(regEmail(email));
  res.redirect('/auth/login#login')
})

module.exports = router;