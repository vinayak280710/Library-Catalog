// Initial default book list
const defaultBooks = [
  { id: 1, title: "Clean Code", author: "Robert C. Martin", genre: "Computer Science", status: "Available" },
  { id: 2, title: "The Pragmatic Programmer", author: "Andrew Hunt", genre: "Computer Science", status: "Issued" },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction", status: "Available" },
  { id: 4, title: "A Brief History of Time", author: "Stephen Hawking", genre: "Science", status: "Available" },
  { id: 5, title: "1984", author: "George Orwell", genre: "Fiction", status: "Issued" },
  { id: 6, title: "Sapiens", author: "Yuval Noah Harari", genre: "History", status: "Available" }
];

// Load books from localStorage or initialize with defaults
function getBooks() {
  const stored = localStorage.getItem("libraryBooks");
  if (!stored) {
    localStorage.setItem("libraryBooks", JSON.stringify(defaultBooks));
    return defaultBooks;
  }
  return JSON.parse(stored);
}

// Save updated books array to localStorage
function saveBooks(books) {
  localStorage.setItem("libraryBooks", JSON.stringify(books));
}

// 1. HOME PAGE LOGIC: Update summary statistics
function initHomePage() {
  const totalEl = document.getElementById("total-count");
  if (!totalEl) return; // Exit if not on index.html

  const books = getBooks();
  const availableCount = books.filter(book => book.status === "Available").length;
  const issuedCount = books.filter(book => book.status === "Issued").length;

  totalEl.textContent = books.length;
  document.getElementById("available-count").textContent = availableCount;
  document.getElementById("issued-count").textContent = issuedCount;
}

// 2. CATALOG PAGE LOGIC: Render table, search filter, and toggle status
function initCatalogPage() {
  const tbody = document.getElementById("books-tbody");
  if (!tbody) return; // Exit if not on catalog.html

  const searchInput = document.getElementById("search-input");
  const statusFilter = document.getElementById("status-filter");
  const noResults = document.getElementById("no-results");

  function renderTable() {
    const books = getBooks();
    const query = searchInput.value.toLowerCase().trim();
    const selectedStatus = statusFilter.value;

    // Filter by title/author and dropdown status
    const filteredBooks = books.filter(book => {
      const matchesQuery =
        book.title.toLowerCase().includes(query) ||
        book.author.toLowerCase().includes(query);
      const matchesStatus =
        selectedStatus === "all" || book.status === selectedStatus;

      return matchesQuery && matchesStatus;
    });

    tbody.innerHTML = "";

    if (filteredBooks.length === 0) {
      noResults.classList.remove("hidden");
      return;
    } else {
      noResults.classList.add("hidden");
    }

    // Build table rows
    filteredBooks.forEach(book => {
      const tr = document.createElement("tr");

      const isAvailable = book.status === "Available";
      const badgeClass = isAvailable ? "badge-available" : "badge-issued";
      const buttonLabel = isAvailable ? "Issue Book" : "Return Book";

      tr.innerHTML = `
        <td><strong>${book.title}</strong></td>
        <td>${book.author}</td>
        <td>${book.genre}</td>
        <td><span class="badge ${badgeClass}">${book.status}</span></td>
        <td>
          <button class="btn-toggle" data-id="${book.id}">
            ${buttonLabel}
          </button>
        </td>
      `;

      tbody.appendChild(tr);
    });
  }

  // Toggle status when clicking the action button
  tbody.addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-toggle")) {
      const bookId = Number(event.target.getAttribute("data-id"));
      const books = getBooks();

      const updatedBooks = books.map(book => {
        if (book.id === bookId) {
          return {
            ...book,
            status: book.status === "Available" ? "Issued" : "Available"
          };
        }
        return book;
      });

      saveBooks(updatedBooks);
      renderTable();
    }
  });

  // Live search & filter event listeners
  searchInput.addEventListener("input", renderTable);
  statusFilter.addEventListener("change", renderTable);

  // Initial table render
  renderTable();
}

// 3. ADD BOOK PAGE LOGIC: Handle form submission
function initAddBookPage() {
  const form = document.getElementById("add-book-form");
  if (!form) return; // Exit if not on add-book.html

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = document.getElementById("book-title").value.trim();
    const author = document.getElementById("book-author").value.trim();
    const genre = document.getElementById("book-genre").value;
    const status = document.getElementById("book-status").value;

    const books = getBooks();
    const newBook = {
      id: Date.now(), // Unique ID based on timestamp
      title,
      author,
      genre,
      status
    };

    books.push(newBook);
    saveBooks(books);

    // Redirect back to catalog to view the newly added book
    window.location.href = "catalog.html";
  });
}

// Initialize the appropriate page logic once the DOM loads
document.addEventListener("DOMContentLoaded", () => {
  initHomePage();
  initCatalogPage();
  initAddBookPage();
});