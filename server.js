const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Root check
app.get("/", (req, res) => {
  res.send("Monetag-server is working ✅ using otieu.com links");
});

// Your direct links
const offers = {
  1: "https://otieu.com/4/9780832",
  2: "https://otieu.com/4/9780834",
  3: "https://otieu.com/4/9780829"
};

// Click redirect
app.get("/click", (req, res) => {
  let offerid = req.query.offerid || 1; // default offer = 1
  let subid = req.query.subid || Date.now(); // unique user ID

  let baseUrl = offers[offerid];
  if (!baseUrl) return res.send("Offer not found ❌");

  // Add SubID (if supported by Monetag short links)
  let redirectUrl = `${baseUrl}?subid=${subid}`;

  console.log(`Redirecting to: ${redirectUrl}`);
  res.redirect(redirectUrl);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
