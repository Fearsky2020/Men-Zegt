(() => {
  const hours = { 1: null, 2: [12, 21], 3: [12, 21], 4: [12, 21], 5: [12, 22], 6: [12, 22], 0: [16, 21] };
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Amsterdam', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false }).formatToParts(new Date());
  const value = Object.fromEntries(parts.map(part => [part.type, part.value]));
  const day = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 }[value.weekday];
  const now = Number(value.hour) + Number(value.minute) / 60;
  const today = hours[day];
  const label = document.querySelector('#open-status');
  const dot = document.querySelector('#open-dot');
  const nextOpening = () => {
    for (let offset = 1; offset <= 7; offset += 1) {
      const next = hours[(day + offset) % 7];
      if (next) return offset === 1 ? `morgen open om ${next[0]}:00` : `${['zondag','maandag','dinsdag','woensdag','donderdag','vrijdag','zaterdag'][(day + offset) % 7]} open om ${next[0]}:00`;
    }
    return 'openingstijden onbekend';
  };
  if (!today) { label.textContent = `Vandaag gesloten · ${nextOpening()}`; dot.classList.add('closed'); }
  else if (now < today[0]) label.textContent = `Vandaag open vanaf ${String(today[0]).padStart(2, '0')}:00`;
  else if (now < today[1]) label.textContent = `Nu open · tot ${today[1]}:00`;
  else { label.textContent = `Nu gesloten · ${nextOpening()}`; dot.classList.add('closed'); }
})();

// Use the customer's MZ mark in the browser tab.
const favicon = document.createElement('link');
favicon.rel = 'icon';
favicon.type = 'image/svg+xml';
favicon.href = 'favicon.svg';
document.head.appendChild(favicon);
