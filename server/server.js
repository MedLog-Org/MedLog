const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const user_collection = require("./models/user");
const doc_collection = require("./models/doctor")

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
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
  ttl: 24 * 60 * 60
});
app.use(session({
  secret: 'secret_key',
  store: store,
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000, httpOnly: true},
}));

app.post('/login', async (req, res) => {
  let data;
  let collection;
  if(req.body.userType=='patient'){
    data = {
      email: req.body.email,
      password: req.body.password,
      name:'',
      sex:'',
      dob:'',
      bloodGroup:'',
      photo:'',
    };
    collection = user_collection;
  }
  else if(req.body.userType == 'doctor'){
      data = {
      email: req.body.email,
      password: req.body.password,
      phone:'',
      specaility:'',
      photo:'',
    };
    collection = doc_collection;
  }

  console.log(req.body);
  try {
    const user = await collection.findOne({ email: data.email });
    if (user) {
      if (user.password === data.password) {
        console.log('User Found', user);
        req.session.userId = user._id;
        req.session.loggedIn = true;
        res.json({ success: true, message: "Successfully Login"});
      } else {
        res.json({ success: false, message: "Wrong Password" });
      }
    } else {
      const newUser = new collection(data);
      await newUser.save();
      console.log('New User Created', newUser);
      req.session.userId = newUser._id;
      req.session.loggedIn = true;
      res.json({ success: true, message: "New User Registered and Logged In"});
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

app.post('/logout', async (req, res) => {
  try {
    req.session.destroy();
    console.log("logout success")
    res.json({ success: true, message: "Successfully Logged Out" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error logging out" });
  }
});

app.post('/user/profile', async (req, res) => {
  const { id, name, email, sex, dob, bloodGroup } = req.body;
  try {
    const user = await user_collection.findByIdAndUpdate(id, {
      $set: {
        name: name || undefined, 
        email: email || undefined,
        sex: sex || undefined,
        dob: dob || undefined,
        bloodGroup: bloodGroup || undefined
      }
    }, { new: true });

    if (!user) {
      res.status(404).json({success:false, message: 'User not found' });
    } else {
      res.json({ success:true,message: 'User profile updated successfully' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating user profile' });
  }
});

app.get('/', async (req, res) => {
  try {
    if (req.session.loggedIn) {
      console.log(req.session);
      const user = await user_collection.findOne({ _id: req.session.userId });
      console.log(user);
      res.json({
        isLoggedIn: true,
        user: user
      });
    } else {
      res.json({
        isLoggedIn: false,
        message: "User is not logged in"
      });
    }
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`App is listening on http://localhost:${PORT}`);
});
