const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  pseudo: String,
  email: { type: String, unique: true },
  pwd: String,
});

const UserModel = mongoose.model("user", userSchema);

module.exports = UserModel;
