const mongoose=require('mongoose');

const userschema=mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, enum: ['manager', 'employee'], required: true },
    // Add more fields as needed
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords
    group:[{type:mongoose.Schema.Types.ObjectId,ref:'groupschema'}]
})



module.exports=mongoose.model('User',userschema);

