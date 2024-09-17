const express=require('express');
const router=express.Router();

const {signup,login}=require('../controllers/auth');
const {getGroups,sendToGroup,getAllTasks,getallusers,createNewTeam,searchGroups, deletechat}=require('../controllers/group');
const {auth}=require('../middlewares/auth');


router.post('/signup',signup);
router.post('/login',login);



router.get('/getteams',auth,getGroups);
router.post('/sendToGroup',auth,sendToGroup);
router.post('/deletechat',auth,deletechat);
// router.post('/sendToGroupPlaintext',auth,sendToGroupPlaintext);
router.get('/getAllTasks',getAllTasks);
router.post('/searchGroups',auth,searchGroups);

router.get('/getallusers',auth,getallusers);

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

router.get('/getRole',auth,(req,res)=>{
    return res.json({
        success:true,
        role:req.user.role,
        name:req.user.name
    })
})

router.post('/createNewTeam',auth,createNewTeam);
module.exports=router;