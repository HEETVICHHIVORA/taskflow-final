const express=require('express');
const app=express();
const cors=require('cors');
const cookieparser=require('cookie-parser');
const dbconnect=require('./config/database');
const router=require('./routes/route');
require('dotenv').config();
const PORT=process.env.PORT;
app.use(cors());
app.use(express.json());
app.use(cookieparser());
app.use(router);



dbconnect();

app.listen(PORT,()=>{
    console.log(`APP IS RUNNING ON PORT ${PORT}`)
});
