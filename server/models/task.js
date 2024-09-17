const mongoose = require('mongoose');

// taskschema for handling audio data
const taskschema = mongoose.Schema({
    filename: {
        type: String,
        default:""
    },
    mimeType: {
        type: String,
        default:""
    },
    size: {
        type: Number
    },
    audioData: {
        type: Buffer
    },
    uploadDate: {
        type: Date,
        default: Date.now,
    },
    createdBy: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    contentofpost: {
        type: String,
        default:""
    },
});

// taskschema2 for handling text content
// const taskschema2 = mongoose.Schema({
//     filename: {
//         type: String,
//         required: true,
//     },
//     contentofpost: {
//         type: String,
//         required: true,
//     },
//     uploadDate: {
//         type: Date,
//         default: Date.now,
//     },
//     createdBy: { 
//         type: mongoose.Schema.Types.ObjectId, 
//         ref: 'User', 
//         required: true 
//     }
// });

// Export both schemas with the names `taskschema` and `taskschema2`
module.exports = {
    taskschema: mongoose.model('taskschema', taskschema)
};
