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
            <textarea type="text" placeholder="take the note" class="content"> </textarea>
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
  }
}
