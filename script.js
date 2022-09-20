const removeBtn = document.createElement('button');
const addbtn = document.querySelector('.book__add-btn');
const bookTitle = document.querySelector('.book__title');
const bookOwner = document.querySelector('.book__owner');
const book = document.querySelector('.book');
const bookAuthor = document.getElementsByClassName('book__author');
const bookName = document.getElementsByClassName('book__name');
const bookItem = document.querySelector('.book__item');

let books;
if (localStorage.getItem('books') === null) {
  books = [];
} else {
  books = JSON.parse(localStorage.getItem('books'));
}

document.querySelector('.book__add').addEventListener('click', function (e) {
  e.preventDefault();
});

window.addEventListener('load', (e) => {
  e.preventDefault();
  const data = [...JSON.parse(localStorage.getItem('storageBooksData'))];
  bookTitle.value = '';
  bookOwner.value = '';
  if (data.length > 0) {
    book.innerHTML = data
      .map(
        (bookList, i) => ` <div class="book__list">
        <p class="book__name">${bookList.title}</p>
       <p class="book__author">${bookList.author}</p>
      <button type="button" class="book__remove" id=book-${i}>Remove</button></div>
      `
      )
      .join('');
  }

  const list = document.getElementsByClassName('book__list');
  const removeBtn = document.querySelectorAll('.book__remove');
  removeBtn.forEach((element, i) =>
    element.addEventListener('click', function (e) {
      delBook(i);
      list[i].innerHTML = '';
    })
  );
});

addbtn.addEventListener('click', (e) => {
  e.preventDefault();

  const bookInfo = {
    title: bookTitle.value,
    author: bookOwner.value,
    id: books.length,
  };

  books.push(bookInfo);

  sendToLocal('storageBooksData', books);

  const displayBooks = books
    .map(
      (bookList, i) => ` <div class="book__list">
          <p class="book__name">${bookList.title}</p>
         <p class="book__author">${bookList.author}</p>
        <button type="button" class="book__remove" id=book-${i}>Remove</button></div>
        `
    )
    .join('');
  book.innerHTML = displayBooks;

  bookTitle.value = '';
  bookOwner.value = '';

  const list = document.getElementsByClassName('book__list');
  const removeBtn = document.querySelectorAll('.book__remove');
  removeBtn.forEach((element, i) =>
    element.addEventListener('click', function (e) {
      delBook(i);
      list[i].innerHTML = '';
    })
  );
});

function delBook(id) {
  const filteredBooks = books.filter((item) => item.id !== id);
  books = filteredBooks;
  sendToLocal('storageBooksData', filteredBooks);
}

function sendToLocal(a, b) {
  localStorage.setItem(a, JSON.stringify(b));
}
