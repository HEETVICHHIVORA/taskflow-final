const mongoose=require('mongoose');

const groupschema=mongoose.Schema({
    name: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    tasks:[{type:mongoose.Schema.Types.ObjectId,ref:'taskschema'}]
})



module.exports=mongoose.model('groupschema',groupschema);

