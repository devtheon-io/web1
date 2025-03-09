// Book array to hold the book objects
let books = JSON.parse(localStorage.getItem("books")) || [];

// DOM Elements
const bookForm = document.getElementById('bookForm');
const bookTitle = document.getElementById('bookTitle');
const bookAuthor = document.getElementById('bookAuthor');
const bookList = document.getElementById('bookList');
const bookIdInput = document.getElementById('bookId');

// Display books in the list
function renderBooks() {
  bookList.innerHTML = "";
  books.forEach((book, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${book.title} by ${book.author} 
                    <button onclick="editBook(${index})">Edit</button>
                    <button onclick="deleteBook(${index})">Delete</button>`;
    bookList.appendChild(li);
  });
}

// Add or update a book
function addOrUpdateBook(event) {
  event.preventDefault();

  const title = bookTitle.value.trim();
  const author = bookAuthor.value.trim();

  if (!title || !author) {
    alert("Please provide both title and author!");
    return;
  }

  if (bookIdInput.value) {
    // Update book
    const bookIndex = bookIdInput.value;
    books[bookIndex] = { title, author };
    alert("Book updated!");
  } else {
    // Add book
    books.push({ title, author });
    alert("Book added!");
  }

  // Save to localStorage
  localStorage.setItem("books", JSON.stringify(books));
  
  // Clear form and refresh list
  bookForm.reset();
  renderBooks();
}

// Edit a book
function editBook(index) {
  const book = books[index];
  bookTitle.value = book.title;
  bookAuthor.value = book.author;
  bookIdInput.value = index;
}

// Delete a book
function deleteBook(index) {
  books.splice(index, 1);
  localStorage.setItem("books", JSON.stringify(books));
  renderBooks();
}

// Initialize by rendering books
renderBooks();

// Attach event to the form
bookForm.addEventListener("submit", addOrUpdateBook);
