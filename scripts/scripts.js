const myLibrary = [];
let editBookId = null; 

// DOM Elements
const addBookBtn = document.getElementById('add-book-btn');
const closeBtn = document.getElementById('close-form-btn');
const bookContainer = document.getElementById('book-container');
const formOverlay = document.getElementById('form-overlay');
const bookForm = document.getElementById('add-book-form');

// Functions
function Book(title, author, pages, read, coverImg) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.coverImg = coverImg;
    this.id = crypto.randomUUID();
}

function addBookToLibrary() {
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    const coverInput = document.getElementById('cover');
    
    if (editBookId) {
        const bookIndex = myLibrary.findIndex(b => b.id === editBookId);
        if (bookIndex !== -1) {
            myLibrary[bookIndex].title = title;
            myLibrary[bookIndex].author = author;
            myLibrary[bookIndex].pages = pages;
            myLibrary[bookIndex].read = read;
            
            if (coverInput.files && coverInput.files[0]) {
                myLibrary[bookIndex].coverImg = URL.createObjectURL(coverInput.files[0]);
            }
        }
        editBookId = null; 
        document.querySelector('#add-book-form h2').textContent = "Add New Book";
    } else {
        let coverUrl = '';
        if (coverInput.files && coverInput.files[0]) {
            coverUrl = URL.createObjectURL(coverInput.files[0]);
        }
        const newBook = new Book(title, author, pages, read, coverUrl);
        myLibrary.push(newBook);
    }

    renderLibrary();
    bookForm.reset(); 
    coverInput.value = ''; 
    formOverlay.style.display = 'none';
}

function renderLibrary() {
    bookContainer.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');

        const coverHtml = book.coverImg 
            ? `<img src="${book.coverImg}" class="book-cover" alt="${book.title} cover">`
            : `<div class="book-cover-placeholder">No Cover Available</div>`;

        const statusClass = book.read ? 'read-btn' : 'not-read-btn';
        const statusStyle = book.read 
            ? 'background-color: #d4edda; color: #155724;' 
            : 'background-color: #f8d7da; color: #721c24;';

        bookCard.innerHTML = `
            ${coverHtml}
            <h3>"${book.title}"</h3>
            <p class="author">By: ${book.author}</p>
            <p class="pages">${book.pages} pages</p>
            
            <!-- Toggle Read Button -->
            <button type="button" class="status-btn ${statusClass}" style="${statusStyle}" onclick="toggleReadStatus('${book.id}')">
                ${book.read ? 'Read' : 'Not Read Yet'}
            </button>
            
            <!-- Edit Button Row -->
            <div style="display: flex; gap: 8px; margin-top: 8px;">
                <button type="button" class="edit-btn" onclick="openEditModal('${book.id}')" style="flex: 1; background-color: #e0e0e0; color: #333;">Edit</button>
                <button type="button" class="delete-btn" onclick="deleteBook(${index})" style="flex: 1; background-color: #ffb3b3; color: #721c24;">Remove</button>
            </div>
        `;
        
        bookContainer.appendChild(bookCard);
    });
}

window.toggleReadStatus = function(id) {
    const book = myLibrary.find(b => b.id === id);
    if (book) {
        book.read = !book.read; 
        renderLibrary(); 
    }
};

window.openEditModal = function(id) {
    const book = myLibrary.find(b => b.id === id);
    if (book) {
        editBookId = book.id; 
        
        document.querySelector('#add-book-form h2').textContent = "Edit Book Details";
        
        document.getElementById('title').value = book.title;
        document.getElementById('author').value = book.author;
        document.getElementById('pages').value = book.pages;
        document.getElementById('read').checked = book.read;
     
        formOverlay.style.display = 'flex';
    }
};

window.deleteBook = function(index) {
    myLibrary.splice(index, 1);
    renderLibrary();
};

// Event Listeners 
addBookBtn.addEventListener('click', () => {
    editBookId = null; 
    document.querySelector('#add-book-form h2').textContent = "Add New Book";
    bookForm.reset();
    formOverlay.style.display = 'flex'; 
});

closeBtn.addEventListener('click', () => {
    formOverlay.style.display = 'none';
});

bookForm.addEventListener('submit', function(event) {
    event.preventDefault();
    addBookToLibrary();
});