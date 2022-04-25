const Cartoons = require("../models/Cartoons");

const User = require("../models/User");
const moment = require("moment");

let timeInMinutes = 3;

module.exports = {
  getCartoos: async (req, res) => {
    try {
      const data = await Cartoons.find();
      const userVote = await User.findOne(req.oidc.user);

      let totalVotes = data.reduce((a, c) => a + c.votes, 0);
      const result = {
        data: data,
        totalVotes: totalVotes,
      };

      req.socketIo.emit("update", result);

      res.render("index.ejs", { user: req.oidc.user, data: data, totalVotes: totalVotes, hasVoted: userVote });
    } catch (err) {
      console.log(err);
    }
  },
  vote: async (req, res) => {
    try {
      await Cartoons.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { votes: 1 },
        }
      );
      await User.findOneAndUpdate(
        { email: req.oidc.user.email },
        {
          hasVoted: true,
          nexVote: moment().add(2, "minutes"),
        }
      );

      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
};
