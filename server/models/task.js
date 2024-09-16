const mongoose = require('mongoose');

// taskschema for handling audio data
const taskschema = mongoose.Schema({
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
});

// taskschema2 for handling text content
const taskschema2 = mongoose.Schema({
    filename: {
        type: String,
        required: true,
    },
    contentofpost: {
        type: String,
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
});

// Export both schemas with the names `taskschema` and `taskschema2`
module.exports = {
    taskschema: mongoose.model('taskschema', taskschema),
    taskschema2: mongoose.model('taskschema2', taskschema2)
};
