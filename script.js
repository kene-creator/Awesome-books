const removeBtn = document.createElement('button');
const addbtn = document.querySelector('.book__add-btn');
const bookTitle = document.querySelector('.book__title');
const bookOwner = document.querySelector('.book__owner');
const book = document.querySelector('.book');
const bookAuthor = document.getElementsByClassName('book__author');
const bookName = document.getElementsByClassName('book__name');
const bookItem = document.querySelector('.book__item');

// let books;
// if (localStorage.getItem('books') === null) {
//   books = [];
// } else {
//   books = JSON.parse(localStorage.getItem('books'));
// }

// document.querySelector('.book__add').addEventListener('click', function (e) {
//   e.preventDefault();
// });

// window.addEventListener('load', (e) => {
//   e.preventDefault();
//   const data = [...JSON.parse(localStorage.getItem('storageBooksData'))];
//   bookTitle.value = '';
//   bookOwner.value = '';
//   if (data.length > 0) {
//     book.innerHTML = data
//       .map(
//         (bookList, i) => ` <div class="book__list">
//         <p class="book__name">${bookList.title}</p>
//        <p class="book__author">${bookList.author}</p>
//       <button type="button" class="book__remove" id=book-${i}>Remove</button></div>
//       `
//       )
//       .join('');
//   }

//   const list = document.getElementsByClassName('book__list');
//   const removeBtn = document.querySelectorAll('.book__remove');
//   removeBtn.forEach((element, i) =>
//     element.addEventListener('click', function (e) {
//       delBook(i);
//       list[i].innerHTML = '';
//     })
//   );
// });

// addbtn.addEventListener('click', (e) => {
//   e.preventDefault();

//   const bookInfo = {
//     title: bookTitle.value,
//     author: bookOwner.value,
//     id: books.length,
//   };

//   books.push(bookInfo);

//   sendToLocal('storageBooksData', books);

//   const displayBooks = books
//     .map(
//       (bookList, i) => ` <div class="book__list">
//           <p class="book__name">${bookList.title}</p>
//          <p class="book__author">${bookList.author}</p>
//         <button type="button" class="book__remove" id=book-${i}>Remove</button></div>
//         `
//     )
//     .join('');
//   book.innerHTML = displayBooks;

//   bookTitle.value = '';
//   bookOwner.value = '';

//   const list = document.getElementsByClassName('book__list');
//   const removeBtn = document.querySelectorAll('.book__remove');
//   removeBtn.forEach((element, i) =>
//     element.addEventListener('click', function (e) {
//       delBook(i);
//       list[i].innerHTML = '';
//     })
//   );
// });

// function delBook(id) {
//   const filteredBooks = books.filter((item) => item.id !== id);
//   books = filteredBooks;
//   sendToLocal('storageBooksData', filteredBooks);
// }

// function sendToLocal(a, b) {
//   localStorage.setItem(a, JSON.stringify(b));
// }

class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

class Book {
  // _books = [];
  _parentElement = document.querySelector('.books');
  _btnElement = document.querySelector('.book__add-btn');
  _bookContainer = document.querySelector('.book');
  _removeBook = document.querySelectorAll('.book__remove');
  _bookTitle = document.querySelector('.book__title');
  _bookOwner = document.querySelector('.book__owner');

  constructor(book = []) {
    this._books = book;
  }

  sendToLocal(a, b) {
    localStorage.setItem(a, JSON.stringify(b));
  }

  _getValue() {
    this._bookTitle.value = '';
    this._bookOwner.value = '';
  }

  _delBook(id) {
    const filteredBooks = this._books.filter((item) => item.id !== id);
    this.sendToLocal('storageBooksData', filteredBooks);
    return (this._books = filteredBooks);
  }

  addBooks() {
    this._btnElement.addEventListener('click', (e) => {
      e.preventDefault();

      const bookInfo = {
        title: bookTitle.value,
        author: bookOwner.value,
        id: this._books.length,
      };

      this._books.push(bookInfo);

      this.sendToLocal('storageBooksData', this._books);

      console.log(this._books);

      const displayBooks = this._books.map(this._generateMarkup).join('');
      this._bookContainer.innerHTML = displayBooks;

      this._getValue();

      const list = document.getElementsByClassName('book__list');
      const removeBtn = document.querySelectorAll('.book__remove');
      removeBtn.forEach((element, i) =>
        element.addEventListener('click', function () {
          console.log(i);
          // this._delBook(i);
          list[i].innerHTML = '';
        })
      );
    });
  }

  _generateMarkup(bookList, i) {
    return ` <div class="book__list">
    <p class="book__name">${bookList.title}</p>
   <p class="book__author">${bookList.author}</p>
  <button type="button" class="book__remove" id=book-${i}>Remove</button></div>
  `;
  }

  _refreshBookList() {
    window.addEventListener('load', (e) => {
      e.preventDefault();
      const data = [...JSON.parse(localStorage.getItem('storageBooksData'))];
      this._getValue();
      if (data.length > 0) {
        book.innerHTML = data.map(this._generateMarkup).join('');
      }

      const list = document.getElementsByClassName('book__list');
      const removeBtn = document.querySelectorAll('.book__remove');
      removeBtn.forEach((element, i) =>
        element.addEventListener('click', function (e) {
          // this._delBook(i);
          list[i].innerHTML = '';
        })
      );
    });
  }
}

const displayBooks = new Book();
displayBooks.addBooks();
displayBooks._refreshBookList();
console.log(displayBooks._books);
