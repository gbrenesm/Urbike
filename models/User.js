const { Schema, model } = require("mongoose")

const userSchema = new Schema(
  {
    username: String,
    email: {
      type: String,
      match: [/^\S+@\S+\.\S+$/, 'Por favor, proporciona un email válido.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String
    },
    googleId: String,
    facebookId: String,
    twitterId: String,
    profilePhoto: String,
    posts: [{
      type: Schema.Types.ObjectId,
      ref: "Posts"
    }]
  },
  {
    timestamps: true
  }
)

module.exports = model ("User", userSchema)