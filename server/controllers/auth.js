const User=require('../models/user');
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const groupschema = require('../models/group');
const taskschema = require ('../models/task');
const commentschema = require('../models/comment');

const { Admin } = require('mongodb');

exports.signup=async (req,res)=>{
    const {name, email, password, role } = req.body;
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        res.json("exist");
      } else {
        const newUser = new User({ name ,email, password, role});
        await newUser.save();
        res.json("notexist");
      }
    } catch (error) {
      console.error("Error in signup:", error);
      res.status(500).json("fail");
    }
}

exports.login=async(req,res)=>{
    try {
      const {email,password}=req.body;
        const user = await User.findOne({ email });
        if (user) {
          res.json("exist");
        } else {
          res.json("notexist");
        }
      } catch (error) {
        console.error("Error in login:", error);
        res.status(500).json("fail");
      }
}

exports.createteam=async(req,res)=>{
  try {
    const {name,email,members,teamname}=req.body;
      const user = await User.findOne({ email });

      if(!user){
        return res.status(404).json({
          success:false,
          message:"User Not Found"
        })
      }


    const team = await new groupschema({
       name:teamname,
       admin: name,
       members:members    
    })

    await team.save();
    return res.status(200).json({
      success:true,
      message:"Team Added Successfully",
      team
    })
          
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json("fail");
    }
}

exports.createtask=async(req,res)=>{
     try{
      const {email,description,groupId,audiourl,createdby}=req.body;
      const user = await User.findOne({ email });

      if(!user){
        return res.status(404).json({
          success:false,
          message:"User Not Found"
        })
      }


    const task = await new taskschema({
       description:description,
       audioUrl:audiourl,
       createdBy:createdby,
       groupId:groupId
    })

    await task.save();
    return res.status(200).json({
      success:true,
      message:"Task added",
      task
    })
         
     }
     catch (error){
        console.log(error)
     }
}
exports.createcomment=async(req,res)=>{
  try{
   const {email,content,createdBy,taskId}=req.body;
   const user = await User.findOne({ email });

   if(!user){
     return res.status(404).json({
       success:false,
       message:"User Not Found"
     })
   }


 const comment = await new commentschema({
    content,
    createdBy,
    taskId
 })

 await comment.save();
 return res.status(200).json({
   success:true,
   message:"comment added",
   comment
 })
      
  }
  catch (error){
     console.log(error)
  }
}