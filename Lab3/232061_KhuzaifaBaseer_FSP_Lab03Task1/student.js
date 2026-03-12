// student.js – ES6 Class Definition

class Student {
  constructor(id, name, semester, courses) {
    this.id       = id;
    this.name     = name;
    this.semester = semester;
    this.courses  = courses; // array of course name strings
  }

  getTotalCourses() {
    return this.courses.length;
  }

  getCoursesList() {
    return this.courses.join(', ');
  }

  // Template literal summary
  getSummary() {
    return `Student #${this.id} — ${this.name} is in Semester ${this.semester} and enrolled in ${this.getTotalCourses()} course(s): ${this.getCoursesList()}.`;
  }
}
