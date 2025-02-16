const mongoose = require('mongoose');
const { Schema, model } = require("mongoose");

const classSchema = new Schema({
  participants: { type: Object, required: true },
  meetingUrl: { type: String, required: true },
  duration: { type: Number,  required: true },
  password: { type: Number,  required: true },
  purpose: { type: String,  required: true },
  scheduledTime: { type: Date,  required: true },
  scheduledBy: String,
  scheduledAt: Date
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