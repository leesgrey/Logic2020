const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const keys = require('./config/keys');
require('./models/Question');
require('./services/passport');

mongoose.Promise = global.Promise;
mongoose.connect(keys.MONGODB_URI, { useNewUrlParser: true });

// Create a new Express application.
const app = express();

// app.use(cookieSession({
//     name: 'session',
//     keys: ['123']
// }));

// app.use(cookieParser());

// Initialize Passport and restore authentication state, if any, from the
// session.
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);


if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);