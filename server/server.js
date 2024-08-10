const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoStore = require('connect-mongo');
const user_collection = require("./models/user");
const doc_collection = require("./models/doctor");
const slot_collection = require("./models/slot")

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

app.post('/login', async (req, res) => {
  console.log("getting this");
  let data;
  let collection;
  console.log(`user: ${req.body.userType}`);
  if(req.body.userType=='patient'){
    data = {
      email: req.body.email,
      password: req.body.password,
      userType: req.body.userType,
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
      userType:req.body.userType,
      phone:'',
      speciality:'',
      photo:'',
      roomNumber:'',
      slotId:'',
    };
    collection = doc_collection;
  }

  try {
    const user = await collection.findOne({ email: data.email });
    if (user) {
      if (user.password === data.password) {
        console.log('User Found', user);
        req.session.userId = user._id;
        req.session.userType = user.userType;
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
      req.session.userType = newUser.userType;
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

app.post('/doc/profile', async (req, res) => {
  const { id, name, email, phone, speciality } = req.body;
  try {
    const user = await doc_collection.findByIdAndUpdate(id, {
      $set: {
        name: name || undefined, 
        email: email || undefined,
        phone: phone || undefined,
        speciality: speciality || undefined,
        
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


app.post('/slots',async( req, res) =>{
  console.log(req.body.speciality);
  try{
    const slots = await slot_collection.find({speciality:req.body.speciality});
    if(slots){
      const slotIds = slots.map(slot => slot.slotId);
      res.json({ success:true,message: 'List Found',slotIds });
    }
    else{
      res.json({ success:false,message: 'List Not Found' });
    }
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }

});
app.post('/doc/bookslot', async(req,res) => {
  console.log(req.body);
  try{      
      let room = 100;
      for(let i = 101; i <= 120; i++) {
        const slot = await slot_collection.findOne({slotId:req.body.slotId,speciality:req.body.speciality,roomNumber:i});
        console.log(slot);
        console.log(`Room number : ${room}`);
        if (slot==null) {
          room = i;
          console.log(`Room number : ${room}`);
          break;
        }
      }

      const data = {
        slotId:req.body.slotId,
        speciality: req.body.speciality,
        docId: req.body.docId,
        roomNumber: room,
        slots:[
          { time: "", status: false, patientId: "" },
          { time: "", status: false, patientId: "" },
          { time: "", status: false, patientId: "" },
          { time: "", status: false, patientId: "" },
          { time: "", status: false, patientId: "" },
          { time: "", status: false, patientId: "" },
        ],
      };
      const timeMap = {
        "1": ["08-09","09-10","10-11","11-12","12-13","13-14"],
        "2": ["14-15","15-16","16-17","17-18","18-19","19-20"],
      }
      const timeSlots = timeMap[req.body.slotId];
      data.slots.forEach((slot, index) => {
        slot.time = timeSlots[index];
      });

      console.log(data);
      const doc = await doc_collection.findByIdAndUpdate(req.body.docId, {
        $set: {
          roomNumber:room,
          slotId:req.body.slotId
        }
      }, { new: true });

      const newSlot = new slot_collection(data);
      newSlot.save();
      res.json({ success:true, message: 'Slot Booked',newSlot});

  }
  catch(error){
    console.log(error)
    res.status(500).json({ message: 'Error in slot booking' });
  }
});


app.post('/appointment/book', async (req,res) =>{
  console.log(req.body);
  try{
    const slots = await slot_collection.find({speciality:req.body.speciality});
    const availableSlots = [];
    const slotTimeSet = new Set();

    for (const slot of slots) {
      const docId = slot.docId;
      for (const timeSlot of slot.slots) {
        if (!timeSlot.status) {
          const slotTime = timeSlot.time;
          if (!slotTimeSet.has(slotTime)) {
            availableSlots.push({ slotTime, docId });
            slotTimeSet.add(slotTime);
          }
        }
      }
    }
    
    res.send({ availableSlots });
  }
  catch(error){
    console.log(error)
    res.status(500).json({ message: 'Internal server error' });
  }
})

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
