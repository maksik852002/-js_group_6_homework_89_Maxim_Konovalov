const mongoose = require("mongoose");

const ArtistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    info: String,
    published: {
      type: Boolean,
      default: false,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
  },
  {
    versionKey: false
  }
);

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;
