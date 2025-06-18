// Content loader utility
async function loadContent(containerId, path) {
    try {
        const response = await fetch(path);
        if (!response.ok) throw new Error('Failed to load content');
        const html = await response.text();
        document.getElementById(containerId).innerHTML = html;
        return true;
    } catch (error) {
        console.error('Error loading content:', error);
        return false;
    }
}

// Initialize dynamic content
async function initializeApp() {
    // Load auth screens by default
    await loadContent('auth-screens', 'views/auth/signin.html');
    
    // Load header and sidebar when authenticated
    if (isAuthenticated()) {
        await loadContent('header-container', 'views/partials/header.html');
        await loadContent('sidebar-container', 'views/partials/sidebar.html');
        await loadScreen('dashboard');
    }
}

// Load a specific screen
async function loadScreen(screenName) {
    const screenPath = `views/dashboard/${screenName}.html`;
    await loadContent('main-content-container', screenPath);
    // Initialize screen-specific JS if needed
    initializeScreen(screenName);
}

function initializeScreen(screenName) {
    // Add any screen-specific initialization here
    switch(screenName) {
        case 'attendance':
            loadAttendanceRecords();
            break;
        case 'view-records':
            loadStudentRecords();
            break;
        // other cases...
    }
}

// Check authentication status
function isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    return user && user.isLoggedIn;
}


















// Show toast notification
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <div class="toast-icon">
            ${type === 'success' ? '<i class="fas fa-check-circle"></i>' : 
             type === 'error' ? '<i class="fas fa-exclamation-circle"></i>' : 
             type === 'warning' ? '<i class="fas fa-exclamation-triangle"></i>' : 
             '<i class="fas fa-info-circle"></i>'}
        </div>
        <div class="toast-content">
            <div class="toast-title">${type.charAt(0).toUpperCase() + type.slice(1)}</div>
            <div class="toast-message">${message}</div>
        </div>
        <button class="toast-close">&times;</button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 5000);
    
    // Close button
    toast.querySelector('.toast-close').addEventListener('click', () => {
        toast.classList.remove('show');
        setTimeout(() => {
            toast.remove();
        }, 300);
    });
}