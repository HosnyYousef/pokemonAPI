# Pokédex — Generation I

A browser-based Pokédex built with vanilla JavaScript and the PokéAPI. Search any of the original 151 Pokémon to see their sprite, types, base stats, and wild encounter locations — all displayed inside a Pokédex-shaped UI.

[Live Demo](https://pokemonworldapi.netlify.app)

---

## What it does

- Search any Gen I Pokémon by name
- Displays official artwork on a Game Boy-style screen
- Shows type badges, base stats with visual bars, height, and weight
- Lists wild encounter locations pulled from a second API call
- Click any Pokémon from the full 151 list to auto-search
- Fully responsive — stacks vertically on mobile

---

## Tech

`HTML` `CSS` `Vanilla JavaScript` `PokéAPI`

No frameworks, no build tools. Two chained `fetch()` calls — one for Pokémon data, one for encounter locations.

---

## How it works

```javascript
// First fetch: get Pokemon data
fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
  .then(res => res.json())
  .then(data => {
    renderScreen(data) // render image, types, stats
    return fetch(data.location_area_encounters) // second fetch
  })
  .then(res => res.json())
  .then(locationData => renderLocations(locationData))
```

The `location_area_encounters` field in the first response is itself a URL — the app chains a second fetch to that URL to get the location data.

---

## Run locally

No install needed. Clone the repo, open `index.html` with Live Server in VS Code, or just open it directly in your browser.

```bash
git clone https://github.com/HosnyYousef/pokemonAPI
cd pokemonAPI
# Open index.html with Live Server
```

---

## API

This project uses the [PokéAPI](https://pokeapi.co/) — a free, open REST API with data on every Pokémon game. No API key required.