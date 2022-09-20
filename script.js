const removeBtn = document.createElement('button');
const addbtn = document.querySelector('.book__add-btn');
const form = document.querySelector('.book__add');
const bookTitle = document.querySelector('.book__title');
const bookOwner = document.querySelector('.book__owner');
const book = document.querySelector('.book');
const bookAuthor = document.getElementsByClassName('book__author');
const bookName = document.getElementsByClassName('book__name');
const bookItem = document.querySelector('.book__item');

// const bookDisplay = [];
// const bookList = [];

// let data = JSON.parse(localStorage.getItem('storageBooksData'))
//   ? JSON.parse(localStorage.getItem('storageBooksData'))
//   : [];

let books;
if (localStorage.getItem('books') === null) {
  books = [];
} else {
  books = JSON.parse(localStorage.getItem('books'));
}

function createBooks() {
  const displayBooks = books
    .map(
      (
        bookList
      ) => `<div id="remove"><p class="book__name">${bookList.title}</p>
<p class="author-name">${bookList.author}</p>
<button type="button" onclick="delBook(${bookList.id})" class="book__remove">Remove</button><hr></div>
`
    )
    .join('');
  book.innerHTML = displayBooks;
}
document.addEventListener('DOMContentLoaded', () => {
  createBooks();
});

function sendToLocal(a, b) {
  localStorage.setItem(a, JSON.stringify(b));
  createBooks();
}

function addBook(bookItem) {
  books.push(bookItem);
  sendToLocal('storageBooksData', books);
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const bookObject = {
    id: books.length,
    title: bookTitle.value,
    author: bookOwner.value,
  };
  addBook(bookObject);
  bookTitle.value = '';
  bookOwner.value = '';
});

// eslint-disable-next-line no-unused-vars
function delBook(id) {
  const filteredBooks = books.filter((item) => item.id !== id);
  bookData = filteredBooks;
  sendToLocal('storageBooksData', filteredBooks);
}
