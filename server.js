const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const zoom = require('./client/src/zoom');
const { isElement, isEmpty, isNull } = require('lodash');

const app = express();
const port = 3001;

app.use(cors())

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/zoom-classroom', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const classSchema = new mongoose.Schema({
  teacherEmail: String,
  studentEmails: [String],
  meetingUrl: String,
  duration: Number,
  password: Number,
  scheduledTime: Date,
});

const loginSchema = new mongoose.Schema({
  userName: { type: String, unique: true, required: true },
  password: { type: String, required: true }
});

const ClassModel = mongoose.model('Class', classSchema);
const LoginModal = mongoose.model('Login', loginSchema);

app.post('/api/schedule', async (req, res) => {
  // let reposne = {};
  const { teacherEmail, studentEmails, scheduledTime, duration = 60, topic = "Meet" } = req.body;
  const reposne = await zoom.createZoomMeeting(topic, duration, scheduledTime);
  const { meetingUrl = '', purpose = '', password = '' } = reposne ? reposne : {};

  const newClass = new ClassModel({
    teacherEmail,
    studentEmails,
    meetingUrl,
    purpose,
    duration,
    password,
    scheduledTime,
  });

  try {
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/signup', async (req, res) => {
  try {
    const { username: userName = "", password = "" } = req.body;

    const newSignup = new LoginModal({
      userName,
      password
    });

    await newSignup.save();
    res.status(201).json(newSignup);
  } catch (error) {
    if (error.code === 11000) {
      res.status(409).send({ message: "Username already exists please choose another username" });
      console.error(error);
    }
    else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
});

app.post('/api/login', async (req, res) => {
  const { username: userName, password } = req.body;
  const userDetails = await LoginModal.findOne({ userName, password });
  console.log(isEmpty(userDetails) === false);
  if (userDetails) {
    console.log(userDetails, userName, password);
    res.status(201).json({ message: "User Logged in Successfully", userDetails })
  }
  else {
    console.log("yes");
    res.status(404).send({ message: "User not exists please Sign up and then log in" });
  }
});

app.get('/api/schedulelist', async (req, res) => {
  try {
    const scheduleList = await ClassModel.find();
    res.json(scheduleList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
