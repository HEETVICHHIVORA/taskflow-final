const User = require("../models/user");
const groupschema = require("../models/group");
const taskschema = require("../models/task");
const commentschema = require("../models/comment");


exports.createteam = async (req, res) => {
    try {
      const { adminid, email, members, teamname } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }
  
      const team = await new groupschema({
        name: teamname,
        admin: adminid,
        members: members,
      });
  
      await team.save();
      return res.status(200).json({
        success: true,
        message: "Team Added Successfully",
        team,
      });
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json("fail");
    }
  };
  
  exports.createtask = async (req, res) => {
    try {
      const { email, description, groupId, audiourl, createdby } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }
  
      const task = await new taskschema({
        description: description,
        audioUrl: audiourl,
        createdBy: createdby,
        groupId: groupId,
      });
  
      await task.save();
      return res.status(200).json({
        success: true,
        message: "Task added",
        task,
      });
    } catch (error) {
      console.log(error);
    }
  };
  exports.createcomment = async (req, res) => {
    try {
      const { email, content, createdBy, taskId } = req.body;
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User Not Found",
        });
      }
  
      const comment = await new commentschema({
        content,
        createdBy,
        taskId,
      });
  
      await comment.save();
      return res.status(200).json({
        success: true,
        message: "comment added",
        comment,
      });
    } catch (error) {
      console.log(error);
    }
  };


  exports.getGroups=async(req,res)=>{
    try{
        const payload=req.payload;

        const userid=payload.id;

        const user=await User.findById(userid).populate("group");

        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }

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

  exports.sendToGroup=async(req,res)=>{
    try{
      const {groupName,audioBlob, filename, mimeType}=req.body;
      const payload=req.payload;
      const userid=payload.id;

      const user=await User.findById(userid);

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
        message:"Task added successfully"
      })

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


      const audioDataArray=group.tasks.map(audioDoc => ({
        filename: audioDoc.filename,
        mimeType: audioDoc.mimeType,
        base64Audio: audioDoc.audioData.toString('base64'),
        sender:audioDoc.createdBy.name
    }));


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
    }
  }

  exports.searchGroups=async(req,res)=>{
    try{

        const {prefix}=req.body;
        const payload=req.payload;

        const userid=payload.id;

        const user=await User.findById(userid).populate("group");

        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            })
        }

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