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
    labels: [String]
  },
  {
    timestamps: true
  }
)

module.exports = model ("Post", postSchema)