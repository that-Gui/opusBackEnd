const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const accountSchema = new Schema(
  {
    name: {type: String, default: ' '},
    industryType: {type: String, default: ' '},
    timezone: {type: String, default: ' '},
    location: {type: String, default: ' '},
    avatar: {type: String, default: 'images/default-avatar.png'},
    email: {type: String, default: ' '},
    telephone: {type: Number, default: ' '},
    employees: {type: Number, default: ' '},
    revenue: {type: Number, default: ' '},
    contacts: [{type: Schema.Types.ObjectId, ref: 'Contact'}],
    deals: [{type: Schema.Types.ObjectId, ref: 'Deal'}],
    user: {type: Schema.Types.ObjectId, ref: 'User'},
  },
  {
    timestamps: true,
  }
);

const Account = model("Account", accountSchema);

module.exports = Account;
