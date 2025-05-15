const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  registerNumber: {
    type: String,
    required: true,
    unique: true
  },
  name: String,
  email: String,
  phone: String,
  department: String,
  dob: String
});

module.exports = mongoose.model('Student', studentSchema);