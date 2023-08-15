const noteList = document.getElementById('noteList');
const notes = JSON.parse(localStorage.getItem('notes')) || [];

function addNote() {
  const noteText = document.getElementById('noteText').value;
  const noteColor = document.getElementById('noteColor').value;

  if (noteText.trim() === '') {
    alert('Introduceți un text pentru notiță!');
    return;
  }

  const newNote = {
    text: noteText,
    color: noteColor
  };

  notes.push(newNote);
  saveNotes();
  updateNoteList();

  // Resetarea formularului
  document.getElementById('noteText').value = '';
}

function saveNotes() {
  localStorage.setItem('notes', JSON.stringify(notes));
}

function updateNoteList() {
  noteList.innerHTML = '';
  notes.forEach(function (note) {
    const noteElement = createNoteElement(note.text, note.color);
    noteList.appendChild(noteElement);
  });
}

function createNoteElement(text, color) {
  const noteContainer = document.createElement('div');
  noteContainer.classList.add('note-container');

  const noteElement = document.createElement('div');
  noteElement.classList.add('note', color);
  noteElement.setAttribute('contenteditable', 'true');

  const noteTextElement = document.createElement('span');
  noteTextElement.textContent = text;
  noteTextElement.classList.add('note-text');

  noteElement.appendChild(noteTextElement);

  noteTextElement.addEventListener('mouseenter', function () {
    if (noteTextElement.offsetWidth < noteTextElement.scrollWidth) {
      noteTextElement.title = text;
    }
  });

  noteTextElement.addEventListener('mouseleave', function () {
    noteTextElement.removeAttribute('title');
  });

  noteElement.addEventListener('input', function () {
    updateNoteText(noteElement);
  });

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Șterge';
  deleteButton.addEventListener('click', function () {
    deleteNoteContainer(noteContainer);
  });

  noteContainer.appendChild(noteElement);
  noteContainer.appendChild(deleteButton);

  return noteContainer;
}

function updateNoteText(noteElement) {
  const index = Array.from(noteList.children).indexOf(noteElement);
  if (index !== -1) {
    notes[index].text = noteElement.textContent;
    saveNotes();
  }
}

function deleteNoteContainer(noteContainer) {
  const index = Array.from(noteList.children).indexOf(noteContainer);
  if (index !== -1) {
    notes.splice(index, 1);
    saveNotes();
    updateNoteList();
  }
}

updateNoteList();

document.getElementById('noteText').addEventListener('keyup', function(event) {
  if (event.key === 'Enter') {
    addNote();
  }
});