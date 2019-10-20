module.exports = (req, res, next) => {
  // randomly fail 20% of requests
  if (Math.random() <= 0.2) {
    res.status(500).send("Unknown Error");
    res.end();
    return;
  }

  // randomly delay api request by 1s-5s
  const randomDuration = Math.floor(Math.random() * 4000) + 1000;
  setTimeout((function() { next() }), randomDuration);
}
