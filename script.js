const myLibrary = [];

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
}

book1 = new Book("book1", "author1", 1000, false);
book2 = new Book("book2", "author2", 1001, false);
book3 = new Book("book3", "author3", 1002, true);
addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

showLibrary();

function addBookToLibrary(book) {
  book.index = myLibrary.length;
  myLibrary.push(book);
}

function showLibrary() {
  let ul = document.querySelector(".book-list");
  myLibrary.forEach((book) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");

    btn.classList.add("btn-rmv");
    btn.textContent = "Remove";

    let msg = book.isRead ? "read already" : "not read yet";

    li.textContent = `${book.name} by ${book.author}, ${book.pages} pages, ${msg} `;
    li.id = "book" + book.index;

    li.appendChild(btn);
    ul.appendChild(li);
  });
}
