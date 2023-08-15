let notes = JSON.parse(localStorage.getItem('notes')) || [];

function addNote() {
  const noteText = document.getElementById('noteText').value;
  const noteColor = document.getElementById('noteColor').value;
  const note = { text: noteText, color: noteColor };
  notes.push(note);
  localStorage.setItem('notes', JSON.stringify(notes));
  saveNoteToLocalStorage(note);
  renderNotes();
}

function saveNoteToLocalStorage(note) {
  const allNotes = JSON.parse(localStorage.getItem('allNotes')) || [];
  
  // Adăugați spații între cuvinte înainte de a salva nota în local storage
  const formattedNote = { text: note.text.replace(/\n/g, ' '), color: note.color };
  
  allNotes.push(formattedNote);
  localStorage.setItem('allNotes', JSON.stringify(allNotes));
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  deleteNoteFromLocalStorage(index); // Adăugați această linie pentru a șterge nota individual din localStorage
  renderNotes();
}

function deleteNoteFromLocalStorage(index) {
  const allNotes = JSON.parse(localStorage.getItem('allNotes'));
  allNotes.splice(index, 1);
  localStorage.setItem('allNotes', JSON.stringify(allNotes));
}

function renderNotes() {
  const noteList = document.getElementById('noteList');
  noteList.innerHTML = '';

  for (let i = 0; i < notes.length; i++) {
    const note = notes[i];
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.style.backgroundColor = note.color;

    const noteTextElement = document.createElement('div');
    noteTextElement.contentEditable = true;

    // Replace newline characters with <br> elements
    noteTextElement.innerHTML = note.text.replace(/\n/g, '<br>');

    noteTextElement.addEventListener('input', () => {
      note.text = noteTextElement.innerHTML.replace(/<br>/g, '\n');
      saveNotesToLocalStorage();
    });

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', () => {
      deleteNote(i);
    });

    noteElement.appendChild(noteTextElement);
    noteElement.appendChild(deleteButton);
    noteList.appendChild(noteElement);
  }
}

function saveNotesToLocalStorage() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

renderNotes();

function updateNoteInLocalStorage(index, note) {
  const allNotes = JSON.parse(localStorage.getItem('allNotes'));
  allNotes[index] = note;
  localStorage.setItem('allNotes', JSON.stringify(allNotes));
  noteTextElement.addEventListener('input', () => {
    note.text = noteTextElement.textContent;
    updateNoteInLocalStorage(i, note);
  });
}

const noteTextElement = document.createElement('textarea');
noteTextElement.value = note.text;
noteTextElement.addEventListener('input', () => {
  note.text = noteTextElement.value;
  updateNoteInLocalStorage(i, note);
});