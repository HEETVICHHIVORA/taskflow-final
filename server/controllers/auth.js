const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const groupschema = require("../models/group");
const taskschema = require("../models/task");
const commentschema = require("../models/comment");

const { Admin } = require("mongodb");
const group = require("../models/group");


exports.signup = async (req, res) => {
  const { name, email, password, role ,groupid} = req.body;
  try {
    if (!name || !email || !password || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "This email id is already registered",
      });
    } 

    let hashedPass;
    try{
        hashedPass=await bcrypt.hash(password,10);
    }
    catch(e){
        return res.status(500).json({
            success:false,
            message:"Error occured during hashing"
        })
    }

    const team=groupid;

      const newUser = new User({ name, email, password:hashedPass, role ,group:team});
      await newUser.save();
      return res.status(200).json({
        success: true,
        message: "Account Created Successfully, Please login to continue",
      });
    
  } catch (error) {
    console.error("Error in signup:", error);
    return res.status(500).json("fail");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if(!email || !password){
      return res.status(333).json({
          success:false,
          message:"All fields are required"
      })
  }


    const user = await User.findOne({ email });
    if(!user){
        return res.status(404).json({
            success:false,
            message:"Email id is not registered"
        })
    }

    if(await bcrypt.compare(password,user.password)){
      const payload={
          id:user._id,
          name:user.name,
          email:user.email
      }

      let token=jwt.sign(payload,process.env.JWT_SECRET);

      const options={
          expires:new Date(Date.now()+3*24*60*60*1000),
          httpOnly:true,
      }
      return res.cookie('token',token,options).status(200).json({
          success:true,
          message:"Login Successful"
      })
  }
  else{
      return res.status(400).json({
          success:false,
          message:"Incorrect Password"
      })
  }

  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json("fail");
  }
};

