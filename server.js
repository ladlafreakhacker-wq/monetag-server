const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Root check
app.get("/", (req, res) => {
  res.send("Monetag-server is working ✅ with random rotation");
});

// Your Monetag direct links
const offers = [
  "https://otieu.com/4/9780832",
  "https://otieu.com/4/9780834",
  "https://otieu.com/4/9780829"
];

// Click redirect (random)
app.get("/click", (req, res) => {
  let subid = req.query.subid || Date.now(); // unique ID

  // Pick a random offer
  let randomOffer = offers[Math.floor(Math.random() * offers.length)];

  // Add subid if supported
  let redirectUrl = `${randomOffer}?subid=${subid}`;

  console.log(`Redirecting to: ${redirectUrl}`);
  res.redirect(redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
