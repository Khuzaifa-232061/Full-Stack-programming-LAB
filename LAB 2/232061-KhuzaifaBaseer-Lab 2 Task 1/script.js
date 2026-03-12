// ──────────────────────────────────────────────
//  Quiz Data – questions stored in variables
// ──────────────────────────────────────────────

var question1 = "What does HTML stand for?";
var answer1   = "hyper text markup language";

var question2 = "Which language is used to style web pages?";
var answer2   = "css";

var question3 = "Inside which HTML element do we put JavaScript?";
var answer3   = "script";

var question4 = "What does DOM stand for?";
var answer4   = "document object model";

var question5 = "Which keyword declares a variable in modern JavaScript?";
var answer5   = "let";

// Array of question/answer pairs to loop over
var questions = [
  { q: question1, a: answer1 },
  { q: question2, a: answer2 },
  { q: question3, a: answer3 },
  { q: question4, a: answer4 },
  { q: question5, a: answer5 }
];

var totalScore = 0;   // tracks current score

// ──────────────────────────────────────────────
//  Build quiz questions in the DOM
// ──────────────────────────────────────────────
function buildQuiz() {
  var form = document.getElementById("quiz-form");
  form.innerHTML = "";   // clear first

  for (var i = 0; i < questions.length; i++) {
    var card = document.createElement("div");
    card.className = "question-card";
    card.id = "card-" + i;

    var p = document.createElement("p");
    p.textContent = "Q" + (i + 1) + ": " + questions[i].q;

    var input = document.createElement("input");
    input.type = "text";
    input.id   = "ans-" + i;
    input.placeholder = "Type your answer…";

    var feedback = document.createElement("div");
    feedback.className = "feedback";
    feedback.id = "fb-" + i;

    card.appendChild(p);
    card.appendChild(input);
    card.appendChild(feedback);
    form.appendChild(card);
  }
}

// ──────────────────────────────────────────────
//  Check a single answer  (returns 1 or 0)
// ──────────────────────────────────────────────
function checkAnswer(index) {
  var userInput  = document.getElementById("ans-" + index).value;
  var userAnswer = userInput.trim().toLowerCase();
  var correct    = questions[index].a.toLowerCase();

  var card     = document.getElementById("card-" + index);
  var feedback = document.getElementById("fb-" + index);

  if (userAnswer === correct) {
    card.className      = "question-card correct";
    feedback.className  = "feedback correct";
    feedback.textContent = "✔ Correct!";
    return 1;
  } else {
    card.className      = "question-card wrong";
    feedback.className  = "feedback wrong";
    feedback.textContent = "✘ Wrong! Answer: " + questions[index].a;
    return 0;
  }
}

// ──────────────────────────────────────────────
//  Submit quiz – check all answers & show score
// ──────────────────────────────────────────────
function submitQuiz() {
  totalScore = 0;

  for (var i = 0; i < questions.length; i++) {
    totalScore += checkAnswer(i);
  }

  displayResult(totalScore);
}

// ──────────────────────────────────────────────
//  Display score message using conditionals
// ──────────────────────────────────────────────
function displayResult(score) {
  var resultBox = document.getElementById("result-box");
  var total     = questions.length;
  var percent   = (score / total) * 100;
  var message   = "";

  resultBox.className = "";   // reset classes
  resultBox.style.display = "block";

  if (percent === 100) {
    message = "🏆 Perfect score! Excellent work!";
    resultBox.classList.add("excellent");
  } else if (percent >= 60) {
    message = "👍 Good job! Keep it up.";
    resultBox.classList.add("good");
  } else if (percent >= 40) {
    message = "😐 Average score. You can do better!";
    resultBox.classList.add("average");
  } else {
    message = "😟 Poor score. Review the material and try again.";
    resultBox.classList.add("poor");
  }

  resultBox.textContent = "Score: " + score + " / " + total + "  |  " + message;
}

// ──────────────────────────────────────────────
//  Reset quiz – clear inputs, feedback & result
// ──────────────────────────────────────────────
function resetQuiz() {
  totalScore = 0;
  buildQuiz();   // rebuild clears all feedback & inputs

  var resultBox = document.getElementById("result-box");
  resultBox.style.display = "none";
  resultBox.textContent   = "";
  resultBox.className     = "";
}

// ──────────────────────────────────────────────
//  Initialise on page load
// ──────────────────────────────────────────────
buildQuiz();
