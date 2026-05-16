// app.js – UI Logic, .then() / .catch() handling, DOM rendering

// ─── TOGGLE ───────────────────────────────────────────────────────────────────
const failToggle = document.getElementById('fail-toggle');
const toggleHint = document.getElementById('toggle-hint');

failToggle.addEventListener('change', () => {
  simulateFailure = failToggle.checked;           // Update the boolean flag in fetchUsers.js
  toggleHint.textContent = simulateFailure
    ? '❌ Server failure will be triggered'
    : '✅ Data will load successfully after 3s';
  toggleHint.style.color = simulateFailure ? '#ff6b6b' : '#3ecf8e';
});

// ─── MAIN HANDLER ─────────────────────────────────────────────────────────────
function handleLoad() {
  // Reset UI before each load
  resetUI();
  setLoadingState(true);
  activateStep('step-call');

  consoleLog('info', `simulateFailure = ${simulateFailure}`);

  // ── Call fetchUsers() and handle with .then() and .catch() ──────────────────
  fetchUsers()

    .then(function(users) {
      // ── .then() — Promise resolved successfully ──────────────────────────────
      consoleLog('success', `.then() fired — received ${users.length} user objects`);
      activateStep('step-pending', false);
      activateStep('step-settle',  true, '✅', 'resolve()');
      activateStep('step-handler', true, '🟢', '.then()');

      setLoadingState(false);
      showSuccess(users);
    })

    .catch(function(errorMsg) {
      // ── .catch() — Promise rejected ──────────────────────────────────────────
      consoleLog('error', `.catch() fired — ${errorMsg}`);
      activateStep('step-pending', false);
      activateStep('step-settle',  true, '❌', 'reject()');
      activateStep('step-handler', true, '🔴', '.catch()');

      setLoadingState(false);
      showError(errorMsg);
    });

  // Show pending state in the flow diagram after a short tick
  setTimeout(() => activateStep('step-pending'), 100);
}

// ─── UI STATE HELPERS ─────────────────────────────────────────────────────────
function setLoadingState(isLoading) {
  const btn      = document.getElementById('load-btn');
  const statusEl = document.getElementById('status-area');

  btn.disabled = isLoading;

  if (isLoading) {
    statusEl.innerHTML = `
      <div class="loader-wrap">
        <div class="spinner"></div>
        <p class="loader-text">Fetching users from server<span class="dots"></span></p>
        <p class="loader-sub">setTimeout — 3 second delay</p>
      </div>`;
  }
}

function showSuccess(users) {
  const statusEl  = document.getElementById('status-area');
  const section   = document.getElementById('results-section');
  const grid      = document.getElementById('user-grid');
  const countEl   = document.getElementById('results-count');

  statusEl.innerHTML = `<p class="success-msg">✅ Promise resolved — ${users.length} users loaded successfully!</p>`;

  countEl.textContent = `${users.length} users`;
  grid.innerHTML = users.map(user => buildUserCard(user)).join('');
  section.classList.remove('hidden');

  // Staggered card entrance
  document.querySelectorAll('.user-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 80}ms`;
  });
}

function showError(msg) {
  const statusEl = document.getElementById('status-area');
  const section  = document.getElementById('results-section');

  section.classList.add('hidden');
  statusEl.innerHTML = `
    <div class="error-wrap">
      <div class="error-icon">💥</div>
      <p class="error-title">Promise Rejected</p>
      <p class="error-msg">${msg}</p>
    </div>`;
}

function resetUI() {
  document.getElementById('results-section').classList.add('hidden');
  document.getElementById('console-body').innerHTML = '<p class="console-line muted">// Waiting for execution...</p>';

  // Reset flow steps
  ['step-call', 'step-pending', 'step-settle', 'step-handler'].forEach(id => {
    document.getElementById(id).classList.remove('active', 'resolved', 'rejected');
  });
  document.getElementById('settle-icon').textContent   = '❓';
  document.getElementById('settle-label').textContent  = 'resolve / reject';
  document.getElementById('handler-icon').textContent  = '🔲';
  document.getElementById('handler-label').textContent = '.then() / .catch()';
}

// ─── FLOW DIAGRAM ─────────────────────────────────────────────────────────────
function activateStep(id, isActive = true, icon, label) {
  const el = document.getElementById(id);
  if (!el) return;
  if (isActive) {
    el.classList.add('active');
    if (icon)  document.getElementById(id.replace('step-', '') + '-icon')  && (document.getElementById(id.replace('step-', '') + '-icon').textContent = icon);
    if (label) document.getElementById(id.replace('step-', '') + '-label') && (document.getElementById(id.replace('step-', '') + '-label').textContent = label);
    // Mark settle/handler as resolved or rejected
    if (icon === '✅' || icon === '🟢') el.classList.add('resolved');
    if (icon === '❌' || icon === '🔴') el.classList.add('rejected');
  }
}

// ─── USER CARD ────────────────────────────────────────────────────────────────
function buildUserCard(user) {
  const statusClass = { active: 'status-active', idle: 'status-idle', offline: 'status-offline' };
  return `
    <div class="user-card">
      <div class="user-avatar">${user.avatar}</div>
      <div class="user-info">
        <p class="user-name">${user.name}</p>
        <p class="user-role">${user.role}</p>
        <p class="user-email">${user.email}</p>
      </div>
      <span class="status-dot ${statusClass[user.status]}" title="${user.status}"></span>
    </div>`;
}

// ─── CONSOLE LOGGER ───────────────────────────────────────────────────────────
function consoleLog(type, message) {
  const body = document.getElementById('console-body');
  const time = new Date().toLocaleTimeString();
  const colors = { info: 'log-info', success: 'log-success', error: 'log-error' };
  const prefix = { info: '›', success: '✓', error: '✗' };

  // Remove idle message
  const idle = body.querySelector('.muted');
  if (idle) idle.remove();

  const line = document.createElement('p');
  line.className = `console-line ${colors[type]}`;
  line.innerHTML = `<span class="log-time">[${time}]</span> <span class="log-prefix">${prefix[type]}</span> ${message}`;
  body.appendChild(line);
  body.scrollTop = body.scrollHeight;
}
