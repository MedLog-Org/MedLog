const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors=require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());
const PORT = 8000;

require('dotenv').config();
const URI = process.env.DB_URI;
const connect=mongoose.connect(URI);
connect.then(()=>{
    console.log("DB Connected");
})
.catch((err)=>{
    console.log("DB Not Connected",err);
})
app.get('/',(req,res)=>{
    res.send('Server is running');
});
app.post('/login',(req,res) =>{
    console.log(req.body);
    res.json({ success: true });
});
app.listen(PORT,()=>{
    console.log(`App is listening on http://localhost:${PORT}`);
})