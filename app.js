// مصفوفة لتخزين الملاحظات
let notes = JSON.parse(localStorage.getItem('notes')) || [];

// دالة لإضافة ملاحظة جديدة
function addNote() {
    const noteText = document.getElementById('noteText').value.trim();
    if (!noteText) {
        alert('الرجاء إدخال نص الملاحظة');
        return;
    }
    
    const newNote = {
        id: Date.now(),
        text: noteText,
        date: new Date().toLocaleString('ar-EG')
    };
    
    notes.push(newNote);
    saveNotes();
    document.getElementById('noteText').value = '';
    displayNotes();
}

// دالة لحفظ الملاحظات في localStorage
function saveNotes() {
    localStorage.setItem('notes', JSON.stringify(notes));
}

// دالة لعرض جميع الملاحظات
function displayNotes() {
    const notesList = document.getElementById('notesList');
    notesList.innerHTML = '';
    
    if (notes.length === 0) {
        notesList.innerHTML = '<p style="grid-column:1/-1;text-align:center">لا توجد ملاحظات حتى الآن</p>';
        return;
    }
    
    notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.className = 'note';
        noteElement.innerHTML = `
            <p>${note.text}</p>
            <small>${note.date}</small>
            <button class="delete-btn" onclick="deleteNote(${note.id})">حذف</button>
        `;
        notesList.appendChild(noteElement);
    });
}

// دالة لحذف ملاحظة
function deleteNote(id) {
    if (confirm('هل أنت متأكد من حذف هذه الملاحظة؟')) {
        notes = notes.filter(note => note.id !== id);
        saveNotes();
        displayNotes();
    }
}

// عرض الملاحظات عند تحميل الصفحة
window.onload = displayNotes;