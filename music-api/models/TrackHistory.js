const mongoose = require("mongoose");

const TrackHistoryShema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    track: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Track",
      required: true
    },
    datetime: {
      type: Date,
      default: Date.now
    },
    artist: {
      type: mongoose.Schema.Types.Mixed
    },
  },
  {
    versionKey: false
  }
);

const TrackHistory = mongoose.model("TrackHistory", TrackHistoryShema);

module.exports = TrackHistory;
