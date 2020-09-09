const { Schema, model } = require("mongoose")

const postSchema = new Schema(
  {
    title: String,
    content: String,
    photo: String, 
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