
const express=require('express');
const cors=require('cors');
const app=express();

//importing routes
const router=require('./routes/routes');

//middleware for json
app.use(express.json());

//Allowing  cors permissions
app.use(cors());

//Using routes in app
app.use('/',router);

app.listen(5000,()=>{
    console.log('Server Running On : localhost:5000');
});