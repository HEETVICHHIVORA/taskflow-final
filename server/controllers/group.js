const User = require("../models/user");
const groupschema = require("../models/group");
const {taskschema}=require("../models/task");



  exports.getGroups=async(req,res)=>{
    try{

        const user=req.user;
        const groups=user.group;

        return res.json({
            success:true,
            groups:groups
        })
    }
    catch(e){
        console.log(e);
    }
  }


  
  exports.getallusers=async(req,res)=>{
    try{
      const users = await User.find({}, 'name'); 
      // console.log("ALL : " , users);
      // console.log("REQ : " ,req.user.name);

      const filteredUsers=users.filter(user=>user.name!==req.user.name);
      return res.status(200).json({
        success:true,
        message:"All users fetched successully",
        allusers:filteredUsers
      })
    }
    catch(e){
      console.log(e);
    }
  }

  exports.createNewTeam=async(req,res)=>{
    try{
      const teamAdmin=req.user;
      const {members,teamName}=req.body;

      if(!teamName){
        return res.json({
          success:false,
          message:"Group Name is required"
        })
      }

      const alreadyExist = await groupschema.findOne({ name: new RegExp(`^${teamName}$`, 'i') });

      
      if(alreadyExist){
        return res.json({
          success:false,
          message:"Already exist group with given name"
        })
      }

      const newTeam=await groupschema.create({
        name:teamName,
        admin:teamAdmin._id
      })
      await User.findByIdAndUpdate(teamAdmin._id,{$push:{group:newTeam._id}},{new:true});
      await groupschema.findByIdAndUpdate(newTeam._id,{$push:{members:teamAdmin._id}},{new:true});

      for(let i=0;i<members.length;i++){
        const member=await User.findByIdAndUpdate(members[i].id,{$push:{group:newTeam._id}},{new:true});
        await groupschema.findByIdAndUpdate(newTeam._id,{$push:{members:member._id}},{new:true});
      }

      return res.json({
        success:true,
        message:"New Team Created Successfully"
      })
    }
    catch(e){
      res.status(500).json({
        success: false,
        message: "Failed to create new Group",
        error: e.message
    });

    return res.status(200).json({
      Name:"Paras Waghela",
      role:"Full Stack Developer"
    })
  
  }
  }

  exports.searchGroups=async(req,res)=>{
    try{

        const {prefix}=req.body;
        const user=req.user;

        const groups=user.group;

        const filteredGroups = groups.filter(group=> group.name.toLowerCase().includes(prefix.toLowerCase()));
        // console.log("Groups for " , prefix ," : " , filteredGroups);

        return res.json({
          success:true,
          message:"Successfully extracted searched groups",
          groups:filteredGroups
        })
    }
    catch(e){
        console.log(e);
    }
  }
  exports.deletechat =async(req,res)=>{
    try {
       const {taskid,groupname}=req.body;
       const result = await taskschema.findByIdAndDelete(taskid);
       const r2 = await groupschema.findOneAndUpdate({name:groupname},{$pull:{tasks:taskid}},{new:true});
    
       return res.json({
        success:true,
        message:" deleted",
      })
    }
    catch{
       console.log(e);
    }
  }
  // exports.sendToGroupPlaintext=async(req,res)=>{
  //   try{
      
  //     const {groupName, filename,contentofpost}=req.body;
  //     const userid=req.user._id;



  //   }
  //   catch(e){
  //     res.status(500).json({
  //         success: false,
  //         message: "Failed to send text",
  //         error: e.message
  //     });
  //   }
  // }

  exports.sendToGroup=async(req,res)=>{
    try{
      const {groupName,audioBlob, filename, mimeType,reqtype,contentofpost}=req.body;

      const user=req.user;

      if(reqtype=='audio'){
        const audioBuffer = Buffer.from(audioBlob, 'base64');

        const audioDoc = new taskschema({
            filename: filename,
            mimeType: mimeType,
            size: audioBuffer.length,
            audioData: audioBuffer,
            createdBy:user._id
        });
  
        const savedTask=await audioDoc.save();
  
        await groupschema.findOneAndUpdate({name:groupName},{$push:{tasks:savedTask._id}},{new:true});
  
        return res.status(200).json({
          success:true,
          message:"Audio added successfully"
        })
      }
      else{
        const textdoc = new taskschema({
          filename: filename,
          contentofpost:contentofpost,
          createdBy:user._id
      });

       const savedTask=await textdoc.save();
      await groupschema.findOneAndUpdate({name:groupName},{$push:{tasks:savedTask._id}},{new:true});

      return res.status(200).json({
        success:true,
        message:"Text added successfully"
      })
      }
    }
    catch(e){
      res.status(500).json({
          success: false,
          message: "Failed to send audio",
          error: e.message
      });
    }
  }

  exports.getAllTasks=async(req,res)=>{
    try{
      const groupName = req.query.name;
      const group = await groupschema.findOne({ name: groupName })
       .populate({
    path: 'tasks', // First populate the 'tasks'
    populate: { 
      path: 'createdBy', // Then populate the 'createdBy' field inside 'tasks'
      select: 'name' // Only fetch the 'name' field of the user
    }
  });


  const audioDataArray = group.tasks.map(audioDoc => ({
    filename: audioDoc.filename,
    mimeType: audioDoc.mimeType,
    base64Audio: audioDoc.audioData ? audioDoc.audioData.toString('base64') : null, // Check if audioData exists before converting
    sender: audioDoc.createdBy.name, // Optional chaining to handle missing createdBy
    content: audioDoc.contentofpost,
    taskid:audioDoc._id,  // Default to null if contentofpost doesn't exist
  }));
  console.log(audioDataArray);


      return res.json({
        success:true,
        message:"All tasks are fetched",
        audioData: audioDataArray
      })
    }
    catch(e){
      res.status(500).json({
        success: false,
        message: "Failed to fetch tasks",
        error: e.message
    });
    }
  }