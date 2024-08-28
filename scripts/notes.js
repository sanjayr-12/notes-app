export default class Notes {
  static getAll() {
    const notes = JSON.parse(localStorage.getItem("notes") || "[]");
    return notes.sort((a, b) => {
      return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
    });
  }

  static saveNotes(Savenotes) {
    const notes = Notes.getAll();
    const existing = notes.find((note) => note.id === Savenotes.id);

    if (existing) {
      existing.title = Savenotes.title;
      existing.content = Savenotes.content;
      existing.updated = new Date().toISOString();
    } else {
      Savenotes.id = Math.floor(Math.random() * 1000000);
      Savenotes.updated = new Date().toISOString();
      notes.push(Savenotes);
    }

    localStorage.setItem("notes", JSON.stringify(notes));
  }

  static deleteNotes(id) {
    const notes = Notes.getAll();

    const newNotes = notes.filter((note) => note.id != id);
    localStorage.setItem("notes", JSON.stringify(newNotes));
  }
}
