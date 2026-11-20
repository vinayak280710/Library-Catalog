# 📚 City Digital Library — Multi-Page Digital Book Catalog

A responsive, multi-page digital library catalog built with semantic **HTML5**, external **CSS3**, and vanilla **JavaScript**. Designed for students and librarians to browse books, check real-time availability, filter by title or author, toggle checkout status (`Available` / `Issued`), and register new books with client-side persistence.

🔗 **Live Demo:** [https://vinayak280710.github.io/Library-Catalog/](https://vinayak280710.github.io/Library-Catalog/)

---

## ✨ Key Features

* **Multi-Page HTML5 Architecture:** Clean navigation across three interconnected pages (`Home`, `Book Catalog`, and `Add New Book`).
* **Live Library Statistics:** Real-time counters for **Total Books**, **Available Now**, and **Currently Issued** on the Home dashboard.
* **Instant Search & Status Filtering:** Filter the catalog table dynamically by book title, author name, or availability status (`All`, `Available`, `Issued`).
* **One-Click Status Toggle:** Issue or return any book directly from the table with color-coded `Available` (green) and `Issued` (red) badges and row hover highlights.
* **Add New Books:** Dedicated form page (`add-book.html`) to add new titles to the catalog, saved automatically via `localStorage`.
* **Responsive Design:** Adapts cleanly across desktop and mobile viewports using Flexbox, CSS Grid, and horizontal table overflow handling.

---

## 🛠️ Technologies Used

* **HTML5:** Semantic structure (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), tables, and validated forms.
* **CSS3:** External stylesheet (`style.css`) with Flexbox, CSS Grid, hover transitions, and pill-shaped status badges.
* **JavaScript (ES6):** DOM manipulation, live event filtering, and `localStorage` state persistence.
* **Git & GitHub Pages:** Version control and automated deployment via GitHub Actions (`.github/workflows/static.yml`).

---

## 📂 Project Structure

```text
Library-Catalog/
├── .github/workflows/
│   └── static.yml    # GitHub Actions workflow for GitHub Pages deployment
├── index.html        # Home page with hero banner and live book statistics
├── catalog.html      # Searchable book inventory table and status toggle buttons
├── add-book.html     # Form to add new books into the digital catalog
├── style.css         # Shared external stylesheet for layout, table, and badges
├── script.js         # JavaScript for live search, status toggling, and localStorage
├── .nojekyll         # Bypasses Jekyll processing on GitHub Pages
└── README.md         # Project documentation
