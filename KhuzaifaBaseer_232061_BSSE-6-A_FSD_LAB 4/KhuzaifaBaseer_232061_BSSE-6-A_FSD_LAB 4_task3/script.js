const fields = {
  name:     { el: document.getElementById('name'),     validate: v => v.trim().length >= 2 ? '' : 'Please enter your full name (min 2 chars).' },
  email:    { el: document.getElementById('email'),    validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? '' : 'Enter a valid email address.' },
  password: { el: document.getElementById('password'), validate: v => v.length >= 8 ? '' : 'Password must be at least 8 characters.' },
  confirm:  { el: document.getElementById('confirm'),  validate: v => v === document.getElementById('password').value ? '' : 'Passwords do not match.' },
};

function validateField(key) {
  const { el, validate } = fields[key];
  const msg = validate(el.value);
  const errEl = el.nextElementSibling;
  errEl.textContent = msg;

  el.classList.toggle('error', !!msg);
  el.classList.toggle('valid', !msg && el.value.length > 0);
  return msg === '';
}

// Validate on blur
Object.keys(fields).forEach(key => {
  fields[key].el.addEventListener('blur', () => validateField(key));
  fields[key].el.addEventListener('input', () => {
    if (fields[key].el.classList.contains('error')) validateField(key);
  });
});

document.getElementById('submitBtn').addEventListener('click', () => {
  const allValid = Object.keys(fields).map(validateField).every(Boolean);
  if (allValid) {
    const banner = document.getElementById('successMsg');
    banner.classList.remove('hidden');
    // Reset
    Object.values(fields).forEach(({ el }) => {
      el.value = '';
      el.classList.remove('valid', 'error');
    });
    document.querySelectorAll('.error-msg').forEach(e => e.textContent = '');
    banner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
});
