// Notification elements
        const notificationIcon = document.getElementById('notification-icon');
        const notificationBadge = document.getElementById('notification-badge');
        const notificationPanel = document.getElementById('notification-panel');
        const notificationList = document.getElementById('notification-list');
        const markAllReadBtn = document.getElementById('mark-all-read');
        

// Toggle notification panel
notificationIcon.addEventListener('click', (e) => {
    e.stopPropagation();
    notificationPanel.classList.toggle('active');
    dropdownMenu.classList.remove('active');
    
    // Mark notifications as read when panel is opened
    if (notificationPanel.classList.contains('active')) {
        markNotificationsAsRead();
    }
});

// Load notifications
function loadNotifications() {
    const notificationList = document.getElementById('notification-list');
    notificationList.innerHTML = '';
    
    // Demo notifications
    const demoNotifications = [
        { id: 1, title: 'New Attendance Record', message: 'Your attendance for CSE-326 has been recorded', time: '10 minutes ago', read: false },
        { id: 2, title: 'Class Test Scheduled', message: 'CT1 for CSE-335 scheduled for next Monday', time: '2 hours ago', read: false },
        { id: 3, title: 'System Update', message: 'New features added to the attendance system', time: '1 day ago', read: true },
        { id: 4, title: 'Welcome to AttendEase', message: 'Thank you for using our attendance system', time: '1 week ago', read: true }
    ];
    
    demoNotifications.forEach(notification => {
        const notificationItem = document.createElement('div');
        notificationItem.className = `notification-item ${notification.read ? '' : 'unread'}`;
        notificationItem.innerHTML = `
            <div class="notification-title">
                <span>${notification.title}</span>
                <span class="notification-time">${notification.time}</span>
            </div>
            <div class="notification-message">${notification.message}</div>
        `;
        notificationList.appendChild(notificationItem);
    });
    
    // Update badge count
    const unreadCount = demoNotifications.filter(n => !n.read).length;
    if (unreadCount > 0) {
        notificationBadge.textContent = unreadCount;
        notificationBadge.classList.remove('hidden');
    } else {
        notificationBadge.classList.add('hidden');
    }
}

// Mark notifications as read
function markNotificationsAsRead() {
    // In a real app, this would call an API to mark notifications as read
    notificationBadge.classList.add('hidden');
    
    // Update UI
    document.querySelectorAll('.notification-item.unread').forEach(item => {
        item.classList.remove('unread');
    });
}

// Mark all notifications as read
markAllReadBtn.addEventListener('click', () => {
    markNotificationsAsRead();
});

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