const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = 5000;

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
app.listen(PORT,()=>{
    console.log(`App is listening on http://localhost:${PORT}`);
})