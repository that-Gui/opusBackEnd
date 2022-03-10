const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const userSchema = new Schema(
  {
    firstName: String,
    lastName: String,
    timezone: String,
    email: {type: String, required: true},
    avatar: {type: String, default: 'images/default-avatar.png'},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
    accounts: [{type: Schema.Types.ObjectId, ref: 'Account'}],
    deals: [{type: Schema.Types.ObjectId, ref: 'Deal'}],
    products: [],
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
