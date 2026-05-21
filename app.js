// js/app.js

document.addEventListener('DOMContentLoaded', () => {

    // --- Toast Notification System ---
    const toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container';
    document.body.appendChild(toastContainer);

    const showToast = (message, type = 'success') => {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icon = document.createElement('i');
        icon.className = type === 'success' ? 'fas fa-check-circle' : 'fas fa-exclamation-circle';
        icon.style.color = type === 'success' ? 'var(--accent-color)' : 'var(--danger-color)';

        const text = document.createElement('span');
        text.innerText = message;

        toast.appendChild(icon);
        toast.appendChild(text);
        toastContainer.appendChild(toast);

        // Auto remove
        setTimeout(() => {
            toast.classList.add('fade-out');
            toast.addEventListener('animationend', () => {
                if (toastContainer.contains(toast)) toastContainer.removeChild(toast);
            });
        }, 3000);
    };

    // --- LocalStorage Setup ---
    function initDB() {
        const existing = localStorage.getItem('bookvault_books');
        let shouldReset = false;
        
        if (!existing) {
            shouldReset = true;
        } else {
            try {
                const parsed = JSON.parse(existing);
                // If it is the old dummy list (length <= 17), upgrade it to load the recollected books
                if (parsed.length <= 17) {
                    shouldReset = true;
                }
            } catch (e) {
                shouldReset = true;
            }
        }
        
        if (shouldReset) {
            const dummyData = [
                { id: 1, title: "The Immortals of Meluha", author: "Amish Tripathi", genre: "Mythology", status: "Completed", rating: 5, totalPages: 415, pagesRead: 415, notes: "Fascinating reimagining of Lord Shiva's journey.", checklist: ["Started", "Currently Reading", "Completed", "Notes Added"] },
                { id: 2, title: "Dharmayoddha Kalki", author: "Kevin Missal", genre: "Mythology", status: "Currently Reading", rating: 0, totalPages: 380, pagesRead: 150, notes: "Intriguing take on the 10th Avatar.", checklist: ["Started", "Currently Reading"] },
                { id: 3, title: "The Hidden Hindu", author: "Akshat Gupta", genre: "Mythology", status: "To Read", rating: 0, totalPages: 320, pagesRead: 0, notes: "", checklist: [] },
                { id: 4, title: "Dune", author: "Frank Herbert", genre: "Science", status: "Completed", rating: 5, totalPages: 412, pagesRead: 412, notes: "Spice must flow.", checklist: ["Started", "Currently Reading", "Completed"] },
                { id: 5, title: "Project Hail Mary", author: "Andy Weir", genre: "Science", status: "Currently Reading", rating: 5, totalPages: 476, pagesRead: 200, notes: "Amaze!", checklist: ["Started", "Currently Reading"] },
                { id: 6, title: "The Martian", author: "Andy Weir", genre: "Science", status: "To Read", rating: 0, totalPages: 369, pagesRead: 0, notes: "", checklist: [] },
                { id: 7, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", status: "Completed", rating: 5, totalPages: 309, pagesRead: 309, notes: "The boy who lived.", checklist: ["Started", "Currently Reading", "Completed"] },
                { id: 8, title: "The Lord of the Rings", author: "J.R.R. Tolkien", genre: "Fantasy", status: "Currently Reading", rating: 0, totalPages: 1178, pagesRead: 400, notes: "One ring to rule them all.", checklist: ["Started", "Currently Reading"] },
                { id: 9, title: "Percy Jackson and the Lightning Thief", author: "Rick Riordan", genre: "Fantasy", status: "To Read", rating: 0, totalPages: 377, pagesRead: 0, notes: "", checklist: [] },
                { id: 10, title: "A Game of Thrones", author: "George R.R. Martin", genre: "Fantasy", status: "To Read", rating: 0, totalPages: 835, pagesRead: 0, notes: "Epic dark fantasy series.", checklist: [] },
                { id: 11, title: "Can I Get a Chocolate Milkshake?", author: "Unknown", genre: "Productivity", status: "Completed", rating: 4, totalPages: 250, pagesRead: 250, notes: "Great read.", checklist: ["Started", "Currently Reading", "Completed"] },
                { id: 12, title: "Boots, Belts, and Berets", author: "Tanushree Podder", genre: "Productivity", status: "To Read", rating: 0, totalPages: 280, pagesRead: 0, notes: "", checklist: [] },
                { id: 13, title: "You Can Win", author: "Shiv Kheda", genre: "Productivity", status: "Completed", rating: 5, totalPages: 290, pagesRead: 290, notes: "Highly motivational guide to success.", checklist: ["Started", "Currently Reading", "Completed"] },
                { id: 14, title: "Lone Fox Dancing", author: "Ruskin Bond", genre: "Biography", status: "Currently Reading", rating: 0, totalPages: 292, pagesRead: 100, notes: "Autobiography of a great storyteller.", checklist: ["Started", "Currently Reading"] },
                { id: 15, title: "The Story of My Experiments with Truth", author: "Mahatma Gandhi", genre: "Biography", status: "To Read", rating: 0, totalPages: 448, pagesRead: 0, notes: "", checklist: [] },
                { id: 16, title: "The India Way", author: "S. Jaishankar", genre: "Non-Fiction", status: "Completed", rating: 5, totalPages: 240, pagesRead: 240, notes: "Perspectives on India's foreign policy.", checklist: ["Started", "Currently Reading", "Completed"] },
                { id: 17, title: "Godan", author: "Munshi Premchand", genre: "Fiction", status: "Completed", rating: 5, totalPages: 360, pagesRead: 360, notes: "Classic Hindi novel depicting rural Indian life.", checklist: ["Started", "Currently Reading", "Completed"] },
                { id: 18, title: "2 States", author: "Chetan Bhagat", genre: "Fiction", status: "Currently Reading", rating: 4, totalPages: 315, pagesRead: 120, notes: "Contemporary cross-cultural romance.", checklist: ["Started", "Currently Reading"] },
                { id: 19, title: "Eragon", author: "Christopher Paolini", genre: "Fiction", status: "Completed", rating: 5, totalPages: 509, pagesRead: 509, notes: "Classic dragon rider story.", checklist: ["Started", "Currently Reading", "Completed", "Notes Added"] },
                { id: 20, title: "Eldest", author: "Christopher Paolini", genre: "Fiction", status: "To Read", rating: 0, totalPages: 668, pagesRead: 0, notes: "", checklist: [] },
                { id: 21, title: "Brisingr", author: "Christopher Paolini", genre: "Fiction", status: "To Read", rating: 0, totalPages: 748, pagesRead: 0, notes: "", checklist: [] },
                { id: 22, title: "Inheritance", author: "Christopher Paolini", genre: "Fiction", status: "To Read", rating: 0, totalPages: 860, pagesRead: 0, notes: "", checklist: [] },
                { id: 23, title: "Madhushala", author: "Harivansh Rai Bachchan", genre: "Philosophy", status: "Completed", rating: 5, totalPages: 150, pagesRead: 150, notes: "Metaphorical philosophical poetry.", checklist: ["Started", "Currently Reading", "Completed"] }
            ];
            localStorage.setItem('bookvault_books', JSON.stringify(dummyData));
        }
    }
    initDB();

    const getBooks = () => JSON.parse(localStorage.getItem('bookvault_books')) || [];
    const saveBooks = (books) => localStorage.setItem('bookvault_books', JSON.stringify(books));

    // --- Core UI (Theme & Sidebar) ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const sidebar = document.getElementById('sidebar');
    const menuToggleBtn = document.getElementById('menu-toggle');

    // Theme logic
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    updateThemeIcon(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const current = document.documentElement.getAttribute('data-theme');
            const target = current === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', target);
            localStorage.setItem('theme', target);
            updateThemeIcon(target);
            // Re-render charts to update grid/label colors
            if (window.renderCharts) window.renderCharts();
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggleBtn) return;
        const icon = themeToggleBtn.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // Sidebar Mobile Toggle
    if (menuToggleBtn && sidebar) {
        menuToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            sidebar.classList.toggle('active');
        });

        // Close sidebar when clicking outside on mobile
        document.addEventListener('click', (e) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains('active') && !sidebar.contains(e.target) && e.target !== menuToggleBtn) {
                sidebar.classList.remove('active');
            }
        });
    }

    // --- KPI & Progress Dashboard Logic ---
    function updateDashboard() {
        const books = getBooks();
        const totalEl = document.getElementById('kpi-total');
        const completedEl = document.getElementById('kpi-completed');
        const readingEl = document.getElementById('kpi-reading');
        const genreEl = document.getElementById('kpi-genre');

        if (!totalEl) return; // not on dashboard page

        totalEl.innerText = books.length;
        
        const completed = books.filter(b => b.status === 'Completed').length;
        completedEl.innerText = completed;

        const reading = books.filter(b => b.status === 'Currently Reading').length;
        readingEl.innerText = reading;

        // Calculate favorite genre
        const genres = books.map(b => b.genre);
        if (genres.length > 0) {
            const counts = {};
            let maxGenre = genres[0];
            let maxCount = 0;
            genres.forEach(g => {
                counts[g] = (counts[g] || 0) + 1;
                if (counts[g] > maxCount) {
                    maxCount = counts[g];
                    maxGenre = g;
                }
            });
            genreEl.innerText = maxGenre;
        } else {
            genreEl.innerText = '-';
        }
    }

    if (document.getElementById('kpi-total')) {
        updateDashboard();
    }

    // --- Library Section Logic ---
    const bookGrid = document.getElementById('book-grid');
    const genreFilters = document.getElementById('genre-filters');
    const searchInput = document.getElementById('search-input');
    const sortSelect = document.getElementById('sort-select');
    const statusFilter = document.getElementById('status-filter');

    let currentGenreFilter = 'All';

    function renderLibrary() {
        if (!bookGrid) return;
        
        const books = getBooks();
        const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
        const sortBy = sortSelect ? sortSelect.value : 'recent';
        const selectedStatus = statusFilter ? statusFilter.value : 'All';

        // Filtering
        let filteredBooks = books.filter(book => {
            const matchesGenre = currentGenreFilter === 'All' || book.genre === currentGenreFilter;
            const matchesSearch = book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm);
            const matchesStatus = selectedStatus === 'All' || book.status === selectedStatus;
            return matchesGenre && matchesSearch && matchesStatus;
        });

        // Sorting
        if (sortBy === 'rating-high') {
            filteredBooks.sort((a, b) => b.rating - a.rating);
        } else if (sortBy === 'rating-low') {
            filteredBooks.sort((a, b) => a.rating - b.rating);
        } else {
            // default recently added (descending IDs)
            filteredBooks.sort((a, b) => b.id - a.id);
        }

        bookGrid.innerHTML = '';

        if (filteredBooks.length === 0) {
            bookGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                    <i class="fas fa-book-open" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.5;"></i>
                    <p>No books found. Add a new one or clear filters!</p>
                </div>
            `;
            return;
        }

        filteredBooks.forEach(book => {
            const card = document.createElement('div');
            card.className = 'book-card glass';
            card.setAttribute('data-id', book.id);
            
            // Calculate progress percentage
            const progress = book.totalPages ? Math.round((book.pagesRead / book.totalPages) * 100) : 0;
            
            // Create Star Icons
            let starsHTML = '';
            for(let i=1; i<=5; i++) {
                if (i <= book.rating) {
                    starsHTML += '<i class="fas fa-star"></i>';
                } else {
                    starsHTML += '<i class="far fa-star"></i>';
                }
            }

            const statusClass = book.status === 'Completed' ? 'completed' : (book.status === 'Currently Reading' ? 'reading' : 'tbr');

            card.innerHTML = `
                <div class="book-cover">
                    <i class="fas fa-book"></i>
                </div>
                <div class="book-actions">
                    <button class="action-icon edit-btn" title="Edit Info"><i class="fas fa-pen"></i></button>
                    <button class="action-icon delete-btn" title="Delete Book"><i class="fas fa-trash"></i></button>
                </div>
                <h3 class="book-title" title="${book.title}">${book.title}</h3>
                <p class="book-author">${book.author}</p>
                <div class="book-meta">
                    <span class="status-tag ${statusClass}">${book.status}</span>
                    <span class="star-rating">${starsHTML}</span>
                </div>
                ${book.totalPages ? `
                <div class="progress-container">
                    <div class="progress-bar" style="width: ${progress}%;"></div>
                </div>
                ` : ''}
            `;

            // Attach card events
            card.addEventListener('click', (e) => {
                // Prevent detail view opening on action buttons clicks
                if (e.target.closest('.action-icon')) return;
                openDetailsModal(book.id);
            });

            // Action: Edit
            card.querySelector('.edit-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                openEditModal(book.id);
            });

            // Action: Delete
            card.querySelector('.delete-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                deleteBook(book.id);
            });

            bookGrid.appendChild(card);
        });
    }

    // Set up search and filter events
    if (searchInput) searchInput.addEventListener('input', renderLibrary);
    if (sortSelect) sortSelect.addEventListener('change', renderLibrary);
    if (statusFilter) statusFilter.addEventListener('change', renderLibrary);

    if (genreFilters) {
        genreFilters.addEventListener('click', (e) => {
            const badge = e.target.closest('.filter-badge');
            if (!badge) return;

            genreFilters.querySelectorAll('.filter-badge').forEach(b => b.classList.remove('active'));
            badge.classList.add('active');

            currentGenreFilter = badge.getAttribute('data-genre');
            renderLibrary();
        });
    }

    // --- Book Modals (Add / Edit) Logic ---
    const bookModal = document.getElementById('book-modal');
    const bookForm = document.getElementById('book-form');
    const addBookBtn = document.getElementById('add-book-btn');
    const cancelModalBtn = document.getElementById('cancel-modal');
    const closeModalBtn = document.getElementById('close-modal');
    
    function showModal(isEdit = false) {
        if (!bookModal) return;
        document.getElementById('modal-title').innerText = isEdit ? "Edit Book Details" : "Add New Book";
        bookModal.classList.add('active');
    }

    function hideModal() {
        if (!bookModal) return;
        bookModal.classList.remove('active');
        bookForm.reset();
        document.getElementById('book-id').value = '';
    }

    if (addBookBtn) addBookBtn.addEventListener('click', () => showModal(false));
    if (cancelModalBtn) cancelModalBtn.addEventListener('click', hideModal);
    if (closeModalBtn) closeModalBtn.addEventListener('click', hideModal);

    // Save/Submit Form
    if (bookForm) {
        bookForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const books = getBooks();
            const idVal = document.getElementById('book-id').value;
            const titleVal = document.getElementById('book-title').value;
            const authorVal = document.getElementById('book-author').value;
            const genreVal = document.getElementById('book-genre').value;
            const statusVal = document.getElementById('book-status').value;
            const totalPagesVal = document.getElementById('book-total-pages').value;

            if (idVal) {
                // Edit mode
                const index = books.findIndex(b => b.id == idVal);
                if (index !== -1) {
                    books[index].title = titleVal;
                    books[index].author = authorVal;
                    books[index].genre = genreVal;
                    books[index].status = statusVal;
                    books[index].totalPages = totalPagesVal ? parseInt(totalPagesVal) : null;
                    if (books[index].status === 'Completed' && books[index].totalPages) {
                        books[index].pagesRead = books[index].totalPages;
                    }
                    showToast("Book updated successfully!");
                }
            } else {
                // Add mode
                const newBook = {
                    id: Date.now(),
                    title: titleVal,
                    author: authorVal,
                    genre: genreVal,
                    status: statusVal,
                    rating: 0,
                    totalPages: totalPagesVal ? parseInt(totalPagesVal) : null,
                    pagesRead: statusVal === 'Completed' && totalPagesVal ? parseInt(totalPagesVal) : 0,
                    notes: '',
                    checklist: statusVal === 'Completed' ? ["Started", "Currently Reading", "Completed"] : (statusVal === 'Currently Reading' ? ["Started", "Currently Reading"] : [])
                };
                books.push(newBook);
                showToast("Book added to library!");
            }

            saveBooks(books);
            hideModal();
            renderLibrary();
        });
    }

    function openEditModal(id) {
        const books = getBooks();
        const book = books.find(b => b.id == id);
        if (!book) return;

        document.getElementById('book-id').value = book.id;
        document.getElementById('book-title').value = book.title;
        document.getElementById('book-author').value = book.author;
        document.getElementById('book-genre').value = book.genre;
        document.getElementById('book-status').value = book.status;
        document.getElementById('book-total-pages').value = book.totalPages || '';

        showModal(true);
    }

    function deleteBook(id) {
        if (!confirm("Are you sure you want to remove this book from your library?")) return;
        
        let books = getBooks();
        books = books.filter(b => b.id != id);
        saveBooks(books);
        showToast("Book removed from library.", "error");
        renderLibrary();
    }

    // --- Interactive Reading Details Tracker Modal ---
    const detailsModal = document.getElementById('details-modal');
    const closeDetailsBtn = document.getElementById('close-details-modal');
    let activeDetailBookId = null;

    function openDetailsModal(id) {
        if (!detailsModal) return;
        
        const books = getBooks();
        const book = books.find(b => b.id == id);
        if (!book) return;

        activeDetailBookId = id;
        
        // Load details
        document.getElementById('details-book-title').innerText = book.title;
        document.getElementById('details-book-author').innerText = book.author;
        document.getElementById('details-total-pages').innerText = book.totalPages || '-';
        
        const pagesReadInput = document.getElementById('details-pages-read');
        pagesReadInput.value = book.pagesRead || 0;
        if (!book.totalPages) {
            pagesReadInput.disabled = true;
        } else {
            pagesReadInput.disabled = false;
            pagesReadInput.max = book.totalPages;
        }

        // Render progress bar
        const progress = book.totalPages ? Math.round((book.pagesRead / book.totalPages) * 100) : 0;
        document.getElementById('details-progress-bar').style.width = `${progress}%`;
        document.getElementById('details-progress-text').innerText = `${progress}%`;

        // Render notes
        document.getElementById('details-notes').value = book.notes || '';

        // Star rating UI selection
        updateStarsUI(book.rating);

        // Checklist checkboxes
        const checkboxes = detailsModal.querySelectorAll('.tracker-check');
        checkboxes.forEach(cb => {
            cb.checked = book.checklist ? book.checklist.includes(cb.value) : false;
        });

        detailsModal.classList.add('active');
    }

    function hideDetailsModal() {
        if (!detailsModal) return;
        detailsModal.classList.remove('active');
        activeDetailBookId = null;
    }

    if (closeDetailsBtn) closeDetailsBtn.addEventListener('click', hideDetailsModal);

    // Update Stars function
    function updateStarsUI(rating) {
        if (!detailsModal) return;
        const stars = document.getElementById('details-stars').querySelectorAll('i');
        stars.forEach((star, idx) => {
            if (idx < rating) {
                star.className = 'fas fa-star';
            } else {
                star.className = 'far fa-star';
            }
        });
    }

    // Star interaction event
    const starsContainer = document.getElementById('details-stars');
    if (starsContainer) {
        starsContainer.addEventListener('click', (e) => {
            const star = e.target.closest('i');
            if (!star || !activeDetailBookId) return;

            const rating = parseInt(star.getAttribute('data-val'));
            
            const books = getBooks();
            const index = books.findIndex(b => b.id == activeDetailBookId);
            if (index !== -1) {
                books[index].rating = rating;
                saveBooks(books);
                updateStarsUI(rating);
                renderLibrary();
            }
        });
    }

    // Pages progress tracker save
    const updateProgressBtn = document.getElementById('update-progress-btn');
    if (updateProgressBtn) {
        updateProgressBtn.addEventListener('click', () => {
            if (!activeDetailBookId) return;

            const books = getBooks();
            const index = books.findIndex(b => b.id == activeDetailBookId);
            if (index === -1) return;

            const total = books[index].totalPages;
            const readVal = parseInt(document.getElementById('details-pages-read').value) || 0;

            if (total && readVal > total) {
                showToast("Pages read cannot exceed total pages!", "error");
                return;
            }

            books[index].pagesRead = readVal;
            
            // Auto complete status if page count matches total
            if (total && readVal === total) {
                books[index].status = 'Completed';
                if (!books[index].checklist.includes('Completed')) {
                    books[index].checklist.push('Completed');
                }
            } else if (readVal > 0 && books[index].status === 'To Read') {
                books[index].status = 'Currently Reading';
                if (!books[index].checklist.includes('Currently Reading')) {
                    books[index].checklist.push('Currently Reading');
                }
            }

            saveBooks(books);
            showToast("Reading progress updated!");
            
            // Re-render modal stats & library view
            openDetailsModal(activeDetailBookId);
            renderLibrary();
        });
    }

    // Checklist interactive items handler
    if (detailsModal) {
        detailsModal.addEventListener('change', (e) => {
            const cb = e.target.closest('.tracker-check');
            if (!cb || !activeDetailBookId) return;

            const books = getBooks();
            const index = books.findIndex(b => b.id == activeDetailBookId);
            if (index === -1) return;

            if (!books[index].checklist) books[index].checklist = [];

            if (cb.checked) {
                if (!books[index].checklist.includes(cb.value)) {
                    books[index].checklist.push(cb.value);
                }
            } else {
                books[index].checklist = books[index].checklist.filter(v => v !== cb.value);
            }

            // Sync main status dropdown with checklist completion changes
            if (cb.value === 'Completed') {
                books[index].status = cb.checked ? 'Completed' : 'Currently Reading';
                if (cb.checked && books[index].totalPages) {
                    books[index].pagesRead = books[index].totalPages;
                }
            }

            saveBooks(books);
            renderLibrary();
            openDetailsModal(activeDetailBookId);
        });
    }

    // Save Notes handler
    const saveNotesBtn = document.getElementById('save-notes-btn');
    if (saveNotesBtn) {
        saveNotesBtn.addEventListener('click', () => {
            if (!activeDetailBookId) return;

            const books = getBooks();
            const index = books.findIndex(b => b.id == activeDetailBookId);
            if (index === -1) return;

            books[index].notes = document.getElementById('details-notes').value;
            saveBooks(books);
            showToast("Notes saved successfully!");
            renderLibrary();
        });
    }

    // Initial render call
    renderLibrary();

    // --- Profile Page Specific Logic ---
    const profileLogoutBtn = document.getElementById('profile-logout-btn');
    if (profileLogoutBtn) {
        profileLogoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            showToast("Signing out...", "error");
            setTimeout(() => {
                localStorage.removeItem('bookvault_logged_in');
                window.location.replace('login.html');
            }, 800);
        });
    }

    const profileForm = document.getElementById('profile-settings-form');
    if (profileForm) {
        // Sync total books dynamically in the stats
        const books = getBooks();
        const totalBooksEl = document.getElementById('meta-total-books');
        if (totalBooksEl) {
            totalBooksEl.innerText = books.length;
        }

        // Retrieve and prefill saved profile info if it exists
        const savedUser = JSON.parse(localStorage.getItem('bookvault_profile')) || {
            name: "Aarav Sharma",
            email: "aarav.sharma@bookvault.in",
            bio: "Avid book reader and software developer. Love reading historical fiction, science, and Indian mythology.",
            genre: "Mythology",
            language: "en"
        };

        // Prefill form
        document.getElementById('profile-name-input').value = savedUser.name;
        document.getElementById('profile-email-input').value = savedUser.email;
        document.getElementById('profile-bio-input').value = savedUser.bio;
        document.getElementById('profile-genre-select').value = savedUser.genre;
        document.getElementById('profile-lang-select').value = savedUser.language;

        // Prefill display
        document.getElementById('display-name').innerText = savedUser.name;
        document.getElementById('display-email').innerText = savedUser.email;
        document.getElementById('meta-fav-genre').innerText = savedUser.genre;

        // Form submit
        profileForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const updatedUser = {
                name: document.getElementById('profile-name-input').value.trim(),
                email: document.getElementById('profile-email-input').value.trim(),
                bio: document.getElementById('profile-bio-input').value.trim(),
                genre: document.getElementById('profile-genre-select').value,
                language: document.getElementById('profile-lang-select').value
            };

            localStorage.setItem('bookvault_profile', JSON.stringify(updatedUser));
            
            // Sync page display elements
            document.getElementById('display-name').innerText = updatedUser.name;
            document.getElementById('display-email').innerText = updatedUser.email;
            document.getElementById('meta-fav-genre').innerText = updatedUser.genre;

            // Sync topbar display if exists
            const topbarNames = document.querySelectorAll('.profile-name');
            topbarNames.forEach(el => el.innerText = updatedUser.name);

            showToast("Settings saved successfully!");
        });
    }

    // Sync topbar name dynamically on all pages on load
    const savedUserOnLoad = JSON.parse(localStorage.getItem('bookvault_profile'));
    if (savedUserOnLoad && savedUserOnLoad.name) {
        const topbarNames = document.querySelectorAll('.profile-name');
        topbarNames.forEach(el => el.innerText = savedUserOnLoad.name);
    }

});
