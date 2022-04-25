const User = require("../models/User");
const moment = require("moment");

module.exports = {
  vote: async (req, res) => {
    try {
      let nextVote = moment(req.body.nextVote);

      if (moment().isSameOrAfter(nextVote)) {
        await User.findOneAndUpdate(
          { email: req.body.email },
          {
            hasVoted: false,
          }
        );
      }

      res.redirect("/");
    } catch (err) {
      console.log(err);
    }
  },
};
