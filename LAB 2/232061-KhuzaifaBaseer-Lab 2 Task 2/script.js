// ──────────────────────────────────────────────
//  Helper – get element by ID
// ──────────────────────────────────────────────
function getEl(id) {
  return document.getElementById(id);
}

// ──────────────────────────────────────────────
//  Individual operation functions
// ──────────────────────────────────────────────
function add(a, b)      { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b)   { return a / b; }

// ──────────────────────────────────────────────
//  Map operator value → symbol string
// ──────────────────────────────────────────────
function getSymbol(op) {
  if (op === "add")      return "+";
  if (op === "subtract") return "−";
  if (op === "multiply") return "×";
  if (op === "divide")   return "÷";
  return "?";
}

// ──────────────────────────────────────────────
//  Show / hide helpers
// ──────────────────────────────────────────────
function showError(msg) {
  var errBox = getEl("error-box");
  getEl("error-msg").textContent = msg;
  errBox.classList.remove("hidden");

  var resBox = getEl("result-box");
  resBox.classList.add("hidden");
}

function hideError() {
  getEl("error-box").classList.add("hidden");
}

function showResult(expression, value) {
  var resBox = getEl("result-box");
  getEl("expression").textContent   = expression;
  getEl("result-value").textContent = value;

  // Remove old colour classes
  resBox.classList.remove("positive", "negative", "zero");

  // ── BONUS: colour result box based on value ──
  if (value > 0) {
    resBox.classList.add("positive");
  } else if (value < 0) {
    resBox.classList.add("negative");
  } else {
    resBox.classList.add("zero");
  }

  resBox.classList.remove("hidden");
  hideError();
}

// ──────────────────────────────────────────────
//  Main calculate function
// ──────────────────────────────────────────────
function calculate() {
  // Read inputs
  var num1Input = getEl("num1").value.trim();
  var num2Input = getEl("num2").value.trim();
  var operator  = getEl("operator").value;

  // ── Input Validation ──
  if (num1Input === "" || num2Input === "") {
    showError("⚠ Please enter both numbers before calculating.");
    return;
  }

  var num1 = parseFloat(num1Input);
  var num2 = parseFloat(num2Input);

  if (isNaN(num1) || isNaN(num2)) {
    showError("⚠ Invalid input. Please enter valid numbers.");
    return;
  }

  // ── Division by zero check ──
  if (operator === "divide" && num2 === 0) {
    showError("⚠ Division by zero is not allowed.");
    return;
  }

  // ── Perform operation using the matching function ──
  var result;

  if (operator === "add")      { result = add(num1, num2); }
  if (operator === "subtract") { result = subtract(num1, num2); }
  if (operator === "multiply") { result = multiply(num1, num2); }
  if (operator === "divide")   { result = divide(num1, num2); }

  // Round to avoid floating-point noise (e.g. 0.1 + 0.2)
  result = Math.round(result * 1e10) / 1e10;

  // Build expression string for display
  var symbol     = getSymbol(operator);
  var expression = num1 + " " + symbol + " " + num2 + " =";

  // ── Display result in DOM ──
  showResult(expression, result);
}

// ──────────────────────────────────────────────
//  Clear / Reset everything
// ──────────────────────────────────────────────
function clearAll() {
  getEl("num1").value       = "";
  getEl("num2").value       = "";
  getEl("operator").value   = "add";

  var resBox = getEl("result-box");
  resBox.classList.add("hidden");
  resBox.classList.remove("positive", "negative", "zero");

  getEl("expression").textContent   = "";
  getEl("result-value").textContent = "";

  hideError();
}

// ──────────────────────────────────────────────
//  Allow pressing Enter to trigger calculate
// ──────────────────────────────────────────────
document.addEventListener("keydown", function(e) {
  if (e.key === "Enter") { calculate(); }
});
