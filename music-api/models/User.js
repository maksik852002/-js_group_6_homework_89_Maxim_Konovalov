const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nanoid = require("nanoid");

const SALT_WORK_FACTOR = 10;

const UserShema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: async function (value) {
          if (!this.isModified('username')) return true;
          const user = await User.findOne({username: value});
          if (user) throw new Error('This user is alredy registred');
        }
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (value) {
          if (!this.isModified('password')) return true;
          if (value.length < 3 || value.length > 15 ) throw new Error('Path `password` must be 3-15 characters long');
        }
      }
    },  
    token: {
      type: String,
      required: true
    },
    tracks: {
      type: [mongoose.Schema.Types.Mixed]
    },
    role: {
      type: String,
      required: true,
      default: 'user',
      enum: ['user', 'admin']
    }
  },
  {
    versionKey: false
  }
);

UserShema.methods.generateToken = function() {
  this.token = nanoid();
};

UserShema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
  const hash = await bcrypt.hash(this.password, salt);

  this.password = hash;

  next();
});

UserShema.set("toJSON", {
  transform: (doc, ret, options) => {
    delete ret.password;
    return ret;
  }
});

const User = mongoose.model("User", UserShema);

module.exports = User;
