const mongoose=require('mongoose');

const taskschema=mongoose.Schema({
    filename: {
        type: String,
        required: true,
      },
      mimeType: {
        type: String,
        required: true,
      },
      size: {
        type: Number,
        required: true,
      },
      audioData: {
        type: Buffer, 
        required: true,
      },
      uploadDate: {
        type: Date,
        default: Date.now,
      },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    }

})



module.exports=mongoose.model('taskschema',taskschema);

