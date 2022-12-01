/** @format */
// TODO: import required parts
const express = require("express");
const app = express();
const path = require("path");

const PORT = process.env.PORT || 3001;
//TODO: Middleware
app.use(express.static("public"));
//Get route for homepage
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});
//Get route for notes page
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});
//* sends back to homepage

//set up listener
app.listen(PORT, () => console.log(`Listening at http://localhost:${PORT}`));
