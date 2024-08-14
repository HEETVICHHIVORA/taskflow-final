const express=require('express');
const router=express.Router();

const {signup,login, createteam,createtask,createcomment}=require('../controllers/auth');
const {auth}=require('../middlewares/auth');

router.post('/signup',signup);
router.post('/login',login);
router.post('/createteam',createteam)
router.post('/createtask',createtask)
router.post("/createcomment",createcomment)

router.get('/alreadyloggedin',auth,(req,res)=>{
    return res.json({
        success:true,
        message:"Logged in successfully"
    })
})


module.exports=router;