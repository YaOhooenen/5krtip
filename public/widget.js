
const resultsEl = document.getElementById('results');
const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const addForm = document.getElementById('addForm');

async function search() {
  const city = cityInput.value.trim();
  const q = city ? `?city=${encodeURIComponent(city)}` : '';
  const res = await fetch(`/api/weather${q}`);
  const json = await res.json();
  renderList(json.data || []);
}

function renderList(list) {
  if (!list.length) {
    resultsEl.innerHTML = '<em>Ничего не найдено</em>';
    return;
  }
  resultsEl.innerHTML = list.map(item => `
    <div class="card">
      <strong>${item.city}</strong> — ${item.temp}°C — ${item.condition}
      <div><small>id: ${item.id}</small></div>
    </div>
  `).join('');
}

searchBtn.addEventListener('click', search);
cityInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') search(); });


addForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  const body = {
    city: formData.get('city'),
    temp: Number(formData.get('temp')),
    condition: formData.get('condition')
  };
  const res = await fetch('/api/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': 'secret-student-key'
    },
    body: JSON.stringify(body)
  });
  const outcome = await res.json();
  alert(res.ok ? `Added: ${outcome.city}` : `Error: ${JSON.stringify(outcome)}`);
  form.reset();
  search();
});


search();
