const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const dealSchema = new Schema(
  {
    name: String,
    closeDate: String,
    contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
    sum: Number,
    stages: {type: String, required: true, enum: ['new', 'negotiation', 'underReview', 'followUp', 'closed']},
    products: [],
    notes: String,
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  },
  {
    timestamps: true,
  }
);

const Deal = model("Deal", dealSchema);

module.exports = Deal;