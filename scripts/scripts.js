const myLibrary = [];

const addBookBtn = document.getElementById('add-book-btn');
const bookContainer = document.getElementById('book-container');

function Book(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;

}

function addBookToLibrary(title, author, pages, read, id) {

}