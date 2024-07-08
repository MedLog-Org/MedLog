const express = require('express');
const app = express();
const PORT = 5000;
app.get('/',(req,res)=>{
    res.send('Server is running');
});
app.listen(PORT,()=>{
    console.log(`App is listening on http://localhost:${PORT}`);
})