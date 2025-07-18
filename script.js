// Grab your elements
const countrySelect = document.getElementById('countrySelect');
const shareInput   = document.getElementById('shareInput');
const lookupBtn    = document.getElementById('lookupBtn');
const resultDiv    = document.getElementById('result');

let data = [];

// Load data.json on page load
fetch('data.json')
  .then(res => res.json())
  .then(json => {
    data = json;
    populateCountries();
  })
  .catch(err => {
    resultDiv.textContent = 'Error loading data.';
    console.error(err);
  });

// Fill dropdown with unique country names
function populateCountries() {
  const countries = [...new Set(data.map(d => d.country))];
  countries.forEach(c => {
    const opt = document.createElement('option');
    opt.value = c;
    opt.textContent = c;
    countrySelect.appendChild(opt);
  });
}

// When lookup button is clicked…
lookupBtn.addEventListener('click', () => {
  const country = countrySelect.value;
  const share   = parseFloat(shareInput.value);

  if (!country || isNaN(share)) {
    resultDiv.textContent = 'Please select a country and enter a share between 0 and 100.';
    return;
  }

  // Find the entry with matching country & share
  // (you can adjust matching logic: nearest neighbor, exact match, ranges…)
  const entry = data.find(d =>
    d.country === country &&
    d.share === share
  );

  if (entry) {
    resultDiv.textContent = 
      `Energy consumption for ${entry.country} at ${entry.share}% worst-performing buildings: ` +
      `${entry.energy} units.`;
  } else {
    resultDiv.textContent = 
      `No data found for ${country} at ${share}%.`;
  }
});
