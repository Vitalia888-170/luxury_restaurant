const express = require('express');
const path = require('path');
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongodb-session')(session);
const flash = require('connect-flash');
const csrf = require('csurf');
const helmet = require('helmet');
const keys = require('./keys');
const varMiddleware = require('./middleware/variables');
const userMiddleware = require('./middleware/user');
const homeRouter = require('./routes/home');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');
const reservationRouter=require('./routes/reservation');


const app = express();
const store = new MongoStore({
  collection: 'sessions',
  uri: keys.MONGODB_URI
})
app.engine('handlebars', expressHandlebars({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

app.set('view engine', 'handlebars');
app.set('views', 'views');
app.use(express.static(path.join(__dirname, 'public')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: keys.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store
}));

        
app.use(csrf());
app.use(flash());
// app.use( helmet({
//   contentSecurityPolicy: {
//      directives: {
//         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//         "img-src": ["'self'", "https:"],
//         "script-src-elem": ["'self'", "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js", "'unsafe-inline'" ]
//      },
//   },
//  })
//  );
//  app.use( helmet({
//   contentSecurityPolicy: {
//      directives: {
//         ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//         "img-src": ["'self'", "https:"],
//         "script-src-elem": ["'self'", "https://cdnjs.cloudflare.com/ajax/libs/fabric.js/1.7.11/fabric.min.js", "'unsafe-inline'" ],
//      },
//   },
//  })
//  );
app.use(varMiddleware);
app.use(userMiddleware);
app.use('/', homeRouter);
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/reservation', reservationRouter);

const PORT = 3000;


async function start() {
  try {
    await mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true })
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start();