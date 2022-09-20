const removeBtn = document.createElement('button');
const addbtn = document.querySelector('.book__add-btn');
const bookTitle = document.querySelector('.book__title');
const bookOwner = document.querySelector('.book__owner');
const book = document.querySelector('.book');
const bookAuthor = document.getElementsByClassName('book__author');
const bookName = document.getElementsByClassName('book__name');
const bookItem = document.querySelector('.book__item');

const bookList = [];
const bookDisplay = [];

addbtn.addEventListener('click', (e) => {
  e.preventDefault();
  const bookInfo = {
    title: bookTitle.value,
    author: bookOwner.value,
  };

  bookList.push(bookInfo);
  localStorage.setItem('data', JSON.stringify(bookInfo));

  const bookData = JSON.parse(localStorage.getItem('data'));

  bookDisplay.push(bookData[bookData.length - 1]);

  const displayBooks = bookList
    .map(
      (bookList, i) => ` <div class="book__list">
          <p class="book__name">${bookList.title}</p>
         <p class="book__author">${bookList.author}</p>
        <button type="button" class="book__remove" id=book-${i}>Remove</button></div>
        `
    )
    .join('');

  book.innerHTML = displayBooks;

  const list = document.getElementsByClassName('book__list');
  const removeBtn = document.querySelectorAll('.book__remove');
  removeBtn.forEach((element, i) =>
    element.addEventListener('click', function (e) {
      localStorage.clear();
      list[i].innerHTML = '';
    })
  );
});
