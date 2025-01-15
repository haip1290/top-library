const myLibrary = [];
let id = 1;

function Book(name, author, pages, isRead) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.id = id++;
}

document.addEventListener("DOMContentLoaded", () => {
  addDefaultBooks();
  showLibrary();
});

const dialog = document.querySelector("dialog");
const showBtn = document.querySelector(".btn-show");
const submitBtn = document.querySelector(".btn-submit");
const closeBtn = document.querySelector(".btn-close");
const form = dialog.querySelector("form");

showBtn.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let title = document.querySelector("#title").value.trim();
  let author = document.querySelector("#author").value.trim();
  let pages = document.querySelector("#pages").value.trim();
  let isRead = document.querySelector("#isRead").checked;
  let newBook = new Book(title, author, pages, isRead);

  if (!title || !author || !pages || isNaN(pages) || pages < 0) {
    alert("Please fill out fills correctly");
  }

  addBookToLibrary(newBook);
  form.reset();
  dialog.close();
});

dialog.addEventListener("close", () => {
  showLibrary();
});

function addDefaultBooks() {
  book1 = new Book("book1", "author1", 1000, false);
  addBookToLibrary(book1);
  book2 = new Book("book2", "author2", 1001, false);
  addBookToLibrary(book2);
  book3 = new Book("book3", "author3", 1002, true);
  addBookToLibrary(book3);
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

function showLibrary() {
  let ul = document.querySelector(".book-list");
  ul.textContent = "";

  myLibrary.forEach((book) => {
    const li = document.createElement("li");
    const rmvBtn = document.createElement("button");
    const readBtn = document.createElement("button");

    rmvBtn.classList.add("btn-rmv");
    rmvBtn.textContent = "Remove";
    rmvBtn.addEventListener("click", () => {
      removeBook(book.id);
    });

    readBtn.classList.add("btn-read");
    readBtn.textContent = "Read";
    readBtn.addEventListener("click", () => {
      changeReadStatus(book.id);
    });

    let textNode = document.createTextNode(
      `${book.name} by ${book.author}, ${book.pages} pages, ${
        book.isRead ? "read already" : "not read yet"
      } `
    );
    li.id = "book" + book.id;
    li.appendChild(textNode);
    li.appendChild(rmvBtn);
    li.appendChild(readBtn);
    ul.appendChild(li);
  });
}

function removeBook(id) {
  const idToRmv = myLibrary.findIndex((book) => book.id === id);
  if (idToRmv !== -1) {
    myLibrary.splice(idToRmv, 1);
    let li = document.querySelector("#book" + idToRmv);
    if (li) {
      li.remove();
    }
  }
}

function changeReadStatus(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.isRead = !book.isRead;
    showLibrary();
  } else {
    console.error(`Book at id ${id} does not exist`);
  }
}
