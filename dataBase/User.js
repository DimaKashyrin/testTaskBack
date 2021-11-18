const { Schema, model } = require('mongoose');

const { userType } = require('../configs');

const userSchema = new Schema({
  userName: {
    type: String,
    required: true,
    trim:true
  },
  firstName: {
    type: String,
    required: true,
    trim:true
  },
  lastName: {
    type: String,
    required: true,
    trim:true
  },
  email: {
    type: String,
    required: true,
    trim:true
  },
  password: {
    type: String,
    required: true,
    trim:true
  },
  userType: {
    type: String,
    required: true,
    trim:true,
    enum: Object.values(userType)
  }
}, { timestamps: true })

module.exports = model('user', userSchema );