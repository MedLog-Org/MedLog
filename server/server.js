const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const loginRoutes = require('./routes/login')
const profileRoutes = require('./routes/profile')
const slotsRoutes = require('./routes/slots')
const appointmentRoutes = require('./routes/appointments')
const sessionRoutes = require('./routes/session')

const app = express();

const allowedOrigins = ['http://localhost:5173', 'https://med-log.vercel.app']; 

app.use(cors({
    origin:'http://localhost:5173',
    credentials: true
}));

app.use(bodyParser.json());
const PORT = 8000;

require('dotenv').config();
const URI = process.env.Local_URI;
// const URI = process.env.DB_URI;

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

// Routes
app.use(loginRoutes);       //  login/logout 
app.use(profileRoutes);     //  profile doc/user
app.use(slotsRoutes);       //  slots/doc /bookslot
app.use(appointmentRoutes)  //  appointment slots/bookslot
app.use(sessionRoutes)      //  Session

app.listen(PORT, () => {
    console.log(`App is listening on http://localhost:${PORT}`);
});
