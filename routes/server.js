const express = require('express');
const moment = require('moment');
const router = express.Router()

const { hash, compare } = require('bcryptjs');
const { verify } = require('jsonwebtoken');

const zoom = require('../client/src/zoom');

const { LoginModel, ClassModel } = require('../models/Models');
const { protected } = require("../utils/protected");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken
} = require('../utils/tokens');

router.get('/', async (req, res) => {
  res.send('Hello Express!! 👋, this is Auth end point')
})

router.post('/signup', async (req, res) => {
  try {
    const { username: userName = "", password = "" } = req.body;
    const userDetails = await LoginModel.findOne({ userName });
    if (userDetails) {
      return res.status(500).json({
        message: "User already exists. Try login",
        type: 'warning'
      });
    }

    const passwordHash = await hash(password, 10);

    const newSignup = new LoginModel({
      userName,
      password: passwordHash
    });

    await newSignup.save();
    res.status(201).json(newSignup);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/schedule', async (req, res) => {
  const { scheduledBy, studentEmails, scheduledTime, duration = 60, topic = "Meet" } = req.body;
  const reposne = await zoom.createZoomMeeting(topic, duration, scheduledTime);
  const { meetingUrl = '', purpose = '', password = '' } = reposne ? reposne : {};

  const newClass = new ClassModel({
    participants: {studentEmails},
    meetingUrl,
    purpose,
    duration,
    password,
    scheduledTime,
    scheduledBy,
    scheduledAt: moment()
  });

  try {
    await newClass.save();
    res.status(201).json(newClass);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { username: userName, password } = req.body;
  const userDetails = await LoginModel.findOne({ userName });
  if (userDetails) {
    // console.log(userDetails, userName, password);
    const isMatch = await compare(password, userDetails.password);
    console.log("match", isMatch)
    if (!isMatch) {
      return res.status(500).json({ message: "Password incorrect", userDetails });
    }
    const accessToken = createAccessToken(userDetails._id);
    const refreshToken = createRefreshToken(userDetails._id);

    userDetails.refreshToken = refreshToken;
    await userDetails.save();

    sendRefreshToken(res, refreshToken);
    sendAccessToken(req, res, accessToken);
    // return res.status(201).json({ message: "User Logged in Successfully", userDetails });
  }
  else {
    res.status(404).send({ message: "User not exists please Sign up and then log in" });
  }
});

router.get('/schedulelist', async (req, res) => {
  try {
    console.log(req.query.userName)
    if (req.query) {
      const scheduleList = await ClassModel.find({ scheduledBy: req.query.userName });
      return res.json(scheduleList);
    }
    return res.status(500).json({
      message: 'You are not logged in! 😢',
      type: 'error',
    })
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/logout', async (req, res) => {
  res.clearCookie("refreshToken");
  return res.json({
    message: "Logged out successfully",
    type: "success"
  });
});

router.post('/refreshtoken', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(500).json({
        message: "No refresh token",
        type: "error"
      });
    }
    let id;
    try {
      id = verify(refreshToken, process.env.REFRESH_TOKEN_SECRET).id;
    } catch (error) {
      return res.status(500).json({
        message: "Invalid refresh token!",
        type: "error"
      });
    }
    if (!id) {
      return res.status(500).json({
        message: "Invalid refresh token!",
        type: "error"
      });
    }
    const user = await LoginModel.findById(id);
    if (!user) {
      return res.status(500).json({
        message: "User does not exists!",
        type: "error"
      });
    }
    if (user.refreshToken !== refreshToken) {
      return res.status(500).json({
        message: "Invalid refresh token!",
        type: "error"
      });

    }
    const accessToken = createAccessToken(user._id);
    const refreshtoken = createRefreshToken(user._id);

    user.refreshToken = refreshtoken;
    sendRefreshToken(res, refreshtoken);

    return res.json({
      message: "Refreshed successfully! 🤗",
      type: "success",
      accessToken,
    });
  }
  catch (err) {
    return res.status(500).json({
      type: "error",
      message: "Error refreshing token!",
      err,
    });
  }

});

module.exports = router;