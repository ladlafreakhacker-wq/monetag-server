const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

// Root route (for testing)
app.get("/", (req, res) => {
  res.send("Server is working ✅");
});

// Click tracking route
app.get("/click", (req, res) => {
  console.log("Click received:", req.query);
  res.send("Click logged ✅");
});

// Monetag Postback route
app.get("/postback", (req, res) => {
  console.log("Postback received:", req.query);

  if (req.query.secret !== "MYSECRET123") {
    return res.status(403).send("Invalid secret ❌");
  }

  res.send("Postback OK ✅");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
