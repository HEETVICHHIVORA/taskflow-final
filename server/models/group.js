const mongoose=require('mongoose');

const groupschema=mongoose.Schema({
    name: { type: String, required: true },
    admin: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    // Additional fields can be added
})



module.exports=mongoose.model('groupschema',groupschema);

