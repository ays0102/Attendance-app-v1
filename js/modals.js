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
        
        
        
        
        
        
        // Edit profile
        editProfileBtn.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            
            // Populate form with current data
            document.getElementById('edit-profile-name').value = user.name;
            document.getElementById('edit-profile-phone').value = user.profile?.phone || '';
            document.getElementById('edit-profile-photo').value = user.profile?.photo || '';
            document.getElementById('edit-profile-dept').value = user.profile?.department || '';
            
            // Show modal
            editProfileModal.classList.add('active');
        });

        // Close edit profile modal
        closeEditProfileModal.addEventListener('click', () => {
            editProfileModal.classList.remove('active');
        });

        cancelEditProfile.addEventListener('click', () => {
            editProfileModal.classList.remove('active');
        });

        // Save profile changes
        saveProfileChanges.addEventListener('click', () => {
            const user = JSON.parse(localStorage.getItem('user')) || {};
            
            // Update user data
            user.name = document.getElementById('edit-profile-name').value;
            if (!user.profile) user.profile = {};
            user.profile.phone = document.getElementById('edit-profile-phone').value;
            user.profile.photo = document.getElementById('edit-profile-photo').value;
            user.profile.department = document.getElementById('edit-profile-dept').value;
            
            // Update initials if name changed
            user.initials = user.name.substring(0, 2).toUpperCase();
            
            // Save to localStorage
            localStorage.setItem('user', JSON.stringify(user));
            
            // Update UI
            username.textContent = user.name;
            greetingName.textContent = user.name.split(' ')[0];
            userAvatar.textContent = user.initials;
            
            if (user.profile.photo) {
                userAvatar.style.backgroundImage = `url(${user.profile.photo})`;
                userAvatar.classList.add('has-photo');
                userAvatar.textContent = '';
            }
            
            // Close modal
            editProfileModal.classList.remove('active');
            
            // Show success message
            showToast('Profile updated successfully', 'success');
        });

        // Change password
        changePasswordBtn.addEventListener('click', () => {
            changePasswordModal.classList.add('active');
        });

        changePasswordSettingsBtn.addEventListener('click', () => {
            changePasswordModal.classList.add('active');
        });

        // Close change password modal
        closePasswordModal.addEventListener('click', () => {
            changePasswordModal.classList.remove('active');
        });

        cancelPasswordChange.addEventListener('click', () => {
            changePasswordModal.classList.remove('active');
        });

        // Save password changes
        savePasswordChanges.addEventListener('click', () => {
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmNewPassword = document.getElementById('confirm-new-password').value;
            
            if (!currentPassword || !newPassword || !confirmNewPassword) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            if (newPassword !== confirmNewPassword) {
                showToast('New passwords do not match', 'error');
                return;
            }
            
            // In a real app, verify current password with server
            // For demo, we'll just show success
            
            // Clear fields
            document.getElementById('current-password').value = '';
            document.getElementById('new-password').value = '';
            document.getElementById('confirm-new-password').value = '';
            
            // Close modal
            changePasswordModal.classList.remove('active');
            
            // Show success message
            showToast('Password changed successfully', 'success');
        });

        // Add course (Admin)
        addCourseBtn.addEventListener('click', () => {
            addCourseModal.classList.add('active');
        });

        // Close add course modal
        closeAddCourseModal.addEventListener('click', () => {
            addCourseModal.classList.remove('active');
        });

        cancelAddCourse.addEventListener('click', () => {
            addCourseModal.classList.remove('active');
        });

        // Save new course
        saveNewCourse.addEventListener('click', () => {
            const code = document.getElementById('course-code').value;
            const name = document.getElementById('course-name').value;
            const dept = document.getElementById('course-dept').value;
            const credits = document.getElementById('course-credits').value;
            const faculty = document.getElementById('course-faculty').value;
            
            if (!code || !name || !dept || !credits || !faculty) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            // In a real app, this would call an API to save the course
            // For demo, we'll just show success
            
            // Clear fields
            document.getElementById('course-code').value = '';
            document.getElementById('course-name').value = '';
            document.getElementById('course-credits').value = '';
            
            // Close modal
            addCourseModal.classList.remove('active');
            
            // Show success message
            showToast('Course added successfully', 'success');
        });

        // Add user (Admin)
        addUserBtn.addEventListener('click', () => {
            addUserModal.classList.add('active');
        });

        // Close add user modal
        closeAddUserModal.addEventListener('click', () => {
            addUserModal.classList.remove('active');
        });

        cancelAddUser.addEventListener('click', () => {
            addUserModal.classList.remove('active');
        });

        // Save new user
        saveNewUser.addEventListener('click', () => {
            const name = document.getElementById('new-user-name').value;
            const email = document.getElementById('new-user-email').value;
            const role = document.getElementById('new-user-role').value;
            const dept = document.getElementById('new-user-dept').value;
            const password = document.getElementById('new-user-password').value;
            
            if (!name || !email || !role || !dept || !password) {
                showToast('Please fill in all fields', 'error');
                return;
            }
            
            // In a real app, this would call an API to save the user
            // For demo, we'll just show success
            
            // Clear fields
            document.getElementById('new-user-name').value = '';
            document.getElementById('new-user-email').value = '';
            document.getElementById('new-user-password').value = '';
            
            // Close modal
            addUserModal.classList.remove('active');
            
            // Show success message
            showToast('User added successfully', 'success');
        });

        // Delete account confirmation
        deleteAccountBtn.addEventListener('click', () => {
            confirmModalTitle.textContent = 'Delete Account';
            confirmModalMessage.textContent = 'Are you sure you want to permanently delete your account? This action cannot be undone.';
            confirmModal.classList.add('active');
            
            // Set up confirm action
            confirmAction.onclick = function() {
                // In a real app, this would call an API to delete the account
                localStorage.removeItem('user');
                appContainer.classList.add('hidden');
                authScreens.classList.remove('hidden');
                signinScreen.classList.remove('hidden');
                
                // Close modal
                confirmModal.classList.remove('active');
                
                // Show success message
                showToast('Your account has been deleted', 'success');
            };
        });

        // Close confirm modal
        closeConfirmModal.addEventListener('click', () => {
            confirmModal.classList.remove('active');
        });

        cancelConfirmAction.addEventListener('click', () => {
            confirmModal.classList.remove('active');
        });