const mongoose=require('mongoose');

const commentschema=mongoose.Schema({
    content: { type: String, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    taskId: { type: mongoose.Schema.Types.ObjectId, ref: 'Task', required: true },
    createdAt: { type: Date, default: Date.now },
})



module.exports=mongoose.model('commentschema',commentschema);

