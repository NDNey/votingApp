const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  hasVoted: {
    type: Boolean,
  },
  nexVote: {
    type: Date,
  },
});

module.exports = mongoose.model("User", UserSchema);
