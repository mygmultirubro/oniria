function interpretDream() {
  const input = document.getElementById('dreamInput').value.toLowerCase();
  let matched = null;

  for (const keyword in dreamDictionary) {
    if (input.includes(keyword)) {
      matched = dreamDictionary[keyword];
      updateStats(matched);
      break;
    }
  }

  const result = document.getElementById('result');
  if (matched !== null) {
    result.textContent = `El número para tu sueño es: ${matched}`;
  } else {
    result.textContent = "No se encontró coincidencia. Intenta con otra descripción.";
  }
}

function updateStats(number) {
  const statRef = db.ref('stats/' + number);
  statRef.transaction(current => (current || 0) + 1);
}

function loadStats() {
  const statsList = document.getElementById('statsList');
  db.ref('stats').on('value', snapshot => {
    statsList.innerHTML = '';
    const data = snapshot.val();
    for (const number in data) {
      const li = document.createElement('li');
      li.textContent = `Número ${number}: ${data[number]} ocurrencias`;
      statsList.appendChild(li);
    }
  });
}

window.addEventListener('load', () => {
  const welcome = document.getElementById('welcome');
  setTimeout(() => {
    welcome.classList.add('opacity-0');
    setTimeout(() => welcome.remove(), 1000);
  }, 2000);
});


loadStats();

