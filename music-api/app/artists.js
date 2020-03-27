const path = require("path");
const express = require("express");
const multer = require("multer");
const nanoid = require("nanoid");
const auth = require('../middleware/authMiddleware');
const permit = require('../middleware/permit');

const config = require("../config");
const Artist = require("../models/Artist");
const Album = require("../models/Album");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const artists = await Artist.find().populate('user', 'token').sort({name: 1}).limit(20);
    res.send(artists);
  } catch (e) {
    res.status(422).send(e);
  }	
});

router.get("/:id", async (req, res) => {
	try {
	  const artist = await Artist.findById(req.params.id);
	  res.send(artist);
	} catch (e) {
	  res.status(422).send(e);
	}	
});

router.post("/", [auth, upload.single("image")], async (req, res) => {
  const artists = new Artist({
    name: req.body.name,
    user: req.user,
    info: req.body.info,
  });
  if (req.file) {
    artists.image = req.file.filename;
  }
  try {
    await artists.save();
    res.send({ id: artists._id });
  } catch (e) {
    res.status(422).send(e);
  }
});

router.put("/:id", [auth, permit('admin')], async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    artist.published = !artist.published
    await artist.save();
    return res.send({ message: `${req.params.id} published` });
  } catch (e) {
    return res.status(422).send(e);
  }
});

router.delete("/:id", [auth, permit('admin')], async (req, res) => {
  try {
    const albums = await Album.find({artist: req.params.id})
    if (albums.length > 0) {
      return res.status(422).send({message: 'Delete related fields first'});
    }
    await Artist.findOneAndRemove({_id: req.params.id});
    return res.send({ message: `${req.params.id} removed` });
  } catch (e) {
    return res.status(422).send(e);
  }
});

module.exports = router;
