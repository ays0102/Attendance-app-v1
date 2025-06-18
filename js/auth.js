/// Switch between auth screens (unchanged)
showSignup.addEventListener('click', (e) => {
    e.preventDefault();
    signinScreen.classList.add('hidden');
    signupScreen.classList.remove('hidden');
});

showSignin.addEventListener('click', (e) => {
    e.preventDefault();
    signupScreen.classList.add('hidden');
    forgotPasswordScreen.classList.add('hidden');
    signinScreen.classList.remove('hidden');
});

showForgotPassword.addEventListener('click', (e) => {
    e.preventDefault();
    signinScreen.classList.add('hidden');
    forgotPasswordScreen.classList.remove('hidden');
});

showSigninFromReset.addEventListener('click', (e) => {
    e.preventDefault();
    forgotPasswordScreen.classList.add('hidden');
    signinScreen.classList.remove('hidden');
});

// Login function
        signinBtn.addEventListener('click', () => {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            if (email && password) {
                // Show loading state
                signinBtn.innerHTML = '<div class="spinner"></div>';
                
                // Simulate API call
                setTimeout(() => {
                    // For demo purposes, we're just storing in localStorage
                    const demoUsers = {
                        'student@univ.edu': {
                            name: 'John Student',
                            email: 'student@univ.edu',
                            initials: 'JS',
                            role: 'student',
                            isLoggedIn: true,
                            profile: {
                                name: 'John Student',
                                department: 'Computer Science',
                                level: 'junior',
                                term: 'fall-2023',
                                courses: ['CSE-326', 'CSE-335', 'CSE-331'],
                                profileComplete: true
                            }
                        },
                        'faculty@univ.edu': {
                            name: 'Dr. Sarah Faculty',
                            email: 'faculty@univ.edu',
                            initials: 'SF',
                            role: 'faculty',
                            isLoggedIn: true,
                            profile: {
                                name: 'Dr. Sarah Faculty',
                                department: 'Computer Science',
                                position: 'assistant-professor',
                                term: 'fall-2023',
                                courses: ['CSE-326', 'CSE-335'],
                                profileComplete: true
                            }
                        },
                        'admin@univ.edu': {
                            name: 'Admin User',
                            email: 'admin@univ.edu',
                            initials: 'AU',
                            role: 'admin',
                            isLoggedIn: true,
                            profile: {
                                name: 'Admin User',
                                department: 'Administration',
                                position: 'admin',
                                profileComplete: true
                            }
                        }
                    };
                    
                    const user = demoUsers[email] || {
                        name: email.split('@')[0],
                        email: email,
                        initials: email.substring(0, 2).toUpperCase(),
                        role: 'student',
                        isLoggedIn: true,
                        profileComplete: false
                    };
                    
                    localStorage.setItem('user', JSON.stringify(user));
                    
                    authScreens.classList.add('hidden');
                    
                    if (user.profileComplete) {
                        appContainer.classList.remove('hidden');
                        initApp();
                    } else {
                        document.getElementById('profile-setup').classList.remove('hidden');
                        initializeProfileSetup(user);
                    }
                    
                    // Show welcome toast
                    showToast(`Welcome back, ${user.name.split(' ')[0]}!`, 'success');
                }, 1000);
            } else {
                showToast('Please enter both email and password', 'error');
            }
        });

        // Signup function
        signupBtn.addEventListener('click', () => {
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const role = document.getElementById('signup-role').value;
            const termsChecked = document.getElementById('terms-checkbox').checked;
            
            if (!name || !email || !password || !confirmPassword) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            if (password !== confirmPassword) {
                showToast('Passwords do not match', 'error');
                return;
            }
            
            if (!termsChecked) {
                showToast('Please agree to the terms and conditions', 'error');
                return;
            }
            
            // Show loading state
            signupBtn.innerHTML = '<div class="spinner"></div>';
            
            // Simulate API call
            setTimeout(() => {
                // For demo purposes, we're just storing in localStorage
                const user = {
                    name: name,
                    email: email,
                    initials: name.substring(0, 2).toUpperCase(),
                    role: role,
                    isLoggedIn: true,
                    profileComplete: false
                };
                
                localStorage.setItem('user', JSON.stringify(user));
                
                authScreens.classList.add('hidden');
                document.getElementById('profile-setup').classList.remove('hidden');
                initializeProfileSetup(user);
                
                // Reset signup button
                signupBtn.innerHTML = '<i class="fas fa-user-plus"></i> Continue';
            }, 1000);
        });   

        // Reset password function
        resetPasswordBtn.addEventListener('click', () => {
            const email = document.getElementById('reset-email').value;
            
            if (email) {
                // Show loading state
                resetPasswordBtn.innerHTML = '<div class="spinner"></div>';
                
                // Simulate API call
                setTimeout(() => {
                    showToast(`Password reset link sent to ${email}`, 'success');
                    resetPasswordBtn.innerHTML = '<i class="fas fa-key"></i> Send Reset Link';
                }, 1000);
            } else {
                showToast('Please enter your email', 'error');
            }
        });

        // Logout function
        logoutBtn.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            user.isLoggedIn = false;
            localStorage.setItem('user', JSON.stringify(user));
            
            appContainer.classList.add('hidden');
            document.getElementById('profile-setup').classList.add('hidden');
            authScreens.classList.remove('hidden');
            signupScreen.classList.add('hidden');
            forgotPasswordScreen.classList.add('hidden');
            signinScreen.classList.remove('hidden');
            
            // Reset form fields
            document.getElementById('email').value = '';
            document.getElementById('password').value = '';
        });

// You'll need to implement these async functions:
async function loadContent(containerId, url) {
    // Implementation for loading content dynamically
    const container = document.getElementById(containerId);
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to load content');
        container.innerHTML = await response.text();
    } catch (error) {
        console.error('Error loading content:', error);
        container.innerHTML = '<p>Error loading content. Please try again.</p>';
    }
}

initApp();