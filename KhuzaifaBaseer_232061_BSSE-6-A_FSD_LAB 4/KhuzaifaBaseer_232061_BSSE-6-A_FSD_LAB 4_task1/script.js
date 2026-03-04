const input = document.getElementById('itemInput');
const addBtn = document.getElementById('addBtn');
const itemList = document.getElementById('itemList');
const emptyMsg = document.getElementById('emptyMsg');

function updateEmpty() {
  emptyMsg.style.display = itemList.children.length === 0 ? 'block' : 'none';
}

function addItem() {
  const text = input.value.trim();
  if (!text) {
    input.focus();
    input.style.borderColor = '#ff4444';
    setTimeout(() => input.style.borderColor = '', 800);
    return;
  }

  const li = document.createElement('li');
  li.innerHTML = `<span class="item-text">${text}</span><button class="delete-btn">Delete</button>`;

  li.querySelector('.delete-btn').addEventListener('click', () => {
    li.classList.add('removing');
    setTimeout(() => { li.remove(); updateEmpty(); }, 200);
  });

  itemList.appendChild(li);
  input.value = '';
  input.focus();
  updateEmpty();
}

addBtn.addEventListener('click', addItem);
input.addEventListener('keydown', e => { if (e.key === 'Enter') addItem(); });

updateEmpty();
