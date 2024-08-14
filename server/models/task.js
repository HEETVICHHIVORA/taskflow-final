const mongoose=require('mongoose');

const taskschema=mongoose.Schema({
    description: { type: String, required: false },
    audioUrl: { type: String, required: false }, // URL for audio file if applicable
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    // assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    groupId: { type: mongoose.Schema.Types.ObjectId, ref: 'Group', required: true },
    status: { type: String, enum: ['pending', 'completed', 'acknowledged'], default: 'pending' },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', default: null }],
    completedAt: { type: Date, default: null }, // When the task was completed
    // Additional fields as needed
})



module.exports=mongoose.model('taskschema',taskschema);

