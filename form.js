document.getElementById('studentForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const data = {
    registerNumber: form.registerNumber.value,
    name: form.name.value,
    email: form.email.value,
    phone: form.phone.value,
    department: form.department.value,
    dob: form.dob.value
  };

  const response = await fetch('/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });

  const result = await response.text();
  document.getElementById('message').textContent = result;
  form.reset();
});