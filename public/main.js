import { io } from "https://cdn.socket.io/4.3.2/socket.io.esm.min.js";

const socket = io();

socket.on("update", (arg) => {
  const votingResults = document.querySelectorAll(".votesUpdate");
  votingResults.forEach((result, idx) => {
    result.innerText = `${arg.data[idx].votes} out of ${arg.totalVotes}`;
  });
});

let date = document.querySelector("#date");
let dateStr = date.dataset.nexttime;
let hasVoted = date.dataset.hasvoted;
let nextVote = moment(dateStr); //todays date

// var end = moment("2022-4-21"); // another date
// var duration = moment.duration(now.diff(nextVote));
// var minutes = duration.asMinutes();

var now = moment();

let myInterval = setInterval(timer, 1000);
let time = document.querySelector("span");

function timer() {
  now = moment();
  var duration = moment.duration(nextVote.diff(now));
  var minutes = duration.asMinutes();
  if (nextVote.isSameOrAfter(now)) {
    time.innerText = "you can vote " + moment.duration(minutes, "seconds").humanize(true);

    return;
  }
  if (hasVoted === "true") {
    voteAgain();
  }

  clearInterval(myInterval);
}

function voteAgain() {
  const email = document.querySelector("#email").innerText;
  fetch("user/reload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      emai: email,
      nextVote: dateStr,
    }),
  }).then(function (response) {
    window.location.reload();
  });
}
