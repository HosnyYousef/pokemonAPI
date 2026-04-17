// Stat name display mapping
const statNames = {
  'hp': 'HP',
  'attack': 'Attack',
  'defense': 'Defense',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  'speed': 'Speed'
}

// Stat bar color based on value
function statColor(val) {
  if (val >= 100) return '#39d353'
  if (val >= 70)  return '#f7d02c'
  if (val >= 45)  return '#F08030'
  return '#e3350d'
}

// Click search button
document.querySelector('.click').addEventListener('click', getFetch)

// Press Enter to search
document.querySelector('.search-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') getFetch()
})

// Click a starter to auto-search
document.querySelectorAll('.starters-grid li').forEach(li => {
  li.addEventListener('click', () => {
    document.querySelector('.search-input').value = li.innerText
    getFetch()
  })
})

function getFetch() {
  const choice = document.querySelector('.search-input').value.toLowerCase().trim()
  if (!choice) return

  const cardSection = document.getElementById('card-section')
  const locSection = document.getElementById('locations-section')
  const locList = document.getElementById('locations-list')

  // Show loading state
  cardSection.style.display = 'none'
  locSection.style.display = 'block'
  locList.innerHTML = '<span class="loading">SCANNING...</span>'

  fetch(`https://pokeapi.co/api/v2/pokemon/${choice}`)
    .then(res => {
      if (!res.ok) throw new Error('not found')
      return res.json()
    })
    .then(data => {
      renderCard(data)

      // Fetch locations separately
      return fetch(data.location_area_encounters)
    })
    .then(res => res.json())
    .then(locationData => {
      renderLocations(locationData)
    })
    .catch(err => {
      console.error(err)
      cardSection.style.display = 'none'
      locSection.style.display = 'block'
      locList.innerHTML = `<span style="color: var(--red); font-size: 0.8rem;">Could not find "${choice}". Check spelling and try again.</span>`
    })
}

function renderCard(data) {
  const cardSection = document.getElementById('card-section')

  // Number
  document.getElementById('poke-number').innerText = `#${String(data.id).padStart(3, '0')}`

  // Image — prefer official artwork, fall back to sprite
  const img = document.getElementById('poke-img')
  img.src = data.sprites.other['official-artwork'].front_default
    || data.sprites.front_default
    || ''
  img.alt = data.name

  // Name
  document.getElementById('poke-name').innerText = data.name.toUpperCase()

  // Types
  const typesEl = document.getElementById('poke-types')
  typesEl.innerHTML = data.types.map(t =>
    `<span class="type-badge type-${t.type.name}">${t.type.name}</span>`
  ).join('')

  // Meta (height / weight)
  document.getElementById('poke-meta').innerHTML = `
    <span><strong>${(data.height / 10).toFixed(1)}m</strong>Height</span>
    <span><strong>${(data.weight / 10).toFixed(1)}kg</strong>Weight</span>
    <span><strong>${data.base_experience || '—'}</strong>Base XP</span>
  `

  // Stats
  const statsList = document.getElementById('stats-list')
  statsList.innerHTML = data.stats.map(s => {
    const name = statNames[s.stat.name] || s.stat.name
    const val = s.base_stat
    const pct = Math.min((val / 255) * 100, 100)
    const color = statColor(val)
    return `
      <div class="stat-row">
        <span class="stat-name">${name}</span>
        <span class="stat-val">${val}</span>
        <div class="stat-bar-bg">
          <div class="stat-bar" style="width: ${pct}%; background: ${color};"></div>
        </div>
      </div>
    `
  }).join('')

  cardSection.style.display = 'block'
}

function renderLocations(locationData) {
  const locSection = document.getElementById('locations-section')
  const locList = document.getElementById('locations-list')

  if (!locationData || locationData.length === 0) {
    locList.innerHTML = '<span style="color: var(--text-dim); font-size: 0.8rem;">No wild encounter locations found.</span>'
    return
  }

  locList.innerHTML = locationData.map(loc =>
    `<span class="location-tag">${loc.location_area.name.replaceAll('-', ' ')}</span>`
  ).join('')

  locSection.style.display = 'block'
}