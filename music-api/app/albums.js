const path = require("path");
const express = require("express");
const multer = require("multer");
const nanoid = require("nanoid");

const config = require("../config");
const auth = require('../middleware/authMiddleware');
const permit = require('../middleware/permit');

const Album = require("../models/Album");
const Track = require("../models/Track");

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
let count = 0;

router.get("/", async (req, res) => {
  try {
    let albums;
    if (req.query.artist) {
      albums = await Album.find({ artist: req.query.artist }).populate("artist").populate('user', 'token').sort({year: 1}).limit(10);
    } else {
      // tracks = await Track.aggregate([{$group : {_id : "$album", Total: {$sum : count + 1}}}]);
      // console.log(tracks)
      albums = await Album.find().populate("artist").populate('user', 'token').sort({year: 1}).limit(10);
      // console.log(albums)
      
      // let merge = (tracks, albums) => ([...tracks, ...albums]);
      // console.log(merge(tracks, albums))
    }
    res.send(albums);
  } catch (e) {
    res.status(422).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("artist");
    res.send(album);
  } catch (e) {
    res.status(404).send({ message: "Not Found" });
  }
});

router.post("/", [auth, upload.single("image")], async (req, res) => {
  const albums = new Album({
    name: req.body.name,
    artist: req.body.artist,
    user: req.user,
    year: req.body.year,
  });
  if (req.file) {
    albums.image = req.file.filename;
  }
  try {
    await albums.save();
    res.send({ id: albums._id });
  } catch (e) {
    res.status(422).send(e);
  }
});

router.put("/:id", [auth, permit('admin')], async (req, res) => {
  try {
    const album = await Album.findById(req.params.id);
    album.published = !album.published
    await album.save();
    return res.send({ message: `${req.params.id} published` });
  } catch (e) {
    return res.status(422).send(e);
  }
});

router.delete("/:id", [auth, permit('admin')], async (req, res) => {
  try {
    const tracks = await Track.find({album: req.params.id})
    if (tracks.length > 0) {
      return res.status(422).send({message: 'Delete related fields first'});
    }
    await Album.findOneAndRemove({_id: req.params.id});
    return res.send({ message: `${req.params.id} removed` });
  } catch (e) {
    return res.status(422).send(e);
  }
});

module.exports = router;
