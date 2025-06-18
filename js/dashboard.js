// Load today's classes
function loadTodaysClasses() {
    const user = JSON.parse(localStorage.getItem('user')) || {};
    const todaysClassesContainer = document.getElementById('todays-classes');
    todaysClassesContainer.innerHTML = '';
    
    if (user.profile && user.profile.courses) {
        const demoClasses = [
            { code: 'CSE-326', name: 'Web Programming', time: '09:30 AM', room: 'CS-101' },
            { code: 'CSE-335', name: 'Software Engineering', time: '11:00 AM', room: 'CS-202' },
            { code: 'CSE-331', name: 'Database Systems', time: '02:00 PM', room: 'CS-105' }
        ];
        
        demoClasses.forEach(cls => {
            if (user.profile.courses.includes(cls.code)) {
                const classCard = document.createElement('div');
                classCard.className = 'card';
                classCard.innerHTML = `
                    <h3><i class="fas fa-chalkboard-teacher"></i> ${cls.code}</h3>
                    <p>${cls.name}</p>
                    <div class="card-footer">
                        <span class="card-meta"><i class="fas fa-clock"></i> ${cls.time} • <i class="fas fa-door-open"></i> ${cls.room}</span>
                        <button class="view-btn">Join</button>
                    </div>
                `;
                todaysClassesContainer.appendChild(classCard);
            }
        });
        
        if (todaysClassesContainer.children.length === 0) {
            todaysClassesContainer.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-calendar-times"></i>
                    <p>No classes scheduled for today</p>
                </div>
            `;
        }
    }
}

// Load attendance records
function loadAttendanceRecords() {
    const attendanceList = document.getElementById('attendance-list');
    attendanceList.innerHTML = '';
    
    // Demo data
    const demoStudents = [
        { id: '2021-1-60-001', name: 'John Doe', status: 'present' },
        { id: '2021-1-60-002', name: 'Jane Smith', status: 'present' },
        { id: '2021-1-60-003', name: 'Robert Johnson', status: 'late' },
        { id: '2021-1-60-004', name: 'Emily Davis', status: 'absent' },
        { id: '2021-1-60-005', name: 'Michael Wilson', status: 'present' }
    ];
    
    demoStudents.forEach(student => {
        const row = document.createElement('tr');
        
        let statusBadge;
        if (student.status === 'present') {
            statusBadge = '<span class="present-badge">Present</span>';
        } else if (student.status === 'late') {
            statusBadge = '<span class="late-badge">Late</span>';
        } else {
            statusBadge = '<span class="absent-badge">Absent</span>';
        }
        
        row.innerHTML = `
            <td>${student.name} - ${student.id}</td>
            <td>
                <select class="status-select">
                    <option value="present" ${student.status === 'present' ? 'selected' : ''}>Present</option>
                    <option value="late" ${student.status === 'late' ? 'selected' : ''}>Late</option>
                    <option value="absent" ${student.status === 'absent' ? 'selected' : ''}>Absent</option>
                </select>
            </td>
            <td>
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </td>
        `;
        attendanceList.appendChild(row);
    });
}

// Load student records
function loadStudentRecords() {
    const recordsList = document.getElementById('records-list');
    recordsList.innerHTML = '';
    
    // Demo data
    const demoStudents = [
        { id: '2021-1-60-001', name: 'John Doe', email: 'john@univ.edu', attendance: '85%' },
        { id: '2021-1-60-002', name: 'Jane Smith', email: 'jane@univ.edu', attendance: '92%' },
        { id: '2021-1-60-003', name: 'Robert Johnson', email: 'robert@univ.edu', attendance: '78%' },
        { id: '2021-1-60-004', name: 'Emily Davis', email: 'emily@univ.edu', attendance: '88%' },
        { id: '2021-1-60-005', name: 'Michael Wilson', email: 'michael@univ.edu', attendance: '95%' }
    ];
    
    demoStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.id}</td>
            <td>${student.name}</td>
            <td>${student.email}</td>
            <td>${student.attendance}</td>
            <td>
                <button class="view-btn"><i class="fas fa-eye"></i></button>
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash"></i></button>
            </td>
        `;
        recordsList.appendChild(row);
    });
}

// Load CT marks
function loadCTMarks() {
    const ctMarksList = document.getElementById('ct-marks-list');
    ctMarksList.innerHTML = '';
    
    // Demo data
    const demoStudents = [
        { id: '2021-1-60-001', name: 'John Doe', marks: '85' },
        { id: '2021-1-60-002', name: 'Jane Smith', marks: '92' },
        { id: '2021-1-60-003', name: 'Robert Johnson', marks: '78' },
        { id: '2021-1-60-004', name: 'Emily Davis', marks: '88' },
        { id: '2021-1-60-005', name: 'Michael Wilson', marks: '95' }
    ];
    
    demoStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name} - ${student.id}</td>
            <td>
                <input type="number" value="${student.marks}" min="0" max="100" style="width: 60px; padding: 5px;">
            </td>
            <td>
                <button class="edit-btn"><i class="fas fa-save"></i></button>
            </td>
        `;
        ctMarksList.appendChild(row);
    });
}