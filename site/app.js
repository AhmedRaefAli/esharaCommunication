const path = require('path');
const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const multer = require('multer');

const wardRoutes = require("./routes/ward");
const sadrRoutes = require("./routes/sadr");
const authRoutes = require("./routes/User");

const app = express();



const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'||
    file.mimetype === 'image/pdf'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};



app.use(bodyParser.json()); // application/json

app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single('file')
);
app.use('/files', express.static(path.join(__dirname, 'files')));




app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });

app.use("/ward",wardRoutes);
app.use("/sadr",sadrRoutes);
app.use("/auth",authRoutes);

app.use((error, req, res, next) => {
  console.log(error);
  const status = error.statusCode || 500;
  const message = error.message;
  const data = error.data;
  res.status(status).json({ message: message, data: data });
});

mongoose.connect("mongodb+srv://Araraef22:P3MOglMyOqwXvgX1@cluster0.fwsyw.mongodb.net/esharaDataBase")
.then(res=>{
    app.listen(8080);})
.catch(err=>{
    console.log(err);});
