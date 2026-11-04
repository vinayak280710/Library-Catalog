// Dataset
let books = [
    { id: 1, title: "Clean Code", author: "Robert C. Martin", genre: "Software Engineering", available: true },
    { id: 2, title: "Introduction to Algorithms", author: "Thomas H. Cormen", genre: "Computer Science", available: false },
    { id: 3, title: "The Pragmatic Programmer", author: "Andy Hunt & Dave Thomas", genre: "Software Engineering", available: true },
    { id: 4, title: "Design Patterns", author: "Erich Gamma et al.", genre: "Architecture", available: true },
    { id: 5, title: "Computer Systems: A Programmer's Perspective", author: "Randal E. Bryant", genre: "Systems", available: false },
    { id: 6, title: "Automate the Boring Stuff with Python", author: "Al Sweigart", genre: "Programming", available: true }
];

let activeFilter = "all";

// DOM Elements
const catalogBody = document.getElementById("catalogBody");
const searchInput = document.getElementById("searchInput");
const clearSearchBtn = document.getElementById("clearSearch");
const filterPills = document.querySelectorAll(".filter-pill");
const totalCount = document.getElementById("totalCount");
const availableCount = document.getElementById("availableCount");
const issuedCount = document.getElementById("issuedCount");
const toast = document.getElementById("toast");

// Update top statistical cards
function updateStats() {
    const total = books.length;
    const available = books.filter(b => b.available).length;
    const issued = total - available;

    totalCount.textContent = total;
    availableCount.textContent = available;
    issuedCount.textContent = issued;
}

// Show a temporary snackbar / toast alert
function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => {
        toast.classList.remove("show");
    }, 2400);
}

// Render dynamic rows
function renderCatalog() {
    catalogBody.innerHTML = "";
    const query = searchInput.value.trim().toLowerCase();

    // Show/hide clear search cross icon
    clearSearchBtn.style.display = query ? "block" : "none";

    // Filtering logic
    const filtered = books.filter(book => {
        const matchesSearch = 
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.genre.toLowerCase().includes(query);

        if (!matchesSearch) return false;

        if (activeFilter === "available") return book.available === true;
        if (activeFilter === "issued") return book.available === false;
        return true;
    });

    if (filtered.length === 0) {
        catalogBody.innerHTML = `
            <tr>
                <td colspan="5" class="no-results">🔍 No books found matching your criteria.</td>
            </tr>
        `;
        return;
    }

    filtered.forEach(book => {
        const row = document.createElement("tr");

        const statusClass = book.available ? "badge-available" : "badge-issued";
        const statusText = book.available ? "Available" : "Issued";
        const btnClass = book.available ? "btn-issue" : "btn-return";
        const btnText = book.available ? "Check Out ➔" : "Mark Returned ↩";

        row.innerHTML = `
            <td><strong>${book.title}</strong></td>
            <td>${book.author}</td>
            <td><span class="genre-tag">${book.genre}</span></td>
            <td>
                <span class="badge ${statusClass}">
                    <span class="dot"></span> ${statusText}
                </span>
            </td>
            <td class="text-center">
                <button class="toggle-btn ${btnClass}" onclick="toggleStatus(${book.id})">
                    ${btnText}
                </button>
            </td>
        `;
        catalogBody.appendChild(row);
    });

    updateStats();
}

// Toggle Book Status
function toggleStatus(bookId) {
    const book = books.find(b => b.id === bookId);
    if (book) {
        book.available = !book.available;
        const action = book.available ? "marked as Available" : "issued to a member";
        showToast(`"${book.title}" was ${action}!`);
        renderCatalog();
    }
}

// Event Listeners
searchInput.addEventListener("input", renderCatalog);

clearSearchBtn.addEventListener("click", () => {
    searchInput.value = "";
    renderCatalog();
    searchInput.focus();
});

filterPills.forEach(pill => {
    pill.addEventListener("click", () => {
        filterPills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        activeFilter = pill.dataset.filter;
        renderCatalog();
    });
});

// Initial boot
renderCatalog();
updateStats();