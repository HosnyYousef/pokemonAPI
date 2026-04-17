const statNames = {
  'hp': 'HP',
  'attack': 'ATK',
  'defense': 'DEF',
  'special-attack': 'SP.ATK',
  'special-defense': 'SP.DEF',
  'speed': 'SPD'
}

document.querySelector('.click').addEventListener('click', getFetch)

document.querySelector('.search-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') getFetch()
})

document.querySelectorAll('.pokemon-grid li').forEach(li => {
  li.addEventListener('click', () => {
    document.querySelectorAll('.pokemon-grid li').forEach(l => l.classList.remove('active'))
    li.classList.add('active')
    document.querySelector('.search-input').value = li.innerText
    getFetch()
  })
})

function getFetch() {
  const choice = document.querySelector('.search-input').value.toLowerCase().trim()
  if (!choice) return

  const screen = document.getElementById('screen')
  const locBox = document.getElementById('locations-box')
  const locList = document.getElementById('locations-list')

  // Loading state on screen
  screen.innerHTML = `
    <div class="screen-idle">
      <div class="idle-ball"></div>
      <p class="idle-text">LOADING...</p>
    </div>
  `
  locBox.style.display = 'block'
  locList.innerHTML = '<span class="loading">SCANNING...</span>'

  fetch(`https://pokeapi.co/api/v2/pokemon/${choice.toLowerCase().replace(/[♀♂]/g, '')}`)
    .then(res => {
      if (!res.ok) throw new Error('not found')
      return res.json()
    })
    .then(data => {
      renderScreen(data)
      return fetch(data.location_area_encounters)
    })
    .then(res => res.json())
    .then(locationData => renderLocations(locationData))
    .catch(err => {
      console.error(err)
      screen.innerHTML = `
        <div class="screen-idle">
          <p class="idle-text">NOT FOUND</p>
        </div>
      `
      locList.innerHTML = `<span style="color:#e03020; font-size:0.75rem;">Could not find "${choice}". Check spelling.</span>`
    })
}

function renderScreen(data) {
  const screen = document.getElementById('screen')

  const img = data.sprites.other['official-artwork'].front_default || data.sprites.front_default || ''
  const number = String(data.id).padStart(3, '0')
  const types = data.types.map(t =>
    `<span class="screen-type">${t.type.name}</span>`
  ).join('')

  const stats = data.stats.map(s => {
    const name = statNames[s.stat.name] || s.stat.name
    const val = s.base_stat
    const pct = Math.min((val / 255) * 100, 100)
    return `
      <div class="screen-stat-row">
        <span class="screen-stat-name">${name}</span>
        <span class="screen-stat-val">${val}</span>
        <div class="screen-stat-bar-bg">
          <div class="screen-stat-bar" style="width:${pct}%"></div>
        </div>
      </div>
    `
  }).join('')

  screen.innerHTML = `
    <div class="screen-content">
      <span class="screen-number">#${number}</span>
      <div class="screen-img-wrap">
        <img src="${img}" alt="${data.name}" />
      </div>
      <div class="screen-name">${data.name.toUpperCase()}</div>
      <div class="screen-types">${types}</div>
      <div class="screen-stats">${stats}</div>
    </div>
  `
}

function renderLocations(locationData) {
  const locList = document.getElementById('locations-list')

  if (!locationData || locationData.length === 0) {
    locList.innerHTML = '<span style="color:var(--text-dim); font-size:0.75rem;">No wild encounter locations found.</span>'
    return
  }

  locList.innerHTML = locationData.map(loc =>
    `<span class="location-tag">${loc.location_area.name.replaceAll('-', ' ')}</span>`
  ).join('')
}