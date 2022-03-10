const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const accountSchema = new Schema(
  {
    name: String,
    industryType: String,
    timezone: String,
    location: String,
    avatar: {type: String, default: 'images/default-avatar.png'},
    email: String,
    contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
    telephone: Number,
    employees: Number,
    revenue: Number,
    deals: [{type: Schema.Types.ObjectId, ref: 'Deal'}],
    products: [],
    user: [{type: Schema.Types.ObjectId, ref: 'User'}],
  },
  {
    timestamps: true,
  }
);

const Account = model("Account", accountSchema);

module.exports = Account;