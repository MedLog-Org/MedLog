const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoStore = require('connect-mongo');

//  Routes
const user_collection = require("./models/user");
const doc_collection = require("./models/doctor");
const loginRoutes = require('./routes/login')
const profileRoutes = require('./routes/profile')
const slotsRoutes = require('./routes/slots')
const appointmentRoutes = require('./routes/appointments')


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

app.use(loginRoutes);       //  login/logout Routes
app.use(profileRoutes);     //  profile doc/user Routes
app.use(slotsRoutes);       //  slots/doc /bookslot
app.use(appointmentRoutes)  //  appointment slots/bookslot

app.get('/', async (req, res) => {
    try {
        if (req.session.loggedIn) {
          console.log(req.session);
          let collection;
          if(req.session.userType=='patient')
            collection=user_collection;
          else if(req.session.userType=='doctor')
            collection=doc_collection;
          else
            console.log(req.session.userType);

          const user = await collection.findOne({ _id: req.session.userId });
          console.log(user);
          res.json({
            isLoggedIn: true,
            user: user
          });
      } 
      else {
          res.json({
            isLoggedIn: false,
            message: "User is not logged in"
          });
      }
    } 
    catch(error){
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
