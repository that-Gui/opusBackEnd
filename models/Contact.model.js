const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const contactSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    telephone: Number,
    jobTitle: String,
    timezone: String,
    location: String,
    avatar: {type: String, default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJxrVU_Dpmuo80kdHdvKkFQd-q0BH1CrwSNlmA%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1'},
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
