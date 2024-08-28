import Notes from "./notes";
import View from "./view.js";

const app = document.getElementById("app");

const view = new View(app, {
  onNoteAdd({ title, content }) {
    if (title.trim() != "" && content.trim != "") {
      Notes.saveNotes({
        title,
        content,
      });
        }
        
    // console.log(title, content);
  },
});

// Notes.saveNotes({
//     id:90978,
//     title: "New note",

//     content:"this is new note"
// })

// console.log(Notes.getAll());
