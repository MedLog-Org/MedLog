const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoStore = require('connect-mongo');  // Import connect-mongo
const user_collection = require("./models/user");

const app = express();

app.use(cors({
  credentials:true
}));
app.use(bodyParser.json());
const PORT = 8000;

require('dotenv').config();
const URI = process.env.DB_URI;

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
  ttl: 14 * 24 * 60 * 60
});
app.use(session({
  secret: 'secret_key',
  store: store,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000, httpOnly: true},
}));

app.post('/login', async (req, res) => {
  const data = {
    email: req.body.email,
    password: req.body.password
  };
  try {
    const user = await user_collection.findOne({ email: data.email });
    if (user) {
      if (user.password === data.password) {
        console.log('User Found', user);
        req.session.userId = user._id;
        req.session.loggedIn = true;
        console.log(req.session);
        res.json({ success: true, message: "Successfully Login", user });
      } else {
        res.json({ success: false, message: "Wrong Password" });
      }
    } else {
      const newUser = new user_collection(data);
      await newUser.save();
      console.log('New User Created', newUser);
      req.session.userId = newUser._id;
      req.session.loggedIn = true;
      console.log(req.session);
      res.json({ success: true, message: "New User Registered and Logged In", newUser });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  console.log(req.session.userId);
  if (req.session.loggedIn) {
    console.log(req.session);
    res.json({
      success: true,
      message: "User is logged in",
      userId: req.session.userId,
      loggedIn: req.session.loggedIn
    });
  } else {
    res.json({
      success: false,
      message: "User is not logged in"
    });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
