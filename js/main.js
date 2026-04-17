document.querySelector('.click').addEventListener('click', getFetch)
 
// Allow clicking starters to auto-search
document.querySelectorAll('.starters-grid li').forEach(li => {
  li.addEventListener('click', () => {
    document.querySelector('.search-input').value = li.innerText
    getFetch()
  })
})
 
function getFetch() {
  const choice = document.querySelector('input').value.toLowerCase().trim()
  if (!choice) return
 
  const locSection = document.getElementById('locations-section')
  const h4 = document.querySelector('.locations-list')
 
  locSection.style.display = 'block'
  h4.innerHTML = '<span class="loading">SCANNING...</span>'
 
  fetch(`https://pokeapi.co/api/v2/pokemon/${choice}`)
    .then(res => {
      if (!res.ok) throw new Error('Pokémon not found')
      return res.json()
    })
    .then(data => {
      console.log('Pokemon data:', data)
      return fetch(data.location_area_encounters)
    })
    .then(res => res.json())
    .then(locationData => {
      console.log('Location data:', locationData)
 
      if (locationData.length === 0) {
        h4.innerHTML = '<span style="color: var(--text-dim); font-size: 0.8rem;">No wild encounter locations found.</span>'
        return
      }
 
      const ul = document.createElement('ul')
      locationData.forEach(location => {
        const li = document.createElement('li')
        li.innerText = location.location_area.name.replaceAll('-', ' ')
        ul.appendChild(li)
      })
 
      h4.innerHTML = ''
      h4.appendChild(ul)
    })
    .catch(err => {
      console.error(`error ${err}`)
      h4.innerHTML = `<span style="color: var(--red); font-size: 0.8rem;">Could not find "${choice}". Check spelling and try again.</span>`
    })
}