const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const classSchema = new Schema({
  teacherEmail: String,
  studentEmails: [String],
  meetingUrl: String,
  duration: Number,
  password: Number,
  scheduledTime: Date,
});

const loginSchema = new Schema({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  verified: { type: Boolean, default: false },
  refreshToken: { type: String }
});

const ClassModel = model('Class', classSchema);
const LoginModel = model('Login', loginSchema);

module.exports = {
  ClassModel,
  LoginModel
}