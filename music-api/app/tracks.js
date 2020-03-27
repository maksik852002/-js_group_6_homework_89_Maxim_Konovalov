const express = require("express");
const Track = require("../models/Track");
const auth = require('../middleware/authMiddleware');
const permit = require('../middleware/permit');

const router = express.Router();
 
router.get("/", async (req, res) => {
  try {
    let tracks;
    if (req.query.album) {
      tracks = await Track.find({ album: req.query.album }).populate('user', 'token').sort({sn: 1}).limit(50);
    } else if (req.query.artist) {
      tracks = await Track.find().populate("album").populate('user', 'token').limit(50);
      tracks = tracks.filter(
        el => el.album.artist._id.toString() === req.query.artist
      );
    } else {
      tracks = await Track.find().populate('user', 'token').limit(50)
    }
    res.send(tracks);
  } catch (e) {
    res.status(422).send(e);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const track = await Track.findById(req.params.id).populate("album");
    res.send(track);
  } catch (e) {
    res.status(404).send({ message: "Not Found" });
  }
});

router.post("/", auth, async (req, res) => {
  const track = new Track({
    album: req.body.album,
    name: req.body.name,
    duration: req.body.duration,
    sn: req.body.sn,
    user: req.user
  });
  try {
    await track.save();
    res.send({ id: track._id });
  } catch (e) {
    res.status(422).send(e);
  }
});

router.put("/:id", [auth, permit('admin')], async (req, res) => {
  try {
    const track = await Track.findById(req.params.id);
    track.published = !track.published
    await track.save();
    return res.send({ message: `${req.params.id} published` });
  } catch (e) {
    return res.status(422).send(e);
  }
});

router.delete("/:id", [auth, permit('admin')], async (req, res) => {
  try {
    await Track.findOneAndRemove({_id: req.params.id});
    return res.send({ message: `${req.params.id} removed` });
  } catch (e) {
    return res.status(422).send(e);
  }
});

module.exports = router;
