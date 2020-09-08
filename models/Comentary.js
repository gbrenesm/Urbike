const { Schema, model } = require("mongoose")

const comentarySchema = new Schema(
  {
    content: String, 
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
)

module.exports = model ("Comentary", comentarySchema)