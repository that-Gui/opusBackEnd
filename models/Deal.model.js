const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const dealSchema = new Schema(
  {
    name: {type: String, default: ' '},
    closeDate: {type: String, default: ' '},
    sum: {type: Number, default: ' '},
    stages: {type: String, required: true, enum: ['new', 'negotiation', 'underReview', 'followUp', 'closed']},
    notes: {type: String, default: ' '},
    products: [],
    contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
    accounts: [{type: Schema.Types.ObjectId, ref: 'Account'}],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps: true,
  }
);

const Deal = model("Deal", dealSchema);

module.exports = Deal;
