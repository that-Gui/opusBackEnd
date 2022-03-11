const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    email: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: String,
    lastName: String,
    timezone: String,
    avatar: {type: String, default: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fyt3.ggpht.com%2Fa%2FAATXAJxrVU_Dpmuo80kdHdvKkFQd-q0BH1CrwSNlmA%3Ds900-c-k-c0xffffffff-no-rj-mo&f=1&nofb=1'},
    contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
    accounts: [{type: Schema.Types.ObjectId, ref: 'Account'}],
    deals: [{type: Schema.Types.ObjectId, ref: 'Deal'}],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
