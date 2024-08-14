const express=require('express');
const router=express.Router();

const {signup,login, createteam,createtask,createcomment}=require('../controllers/auth');

router.post('/signup',signup);
router.post('/login',login);
router.post('/createteam',createteam)
router.post('/createtask',createtask)
router.post("/createcomment",createcomment)


module.exports=router;