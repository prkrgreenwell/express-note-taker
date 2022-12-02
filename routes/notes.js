/** @format */
//import packages
const notes = require("express").Router();
const fs = require("fs");
const util = require("util");
// Helper Functions
const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) => {
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
};
const readAndAppend = (content, file) => {
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};
//TODO: GET /api/notes should read the db.json file and
// return all saved notes as JSON
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});
//TODO: POST /api/notes should recieve a new note to save on
// the request and add it ot the db.json file and then
//  return the new note to the client.
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);
  console.log(req.body);
  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: 5, //make id here
    };
    readAndAppend(newNote, "./db/db.json");
    res.json("Note successfully added");
  } else {
    res.error("Error in adding note");
  }
});
module.exports = notes;
// TODO: find a way to give each note a unique id when it's saved
