const mongoose = require("mongoose");

const CartoonSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  url: {
    type: String,
  },
  votes: {
    type: Number,
  },
  totalVotes: {
    type: Number,
  },
});

module.exports = mongoose.model("Cartoon", CartoonSchema);
