// app.js – Student Management Logic

// ── State ──────────────────────────────────────────────────────────────────────
const students    = [];   // const: array reference never changes
let   nextId      = 101;  // let: increments with each new student
let   pendingCourses = []; // let: resets after each form submission

// ── Semester badge colours ──────────────────────────────────────────────────────
const semesterColors = {
  1: '#4CAF50', 2: '#66BB6A', 3: '#2196F3', 4: '#42A5F5',
  5: '#9C27B0', 6: '#CE93D8', 7: '#FF5722', 8: '#F44336',
};

// ── Pre-load 3 default students (lab requirement) ───────────────────────────────
(function seedDefaults() {
  const defaults = [
    new Student(nextId++, 'Ayesha Khan',   3, ['Web Technologies', 'Data Structures', 'OOP']),
    new Student(nextId++, 'Bilal Ahmed',   5, ['Software Engineering', 'Database Systems', 'AI']),
    new Student(nextId++, 'Sara Malik',    1, ['Programming Fundamentals', 'Applied Physics']),
  ];
  defaults.forEach(s => students.push(s));
  updateIdPreview();
  renderAll();
})();

// ── FORM: Course Tag Handling ───────────────────────────────────────────────────
function addCourseTag() {
  const input  = document.getElementById('input-course');
  const course = input.value.trim();

  if (!course) return;
  if (pendingCourses.includes(course)) {
    showError('That course is already added.');
    return;
  }

  pendingCourses.push(course);
  input.value = '';
  renderCourseTags();
  input.focus();
}

// Allow pressing Enter in course field to add tag
document.getElementById('input-course').addEventListener('keydown', e => {
  if (e.key === 'Enter') { e.preventDefault(); addCourseTag(); }
});

function removeCourseTag(index) {
  pendingCourses.splice(index, 1);
  renderCourseTags();
}

function renderCourseTags() {
  const container = document.getElementById('course-tags');
  if (pendingCourses.length === 0) {
    container.innerHTML = '<span class="tags-placeholder">No courses added yet</span>';
    return;
  }
  // Template literal used to build each tag
  container.innerHTML = pendingCourses
    .map((course, i) => `
      <span class="course-tag">
        ${course}
        <button class="tag-remove" onclick="removeCourseTag(${i})">✕</button>
      </span>`)
    .join('');
}

// ── FORM: Add Student ──────────────────────────────────────────────────────────
function handleAddStudent() {
  clearError();

  const name     = document.getElementById('input-name').value.trim();
  const semester = document.getElementById('input-semester').value;

  // Validation
  if (!name)               return showError('Please enter the student name.');
  if (!semester)           return showError('Please select a semester.');
  if (pendingCourses.length === 0) return showError('Add at least one course.');

  // Create new Student using ES6 Class + const (immutable reference to the object)
  const newStudent = new Student(nextId++, name, Number(semester), [...pendingCourses]);
  students.push(newStudent);

  updateIdPreview();
  renderAll();
  resetForm();
  showToast(`✅ ${newStudent.name} added successfully!`);
}

// ── FORM: Reset ────────────────────────────────────────────────────────────────
function resetForm() {
  document.getElementById('input-name').value     = '';
  document.getElementById('input-semester').value = '';
  document.getElementById('input-course').value   = '';
  pendingCourses = [];
  renderCourseTags();
  clearError();
}

function updateIdPreview() {
  document.getElementById('input-id').placeholder = `Auto: ${nextId}`;
}

// ── DELETE Student ─────────────────────────────────────────────────────────────
function deleteStudent(id) {
  const index = students.findIndex(s => s.id === id);
  if (index === -1) return;
  const name = students[index].name;
  students.splice(index, 1);
  renderAll();
  showToast(`🗑 ${name} removed.`);
}

// ── RENDER All Students via innerHTML ──────────────────────────────────────────
function renderAll() {
  const container = document.getElementById('students-container');
  const badge     = document.getElementById('count-badge');

  badge.textContent = `${students.length} student${students.length !== 1 ? 's' : ''}`;

  if (students.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p class="empty-icon">📋</p>
        <p class="empty-msg">No students yet.<br/>Use the form to add one!</p>
      </div>`;
    return;
  }

  // Build all cards via innerHTML using template literals
  let html = '';
  students.forEach(student => {
    const color = semesterColors[student.semester] || '#607D8B';
    const tags  = student.courses
      .map(c => `<span class="course-tag readonly-tag">${c}</span>`)
      .join('');

    // Template literal for each student card
    html += `
      <div class="student-card" id="card-${student.id}">
        <div class="card-header" style="background:${color}">
          <span class="s-id">ID: ${student.id}</span>
          <span class="s-sem">Semester ${student.semester}</span>
          <button class="delete-btn" onclick="deleteStudent(${student.id})" title="Remove student">🗑</button>
        </div>
        <div class="card-body">
          <h3 class="s-name">${student.name}</h3>
          <p class="s-summary">${student.getSummary()}</p>
          <div class="s-courses">
            <p class="courses-label">Courses (${student.getTotalCourses()})</p>
            <div class="course-tags-wrap">${tags}</div>
          </div>
        </div>
      </div>`;
  });

  container.innerHTML = html;
}

// ── Error / Toast helpers ──────────────────────────────────────────────────────
function showError(msg) {
  const el = document.getElementById('form-error');
  el.textContent = msg;
  el.classList.remove('hidden');
}
function clearError() {
  const el = document.getElementById('form-error');
  el.textContent = '';
  el.classList.add('hidden');
}
function showToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2600);
}
