const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  location:{
    type: String,
    required: true
  },
  education:{
    type: String
  },
  work_position:{
    type: String
  },
  work_employer:{
    type: String
  },
  about_me:{
    type: String
  },
  location:{
    type: String
  },
  relationship_status:{
    type: String,
    default: 'Single',
    enum:['Single','Married','Divorsed','Saperated','Widowed']
  },
  looking_for:{
    type: String,
    enum: ['Commited Relationship','Something Casual','Marrige','Dont Know Yet']
  },
  intrest:{
    type: String
  }
},{timestamps: true});

const User = mongoose.model('User', UserSchema);

module.exports = User;
