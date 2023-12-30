const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
var cors = require('cors');
const zoom = require('./client/src/zoom')

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
  purpose: String,
  duration: Number,
  password: Number,
  scheduledTime: Date,
});

const loginSchema = new mongoose.Schema({
  userName: String,
  password: String
});

const ClassModel = mongoose.model('Class', classSchema);
const LoginModal = mongoose.model('Login', loginSchema);

app.post('/api/classes', async (req, res) => {
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

app.post('/api/login', async (req, res) => {
  const { userName = "", password = "" } = req.body;

  const newLogin = new LoginModal({
    userName,
    password
  });

  try {
    await newLogin.save();
    res.status(201).json(newLogin);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
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
