document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const registerNumber = e.target.registerNumber.value;

  const response = await fetch('/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ registerNumber })
  });

  const result = await response.text();
  document.getElementById('loginMessage').textContent = result;
});
