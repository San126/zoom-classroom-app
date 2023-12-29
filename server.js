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
  scheduledTime: String,
});

const ClassModel = mongoose.model('Class', classSchema);

app.post('/api/classes', async (req, res) => {
  const reposne = await zoom.createZoomMeeting();
  const { teacherEmail, studentEmails, scheduledTime } = req.body;
  const {meetingUrl, purpose, duration, password } = reposne;

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
