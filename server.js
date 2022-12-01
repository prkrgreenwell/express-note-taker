/** @format */
// Import required packages
const express = require("express");
const app = express();
const path = require("path");
const api = require("./routes/index.js");

const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", api);
app.use(express.static("public"));

//Get route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//Get route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//* sends back to homepage (wildcard)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

//set up listener
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
