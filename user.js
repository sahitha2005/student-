const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    regno: { type: String, required: true },
    dob: { type: Date, required: true },
    department: { type: String, required: true },
    tenth_percentage: { type: Number, required: true },
    twelth_percentage: { type: Number, required: true },
    ug_percentage: { type: Number, required: true },
    hobbies: [String] 
});

const User = mongoose.model('User', userSchema);

module.exports = User;
