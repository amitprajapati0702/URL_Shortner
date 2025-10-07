const express = require("express");
const path = require("path");
const port = 5001;
const { connection } = require("./connect");
const app = express();

//User route from --> route
const urlroute = require("./routes/url");
const URL = require("./model/url");
const staticrouter = require("./routes/staticroute");
const userroute = require("./routes/user");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//View engine
app.set("view engine" , "ejs");
app.set("views" , path.resolve("./views"));

//Rendring page -->staticrouter
app.use("/",staticrouter);
app.use("/url", urlroute);
app.use("/user",userroute);
// Routes

// Show all users/urls
// app.get("/api/users", async (req, res) => {
//   try {
//     const allurl = await URL.find({});
//     return res.render("home",{
//        urls : allurl,
//     });
//   } catch (err) {
//     console.error("Error fetching URLs:", err);
//     return res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// Redirect by shortid
app.get("/:sortid", async (req, res) => {
  try {
    const sortid = req.params.sortid;
    console.log("Looking for sortid:", sortid);

    const entry = await URL.findOneAndUpdate(
      { sortid },
      { $push: { visithistory: { timestamp: Date.now() } } },
      { new: true }
    );

    if (!entry) {
      console.log("No entry found for:", sortid);
      return res.status(404).json({ error: "Short URL not found" });
    }

    console.log("Redirecting to:", entry.redirecturl);
    return res.redirect(entry.redirecturl);
  } catch (err) {
    console.error("Error redirecting:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

// Connect to DB
connection("mongodb://127.0.0.1:27017/url");

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
