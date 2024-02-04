const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    // required:true,
    enum: ["CREATOR", "VIEW_ALL"],
    default:"VIEW_ALL",
  },
});

const UserModel = mongoose.model("user", UserSchema);

module.exports = { UserModel };
