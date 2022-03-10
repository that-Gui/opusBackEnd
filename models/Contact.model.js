const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const contactSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    timezone: String,
    location: String,
    avatar: {type: String, default: 'images/default-avatar.png'},
    email: String,
    telephone: Number,
    jobTitle: String,
    accounts: [{type: Schema.Types.ObjectId, ref: 'Account'}],
    deals: [{type: Schema.Types.ObjectId, ref: 'Deal'}],
    products: [],
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  },
  {
    timestamps: true,
  }
);

const Contact = model("Contact", contactSchema);

module.exports = Contact;
