// Profile Setup Logic
        function initializeProfileSetup(user) {
            // Set role-specific fields
            if (user.role === 'faculty') {
                document.getElementById('student-fields').classList.add('hidden');
                document.getElementById('faculty-fields').classList.remove('hidden');
                document.getElementById('course-selection-label').textContent = 'Select Courses You Teach';
            } else {
                document.getElementById('student-fields').classList.remove('hidden');
                document.getElementById('faculty-fields').classList.add('hidden');
                document.getElementById('course-selection-label').textContent = 'Select Your Courses';
            }
            
            // Populate courses based on role
            const courseSelection = document.getElementById('course-selection');
            courseSelection.innerHTML = '';
            
            const demoCourses = [
                { code: 'CSE-326', name: 'Web Programming' },
                { code: 'CSE-335', name: 'Software Engineering' },
                { code: 'CSE-331', name: 'Database Systems' },
                { code: 'CSE-313', name: 'Algorithms' },
                { code: 'CSE-321', name: 'Computer Networks' }
            ];
            
            demoCourses.forEach(course => {
                const courseCheckbox = document.createElement('div');
                courseCheckbox.className = 'course-checkbox';
                courseCheckbox.innerHTML = `
                    <input type="checkbox" id="course-${course.code.toLowerCase()}" value="${course.code}">
                    <label for="course-${course.code.toLowerCase()}">${course.code} - ${course.name}</label>
                `;
                courseSelection.appendChild(courseCheckbox);
            });
            
            // Profile setup navigation
            document.getElementById('next-to-step2').addEventListener('click', function() {
                const name = document.getElementById('profile-name').value;
                if (!name) {
                    showToast('Please enter your full name', 'error');
                    return;
                }
                
                document.getElementById('step1').classList.remove('active');
                document.getElementById('step2').classList.add('active');
                document.getElementById('step1-indicator').classList.remove('active');
                document.getElementById('step1-indicator').classList.add('completed');
                document.getElementById('step2-indicator').classList.add('active');
                
                updateCompletionProgress(33);
            });
            
            document.getElementById('back-to-step1').addEventListener('click', function() {
                document.getElementById('step2').classList.remove('active');
                document.getElementById('step1').classList.add('active');
                document.getElementById('step2-indicator').classList.remove('active');
                document.getElementById('step1-indicator').classList.add('active');
                document.getElementById('step1-indicator').classList.remove('completed');
                
                updateCompletionProgress(0);
            });
            
            document.getElementById('next-to-step3').addEventListener('click', function() {
                const dept = document.getElementById('profile-dept').value;
                const levelOrPosition = user.role === 'faculty' ? 
                    document.getElementById('profile-position').value : 
                    document.getElementById('profile-level').value;
                const term = document.getElementById('profile-term').value;
                
                if (!dept || !levelOrPosition || !term) {
                    showToast('Please fill in all academic details', 'error');
                    return;
                }
                
                document.getElementById('step2').classList.remove('active');
                document.getElementById('step3').classList.add('active');
                document.getElementById('step2-indicator').classList.remove('active');
                document.getElementById('step2-indicator').classList.add('completed');
                document.getElementById('step3-indicator').classList.add('active');
                
                updateCompletionProgress(66);
            });
            
            document.getElementById('back-to-step2').addEventListener('click', function() {
                document.getElementById('step3').classList.remove('active');
                document.getElementById('step2').classList.add('active');
                document.getElementById('step3-indicator').classList.remove('active');
                document.getElementById('step2-indicator').classList.add('active');
                document.getElementById('step2-indicator').classList.remove('completed');
                
                updateCompletionProgress(33);
            });
            
            // Complete profile
            document.getElementById('complete-profile').addEventListener('click', function() {
                const user = JSON.parse(localStorage.getItem('user')) || {};
                
                // Save profile data
                user.profile = {
                    name: document.getElementById('profile-name').value || user.name,
                    phone: document.getElementById('profile-phone').value,
                    photo: document.getElementById('profile-photo').value,
                    department: document.getElementById('profile-dept').value,
                    level: user.role === 'student' ? document.getElementById('profile-level').value : undefined,
                    position: user.role === 'faculty' ? document.getElementById('profile-position').value : undefined,
                    term: document.getElementById('profile-term').value,
                    courses: Array.from(document.querySelectorAll('#course-selection input[type="checkbox"]:checked'))
                                .map(cb => cb.value),
                    profileComplete: true
                };
                
                // Update initials
                user.initials = user.profile.name.substring(0, 2).toUpperCase();
                
                localStorage.setItem('user', JSON.stringify(user));
                
                // Hide setup, show app
                document.getElementById('profile-setup').classList.add('hidden');
                document.getElementById('app-container').classList.remove('hidden');
                
                // Initialize the app
                initApp();
                
                // Show welcome message
                showToast(`Welcome to AttendEase, ${user.profile.name.split(' ')[0]}!`, 'success');
            });
            
            // Update completion progress
            function updateCompletionProgress(percent) {
                document.getElementById('completion-percentage').textContent = `${percent}%`;
                document.querySelector('.profile-completion-progress').style.width = `${percent}%`;
            }
        }