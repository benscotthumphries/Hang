const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 50000000
  }
});

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const hangSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  title: String,
  description: String,
  city: String,
  activity: String,
  bring: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Hang = mongoose.model('Hang', hangSchema);

// upload hang
router.post("/", validUser, upload.single('hang'), async (req, res) => {
  // check parameters
  if (!req.file)
    return res.status(400).send({
      message: "Must upload a file."
    });

  const hang = new Hang({
    user: req.user,
    path: "/images/" + req.file.filename,
    title: req.body.title,
    description: req.body.description,
    city: req.body.city,
    activity: req.body.activity,
    bring: req.body.bring,
  });
  try {
    await hang.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get my hangs
router.get("/", validUser, async (req, res) => {
  // return hangs
  try {
    let hangs = await Hang.find({
      user: req.user
    }).sort({
      created: -1
    }).populate('user');
    return res.send(hangs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all hangs
router.get("/all", async (req, res) => {
  try {
    let hangs = await Hang.find().sort({
      created: -1
    }).populate('user');
    return res.send(hangs);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get one hang
router.get("/:id", async (req, res) => {
  // return hang
  try {
    let hang = await Hang.findOne({
      _id: req.params.id
    }).populate('user');
    return res.send(hang);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Hang.deleteOne({
      _id: req.params.id
    }).populate('user');
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//Editing a hang
router.put('/:id', async (req, res) => {
  try {
    let hang = await Hang.findOne({
      _id: req.params.id
    });
    hang.title = req.body.title;
    hang.description = req.body.description;
    hang.city = req.body.city;
    hang.activity = req.body.activity;
    hang.bring = req.body.bring;
    await hang.save();
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  model: Hang,
  routes: router,
}