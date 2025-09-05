const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Root check
app.get("/", (req, res) => {
  res.send("Server is working ✅ (no postback mode)");
});

// List of Monetag direct links
const offers = {
  1: "https://syndication.exoclick.com/splash.php?idzone= 9780832", // replace XXXXX
  2: "https://syndication.exoclick.com/splash.php?idzone=9780834", // replace YYYYY
  3: "https://syndication.exoclick.com/splash.php?idzone=9780829"  // replace ZZZZZ
};

// Click redirect
app.get("/click", (req, res) => {
  let offerid = req.query.offerid || 1; // default offer 1
  let subid = req.query.subid || Date.now(); // track user or random ID

  let baseUrl = offers[offerid];
  if (!baseUrl) return res.send("Offer not found ❌");

  // Add subid to the link
  let redirectUrl = `${baseUrl}&subid=${subid}`;

  console.log(`Redirecting to: ${redirectUrl}`);
  res.redirect(redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
