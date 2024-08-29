export default class View {
  constructor(
    root,
    { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}
  ) {
    this.root = root;
    this.onNoteSelect = onNoteSelect;
    this.onNoteEdit = onNoteEdit;
    this.onNoteAdd = onNoteAdd;
    this.onNoteDelete = onNoteDelete;

    this.root.innerHTML = `
          <div class="notes_sidebar">
            <button class="notes_add" type="button">add notes</button>
            <div class="notes_list">
               
            </div>
        </div>

        <div class="notes_preview">
            <input type="text" placeholder="enter the title" class="title">
            <textarea type="text" placeholder="take the note" class="content">hi</textarea>
        </div>
        `;
      
      
      const btnAdd = this.root.querySelector(".notes_add")
      const inpTitle = this.root.querySelector(".title")
      const inpContent = this.root.querySelector(".content")

      btnAdd.addEventListener("click", () => {
          this.onNoteAdd({
              title: inpTitle.value,
              content:inpContent.value
          })
      })
          
      if (inpTitle && inpContent) {
              [inpTitle, inpContent].forEach((inputField) => {
                inputField.addEventListener("blur", () => {
                  const updatedTitle = inpTitle.value.trim();
                  const updatedContent = inpContent.value.trim();
                  this.onNoteEdit(updatedTitle, updatedContent);
                });
              });
          }

      
    }
    
    #createListItemHTML(id, title, content, updated) {
        const max_length = 60;
        return `
            <div class="notes_item" data-note-id="${id}">
                <div class="notes-title">${title}</div>
                <div class="notes-content">${content.substring(0,max_length)} ${content.length>max_length?"...":""}</div>
                <div class="notes-updated">${updated.toLocaleString(undefined,{dateStyle:"full",timeStyle:"short"})}</div>
            </div>
        `;
    }

    updateNoteList(notes) {
        const notesListContainer = this.root.querySelector(".notes_list")

        notesListContainer.innerHTML = ""

        for (const note of notes) {
            const html = this.#createListItemHTML(note.id, note.title, note.content, new Date(note.updated))

            notesListContainer.insertAdjacentHTML("beforeend", html)
        }

        // console.log(notesListContainer);
        
        notesListContainer.querySelectorAll(".notes_list").forEach(noteListItem => {
            noteListItem.addEventListener("click", () => {
                this.onNoteSelect(noteListItem.dataset.noteId)
            })
        });
    }


    
}
