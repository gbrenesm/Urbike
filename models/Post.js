const { Schema, model } = require("mongoose")

const postSchema = new Schema(
  {
    title: String,
    content: String,
    photo: {
      type: String,
      default: "https://res.cloudinary.com/dxncdwsau/image/upload/v1599751527/urbike-Rodada-CDMX.jpg.jpg",
    },
    creatorId: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    date: { 
      type: Date, 
      default: Date.now },
    category: String,
    comments: [{
      type: Schema.Types.ObjectId,
      ref: "Comment"
    }]
  },
  {
    timestamps: true
  }
)

module.exports = model ("Post", postSchema)