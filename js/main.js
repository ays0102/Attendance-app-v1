console.log("Main.js loaded"); 
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded");
    if (!isAuthenticated()) {
        console.log("User not authenticated, loading auth screens");
        loadContent('auth-screens', 'views/auth/signin.html')
            .then(() => console.log("Auth screens loaded"))
            .catch(err => console.error("Failed loading auth:", err));
    }
});




// DOM Elements
        const authScreens = document.getElementById('auth-screens');
        const appContainer = document.getElementById('app-container');
        const signinScreen = document.getElementById('signin-screen');
        const signupScreen = document.getElementById('signup-screen');
        const forgotPasswordScreen = document.getElementById('forgot-password-screen');
        const showSignup = document.getElementById('show-signup');
        const showSignin = document.getElementById('show-signin');
        const showForgotPassword = document.getElementById('show-forgot-password');
        const showSigninFromReset = document.getElementById('show-signin-from-reset');
        const signinBtn = document.getElementById('signin-btn');
        const signupBtn = document.getElementById('signup-btn');
        const resetPasswordBtn = document.getElementById('reset-password-btn');
        const logoutBtn = document.getElementById('logout-btn');
        const currentDate = document.getElementById('current-date');
        const userAvatar = document.getElementById('user-avatar');
        const username = document.getElementById('username');
        const greetingName = document.getElementById('greeting-name');


// Dropdown menu elements
        const dropdownMenu = document.getElementById('dropdown-menu');
        const editProfileBtn = document.getElementById('edit-profile-btn');
        const changePasswordBtn = document.getElementById('change-password-btn');
        
        // Modal elements
        const editProfileModal = document.getElementById('edit-profile-modal');
        const closeEditProfileModal = document.getElementById('close-edit-profile-modal');
        const cancelEditProfile = document.getElementById('cancel-edit-profile');
        const saveProfileChanges = document.getElementById('save-profile-changes');
        
        const changePasswordModal = document.getElementById('change-password-modal');
        const closePasswordModal = document.getElementById('close-password-modal');
        const cancelPasswordChange = document.getElementById('cancel-password-change');
        const savePasswordChanges = document.getElementById('save-password-changes');
        const changePasswordSettingsBtn = document.getElementById('change-password-settings-btn');
        
        const addCourseModal = document.getElementById('add-course-modal');
        const closeAddCourseModal = document.getElementById('close-add-course-modal');
        const cancelAddCourse = document.getElementById('cancel-add-course');
        const saveNewCourse = document.getElementById('save-new-course');
        const addCourseBtn = document.getElementById('add-course-btn');
        
        const addUserModal = document.getElementById('add-user-modal');
        const closeAddUserModal = document.getElementById('close-add-user-modal');
        const cancelAddUser = document.getElementById('cancel-add-user');
        const saveNewUser = document.getElementById('save-new-user');
        const addUserBtn = document.getElementById('add-user-btn');
        
        const confirmModal = document.getElementById('confirm-modal');
        const closeConfirmModal = document.getElementById('close-confirm-modal');
        const cancelConfirmAction = document.getElementById('cancel-confirm-action');
        const confirmAction = document.getElementById('confirm-action');
        const confirmModalTitle = document.getElementById('confirm-modal-title');
        const confirmModalMessage = document.getElementById('confirm-modal-message');
        const deleteAccountBtn = document.getElementById('delete-account-btn');        

// Screen elements
        const screens = {
            dashboard: document.getElementById('dashboard-screen'),
            attendance: document.getElementById('attendance-screen'),
            'view-records': document.getElementById('view-records-screen'),
            'ct-marks': document.getElementById('ct-marks-screen'),
            'attendance-report': document.getElementById('attendance-report-screen'),
            'class-test-details': document.getElementById('class-test-details-screen'),
            'course-management': document.getElementById('course-management-screen'),
            'user-management': document.getElementById('user-management-screen'),
            'settings': document.getElementById('settings-screen')
        };
        
        const menuLinks = document.querySelectorAll('.sidebar-menu a[data-screen]');
        const adminMenuItems = document.querySelectorAll('.admin-only');
        
// Current date
function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
}



// Initialize the app
function initApp() {
    updateDate();
    
    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user')) || {};
    if (user && user.isLoggedIn) {
        authScreens.classList.add('hidden');
        appContainer.classList.remove('hidden');
        
        // Set user info
        username.textContent = user.name;
        greetingName.textContent = user.name.split(' ')[0];
        
        // Set avatar
        if (user.profile && user.profile.photo) {
            userAvatar.style.backgroundImage = `url(${user.profile.photo})`;
            userAvatar.classList.add('has-photo');
            userAvatar.textContent = '';
        } else {
            userAvatar.textContent = user.initials || user.name.substring(0, 2).toUpperCase();
        }
        
        // Set role-specific UI
        if (user.role === 'admin') {
            adminMenuItems.forEach(item => item.classList.remove('hidden'));
        }
        
        // Load notifications
        loadNotifications();
        
        // Load today's classes
        loadTodaysClasses();
        
        // Load attendance records if on attendance screen
        if (window.location.hash === '#attendance') {
            showScreen('attendance');
            loadAttendanceRecords();
        }
    }
}


 // Close dropdowns when clicking outside
        document.addEventListener('click', () => {
            dropdownMenu.classList.remove('active');
            notificationPanel.classList.remove('active');
        });

        // Prevent dropdowns from closing when clicking inside them
        dropdownMenu.addEventListener('click', (e) => e.stopPropagation());
        notificationPanel.addEventListener('click', (e) => e.stopPropagation());

// Navigation between screens
menuLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const screen = link.getAttribute('data-screen');
        showScreen(screen);
    });
});

function showScreen(screen) {
    // Hide all screens
    Object.values(screens).forEach(s => s.classList.add('hidden'));
    
    // Show selected screen
    screens[screen].classList.remove('hidden');
    
    // Update active menu item
    menuLinks.forEach(l => l.classList.remove('active'));
    document.querySelector(`.sidebar-menu a[data-screen="${screen}"]`).classList.add('active');
    
    // Load data for the screen if needed
    if (screen === 'attendance') {
        loadAttendanceRecords();
    } else if (screen === 'view-records') {
        loadStudentRecords();
    } else if (screen === 'ct-marks') {
        loadCTMarks();
    }
}

// Toggle password visibility
document.querySelectorAll('.toggle-password').forEach(toggle => {
    toggle.addEventListener('click', function() {
        const input = this.parentElement.querySelector('input');
        const type = input.getAttribute('type') === 'password' ? 'text' : 'password';
        input.setAttribute('type', type);
        this.classList.toggle('fa-eye');
        this.classList.toggle('fa-eye-slash');
    });
});

// Initialize the app
initApp();