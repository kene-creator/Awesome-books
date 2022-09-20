const removeBtn = document.createElement('button');
const addbtn = document.querySelector('.book__add-btn');
const bookTitle = document.querySelector('.book__title');
const bookOwner = document.querySelector('.book__owner');
const book = document.querySelector('.book');
const bookAuthor = document.getElementsByClassName('book__author');
const bookName = document.getElementsByClassName('book__name');
const bookItem = document.querySelector('.book__item');

const bookDisplay = [];
const bookList = [];

window.addEventListener('load', () => {
  bookTitle.value = '';
  bookOwner.value = '';
  book.innerHTML = bookDisplay
    .map(
      (bookList, i) => ` <div class="book__list">
        <p class="book__name">${bookList.title}</p>
       <p class="book__author">${bookList.author}</p>
      <button type="button" class="book__remove" id=book-${i}>Remove</button></div>
      `
    )
    .join('');
  const list = document.getElementsByClassName('book__list');
  const removeBtn = document.querySelectorAll('.book__remove');
  removeBtn.forEach((element, i) =>
    element.addEventListener('click', function (e) {
      // localStorage.clear();
      localStorage.removeItem('data', i);
      localStorage.key(i - 1);
      bookDisplay.splice(i, 1);
      bookList.splice(i, 1);
      list[i].innerHTML = '';
    })
  );
});

addbtn.addEventListener('click', (e) => {
  e.preventDefault();

  const bookInfo = {
    title: bookTitle.value,
    author: bookOwner.value,
  };

  bookList.push(bookInfo, ...bookDisplay);

  localStorage.setItem('data', JSON.stringify(bookList));

  console.log(bookList);

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

  bookTitle.value = '';
  bookOwner.value = '';

  const list = document.getElementsByClassName('book__list');
  const removeBtn = document.querySelectorAll('.book__remove');
  removeBtn.forEach((element, i) =>
    element.addEventListener('click', function (e) {
      // localStorage.clear();
      localStorage.removeItem('data', i);
      bookDisplay.splice(i, 1);
      bookList.splice(i, 1);
      list[i].innerHTML = '';
    })
  );
});

const bookData = JSON.parse(localStorage.getItem('data'));
bookDisplay.push(...bookData);
console.log(bookData);
console.log(bookDisplay);
// console.log(JSON.parse(localStorage.getItem('data')));
