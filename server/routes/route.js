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

router.get('/logout',(req,res)=>{
    try{
        return res.clearCookie('token').json({
            success: true,
            message: "User Logged Out Successfully"
        });
        
    }
    catch(e){
        return res.json({
            success:false,
            message:"Errors while logging out"
        })
    }
})


module.exports=router;