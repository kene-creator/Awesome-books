class Store {
  getBooks() {
    let books;
    if (localStorage.getItem('storageBooksData') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('storageBooksData'));
    }

    return books;
  }

  removeBook(id) {
    const books = this.getBooks();

    books.forEach((book, index) => {
      if (book.id === id) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('storageBooksData', JSON.stringify(books));
  }
}

class Book {
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

  background() {
    this._books.map((n) => {
      n % 2 === 0
        ? (document.getElementsByClassName('book__list').style.backgroundolor =
            'white')
        : (document.getElementsByClassName('book__list').style.backgroundColor =
            'black');
    });
  }

  addBooks() {
    this._btnElement.addEventListener('click', (e) => {
      e.preventDefault();

      const bookInfo = {
        title: this._bookTitle.value,
        author: this._bookOwner.value,
        bgColor: this._books.length % 2 === 0 ? 'bg-white' : 'bg-dark',
        id: this._books.length,
      };

      this._books.push(bookInfo);

      this.sendToLocal('storageBooksData', this._books);

      const displayBooks = this._books.map(this._generateMarkup).join('');
      this._bookContainer.innerHTML = displayBooks;

      this._getValue();

      const list = document.getElementsByClassName('book__list');
      const removeBtn = document.querySelectorAll('.book__remove');

      removeBtn.forEach((element, i) =>
        element.addEventListener('click', function () {
          list[i].innerHTML = '';
          const rem = new Store();
          rem.removeBook(i);
        })
      );
    });
  }

  _generateMarkup(bookList, i) {
    return ` <div class="book__list ${bookList.bgColor}">
    <div class="book__info">
    <p class="book__name">${bookList.title} <span class="by">by</span></p>
   <p class="book__author">${bookList.author}</p>
    </div>
    
  <button type="button" class="book__remove" id=book-${i}>Remove</button></div>
  `;
  }

  _refreshBookList() {
    window.addEventListener('load', (e) => {
      e.preventDefault();

      const get = new Store();
      this._getValue();
      if (get.getBooks().length > 0) {
        this._bookContainer.innerHTML = get
          .getBooks()
          .map(this._generateMarkup)
          .join('');
      }

      const list = document.getElementsByClassName('book__list');
      const removeBtn = document.querySelectorAll('.book__remove');

      removeBtn.forEach((element, i) =>
        element.addEventListener('click', function () {
          list[i].innerHTML = '';
          const rem = new Store();
          rem.removeBook(i);
        })
      );
    });
  }
}

class Navigation extends Book {
  _listLink = document.querySelectorAll('.nav__items');
  _nav = document.querySelector('.nav');
  _contianer = document.querySelector('.contianer');
  _parentElement = document.querySelector('.books');

  date() {
    const options = { year: 'numeric', month: 'long', weekday: 'long' };
    const date = new Date();
    const dateFormat = new Intl.DateTimeFormat('en-US', options).format(date);
    document.querySelector('.date_value').textContent = `${dateFormat}`;
  }

  link() {
    this._listLink.forEach((item, i) =>
      item.setAttribute('id', `item-${i + 1}`)
    );
    const linkOne = document.querySelector('#item-1');
    const linkTwo = document.querySelector('#item-2');
    const linkThree = document.querySelector('#item-3');

    window.addEventListener('load', () => {
      document.querySelector('.book__add').classList.add('hidden');
    });

    linkOne.addEventListener('click', function (e) {
      if (!linkOne.classList.contains('active')) {
        linkOne.classList.add('active');
        linkTwo.classList.remove('active');
        linkThree.classList.remove('active');
        document.querySelector('.book__heading').classList.remove('hidden');
        document.querySelector('.book__add').classList.add('hidden');
        document.querySelector('.contact').classList.add('hidden');
        document.querySelector('.book').classList.remove('hidden');
      } else {
        linkOne.classList.remove('active');
        // document.querySelector('.book__add').classList.remove('hidden');
      }
    });
    linkTwo.addEventListener('click', function (e) {
      if (!linkTwo.classList.contains('active')) {
        linkOne.classList.remove('active');
        linkTwo.classList.add('active');
        linkThree.classList.remove('active');
        document.querySelector('.book__heading').classList.add('hidden');
        document.querySelector('.book').classList.add('hidden');
        document.querySelector('.contact').classList.add('hidden');
        document.querySelector('.book__add').classList.remove('hidden');
      } else {
        linkTwo.classList.remove('active');
        // document.querySelector('.book').classList.remove('hidden');
      }
    });
    linkThree.addEventListener('click', function (e) {
      if (!linkThree.classList.contains('active')) {
        linkOne.classList.remove('active');
        linkTwo.classList.remove('active');
        linkThree.classList.add('active');
        document.querySelector('.book__heading').classList.add('hidden');
        document.querySelector('.contact').classList.remove('hidden');
        document.querySelector('.book__add').classList.add('hidden');
      } else {
        linkThree.classList.remove('active');
      }
    });
  }
}

const displayBooks = new Book();
displayBooks.addBooks();
displayBooks._refreshBookList();

const navDisplay = new Navigation();
navDisplay.link();
navDisplay.date();
