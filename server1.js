const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch('http://localhost:8000/register-bloodbank', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        location: form.location,
        bloodAvailability: form.bloodAvailability,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      setForm({ name: '', location: '', bloodAvailability: '' });
    } else {
      alert(data.message);
    }
  } catch (err) {
    alert("❌ Something went wrong. Try again later.");
    console.error(err);
  }
};
