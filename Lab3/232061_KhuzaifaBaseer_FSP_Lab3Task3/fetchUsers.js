// fetchUsers.js – Async Data Loader using Promises

// Boolean flag to simulate server failure (toggled from the UI)
let simulateFailure = false;

// ─── USER DATA ────────────────────────────────────────────────────────────────
const USER_DATA = [
  { id: 1, name: 'Ayesha Khan',   role: 'Frontend Developer', email: 'ayesha@devco.io',   avatar: '👩‍💻', status: 'active'   },
  { id: 2, name: 'Bilal Ahmed',   role: 'Backend Engineer',   email: 'bilal@devco.io',     avatar: '👨‍💻', status: 'active'   },
  { id: 3, name: 'Sara Malik',    role: 'UI/UX Designer',     email: 'sara@devco.io',      avatar: '👩‍🎨', status: 'idle'     },
  { id: 4, name: 'Usman Tariq',   role: 'DevOps Engineer',    email: 'usman@devco.io',     avatar: '👨‍🔧', status: 'active'   },
  { id: 5, name: 'Hina Raza',     role: 'Data Analyst',       email: 'hina@devco.io',      avatar: '👩‍🔬', status: 'offline'  },
  { id: 6, name: 'Zain ul Abdin', role: 'Mobile Developer',   email: 'zain@devco.io',      avatar: '👨‍🚀', status: 'active'   },
];

// ─── PROMISE FUNCTION ────────────────────────────────────────────────────────
/**
 * fetchUsers()
 * Returns a Promise that:
 *  - Waits 3 seconds (simulating a network request with setTimeout)
 *  - Resolves with an array of user objects   → if simulateFailure === false
 *  - Rejects  with an error message           → if simulateFailure === true
 */
function fetchUsers() {
  return new Promise((resolve, reject) => {

    consoleLog('info', 'fetchUsers() called — Promise created (state: PENDING)');
    consoleLog('info', 'setTimeout started — waiting 3000ms...');

    setTimeout(() => {

      // Boolean flag decides resolve or reject
      if (simulateFailure) {
        // REJECT – server failure simulation
        consoleLog('error', 'Server error! Calling reject()...');
        reject('❌ Server Error 500: Failed to load users. Please try again.');
      } else {
        // RESOLVE – return user data
        consoleLog('success', `Data received! Calling resolve() with ${USER_DATA.length} users...`);
        resolve(USER_DATA);
      }

    }, 3000); // 3-second delay

  });
}
