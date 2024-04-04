const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const serverless = require("serverless-http");

const authRouter = require('./routes/server');

const app = express();
const port = 3001;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/auth', authRouter);

mongoose.connect('mongodb://localhost:27017/zoom-classroom', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connection is established successfully! 🎉')
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use("/.netlify/functions/app", authRouter);
module.exports.handler = serverless(app);