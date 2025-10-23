const myLibrary = [];
const dialogForm = document.getElementById("dialog-form");
const formAddBook = document.getElementById("form-add-book");
const buttonAddBook = document.getElementById("button-add-book");
const buttonDisplayBooks = document.getElementById('button-display-books');
const buttonSubmit = document.getElementById('button-submit');
const buttonClose = document.getElementById('button-close');
const tableBooks = document.getElementById('table-books');
const tbodyBooks = document.getElementById('tbody-books');
const inputAuthor = document.getElementById('input-author');
const inputTitle = document.getElementById('input-title');
const inputPages = document.getElementById('input-pages');
const inputRead = document.getElementById('select-read');

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary() {
  const book = new Book(inputAuthor.value, inputTitle.value, inputPages.value, inputRead.value);
  myLibrary.push(book);

  const bookData = [
    book.author, 
    book.title, 
    book.pages, 
  ];

  const row = document.createElement('tr');
  row.dataset.bookID = book.id;
  bookData.forEach(data => {
    const cell = document.createElement('td');
    cell.textContent = data;
    row.appendChild(cell);
  })

  const readCell = document.createElement('td');
  const readSelect = document.createElement('select');
  readSelect.id = book.id;
  const yesOption = document.createElement('option');
  yesOption.textContent = 'Yes';
  yesOption.value = 'Yes';
  const noOption = document.createElement('option');
  noOption.textContent = 'No';
  noOption.value = 'No';
  readSelect.append(yesOption);
  readSelect.append(noOption);
  readCell.append(readSelect);
  row.append(readCell);

  console.log(myLibrary)

  const delCell = document.createElement('td');
  const delButton = document.createElement('button');
  delButton.textContent = "Remove book";
  delCell.append(delButton);
  row.append(delCell);
  tbodyBooks.append(row)

  delButton.addEventListener('click', () => {
    row.remove();
    bookIndexToRemove = myLibrary.findIndex(item => item.id === book.id);
    myLibrary.splice(bookIndexToRemove, 1);
  })

  readSelect.addEventListener('change', e => {
    book.read = e.target.value;
    console.log(myLibrary);
  })
}

buttonDisplayBooks.addEventListener('click', () => {
  tableBooks.hidden = !tableBooks.hidden;
})

buttonAddBook.addEventListener("click", () => dialogForm.showModal());
buttonSubmit.addEventListener("click", e => {
  e.preventDefault();

  if (formAddBook.reportValidity()) {
    addBookToLibrary();
    formAddBook.reset();
    dialogForm.close();
  };
});

buttonClose.addEventListener('click', () => {
  formAddBook.reset();
  dialogForm.close();
});


