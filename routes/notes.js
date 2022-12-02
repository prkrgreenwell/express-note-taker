/** @format */
//import packages
const notes = require("express").Router();
const fs = require("fs");
const util = require("util");
const { v4: uuidv4 } = require("uuid");

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

//GET /api/notes should read the db.json file and
// return all saved notes as JSON
notes.get("/", (req, res) => {
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json").then((data) => res.json(JSON.parse(data)));
});

notes.get("/:id", (req, res) => {
  const id = req.params.id;
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id === id);
      return result.length > 0 ? result : res.json("Note note found");
    });
});

//POST /api/notes should receive a new note to save on
// the request and add it ot the db.json file and then
//  return the new note to the client.
notes.post("/", (req, res) => {
  console.info(`${req.method} request received to add a note`);

  const { title, text } = req.body;
  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    console.log(newNote);
    readAndAppend(newNote, "./db/db.json");
    res.json("Note successfully added");
  } else {
    res.error("Error in adding note");
  }
});

//DELETE route DELETE /api/notes/:id should receive a
// query parameter containing the id of a note to delete.
// In order to delete a note, you'll need to read all notes
// from the db.json file, remove the note with the given id
// property, and then rewrite the notes to the db.json file.
notes.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.info(`${req.method} request received for notes`);
  readFromFile("./db/db.json")
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((note) => note.id !== id);
      writeToFile("./db/db.json", result);
      res.json("Note Deleted");
    });
});

module.exports = notes;
// TODO: find a way to give each note a unique id when it's saved
