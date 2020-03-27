const mongoose = require("mongoose");

const TrackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    album: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Album",
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    duration: {
      type: String,
      required: true,
    },
    sn: {
      type: String,
      required: true
    },
    published: {
      type: Boolean,
      default: false,
      required: true,
    }
  },
  {
    versionKey: false
  }
);

const Track = mongoose.model("Track", TrackSchema);

module.exports = Track;
