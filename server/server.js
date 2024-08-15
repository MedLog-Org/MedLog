const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoStore = require('connect-mongo');

// Routes
const loginRoutes = require('./routes/login')
const profileRoutes = require('./routes/profile')
const slotsRoutes = require('./routes/slots')
const appointmentRoutes = require('./routes/appointments')
const sessionRoutes = require('./routes/session')

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials:true
}));
app.use(bodyParser.json());
const PORT = 8000;

require('dotenv').config();
const URI = process.env.Local_URI;

mongoose.connect(URI)
  .then(() => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log("DB Not Connected", err);
  });

const store = MongoStore.create({
  mongoUrl: URI,
  collectionName: 'sessions',
  ttl: 24 * 60 * 60
});
app.use(session({
  secret: 'secret_key',
  store: store,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000, httpOnly: true},
}));

//  login/logout Routes
app.use(loginRoutes);
//  profile doc/user Routes
app.use(profileRoutes);
//  slots/doc /bookslot Routes
app.use(slotsRoutes);
//  appointment slots/bookslot Routes
app.use(appointmentRoutes);
//  session Routes
app.use(sessionRoutes);

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});
