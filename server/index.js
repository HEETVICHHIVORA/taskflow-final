const express=require('express');
const app=express();
const cors=require('cors');
const cookieparser=require('cookie-parser');
const dbconnect=require('./config/database');
const router=require('./routes/route');
require('dotenv').config();
const bodyParser = require('body-parser');
const PORT=process.env.PORT;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));


app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use(express.json());
app.use(cookieparser());
app.use(router);


  
dbconnect();

app.listen(PORT,()=>{
    console.log(`APP IS RUNNING ON PORT ${PORT}`)
});
