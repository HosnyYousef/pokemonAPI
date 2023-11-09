document.querySelector('.click').addEventListener('click', getFetch)

function getFetch() {
  const choice = document.querySelector('input').value.toLowerCase();

  fetch(`https://pokeapi.co/api/v2/pokemon/${choice}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
      console.log('Pokemon data:', data);

      // data.location_area_encounters is typically a URL to another API endpoint
      return fetch(data.location_area_encounters); // start the next fetch here
    })
    .then(res => res.json())
    .then(locationData => {
      console.log('Location data:', locationData);

      // Clear previous results
      document.querySelector('h4').innerText = '';
      
      // Add all locations to the innerText of h4
      locationData.forEach((location, index) => {
        document.querySelector('h4').innerText += `${location.location_area.name}${index < locationData.length - 1 ? ', ' : ''}`;
      });
    })
    .catch(err => {
      console.error(`error ${err}`);
      // Display error in h4 if something goes wrong
      document.querySelector('h4').innerText = "Error fetching location data";
    });
}




//ALLOWS FOR ONE LOCATION TO BE DISPLAYED, AND FIXED PROBLEM

// document.querySelector('.click').addEventListener('click', getFetch)

// function getFetch() {
//   const choice = document.querySelector('input').value.toLowerCase()

//   fetch(`https://pokeapi.co/api/v2/pokemon/${choice}`)
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {
//       console.log(data.location_area_encounters);

//       // Assuming location_area_encounters is a URL to fetch further data
//       fetch(data.location_area_encounters)
//         .then(res => res.json())
//         .then(locationData => {
//           // Assuming locationData is an array and we are interested in the first item
//           if (locationData.length > 0) {
//             document.querySelector('h4').innerText = locationData[0].location_area.name;
//           } else {
//             document.querySelector('h4').innerText = "No location data found";
//           }
//         })
//         .catch(err => {
//           console.error(`error ${err}`);
//           document.querySelector('h4').innerText = "Error fetching location data";
//         });

//     })
//     .catch(err => {
//       console.error(`error ${err}`);
//       document.querySelector('h4').innerText = "Error fetching Pokémon data";
//     });
// }



// // //The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// document.querySelector('.click').addEventListener('click', getFetch)

// function getFetch(){
//     const choice = document.querySelector('input').value.toLowerCase()
  
//     const url = `https://pokeapi.co/api/v2/pokemon/${choice}`
  
//     let pokiLocation = []

//     fetch(url)
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {
//       for(let x = 0; x < data.location_area_encounters.length; x++) {
//         pokiLocation.push(data.location_area_encounters[x])
//       }
//       console.log(data.location_area_encounters)
      
//       fetch(data.location_area_encounters)
//       .then(res => res.json()) // parse response as JSON
//       .then(data2 => 
      
//       console.log(data2))

//       document.querySelector('h4').innerText = pokiLocation[x].location_area.name
//       // document.querySelector('h2').innerText = zeldaArray[0].name
//       // document.querySelector("h2").innerText = drinkArray[0].strDrink

//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     });
//   }


//========================================

// The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM

// ORGINAL:

// document.querySelector('.click').addEventListener('click', getFetch)

// function getFetch(){
//     const choice = document.querySelector('input').value.toLowerCase()
  
//     const url = `https://pokeapi.co/api/v2/pokemon/${choice}`
  
//     fetch(url)
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {
//       console.log(data.location_area_encounters)
//       fetch(data.location_area_encounters)
//       .then(res => res.json())
//       .then(data2 => console.log(data2))
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     });
//   }


//======================================
//======================================
//======================================

// OLD ATTEMPT


//Get a dog photo from the dog.ceo api and place the photo in the DOM
// fetch("https://pokeapi.co/api/v2/pokemon/1/encounters")
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {
//       console.log(data)
    //   document.querySelector('h2').innerText = data.results[0]
    //   document.querySelector('img').src = data.data.image
    //   document.querySelector('h3').innerText = data.data.description
    // })
    // .catch(err => {
    //     console.log(`error ${err}`)
    // });

    // "https://pokeapi.co/api/v2/pokemon/1/encounters"

// document.querySelector('.click').addEventListener('click', getDrink)

// document.querySelector('.click').addEventListener('click', getDrink)

// function getDrink () {
//     let drink = document.querySelector('input').value.replaceAll(' ', '_')

//     fetch(`https://pokeapi.co/api/v2/entry/${drink}`)
//     .then(res => res.json()) // parse response as JSON
//     .then(data => {
//       let resultBox = document.querySelector('.result')
//       resultBox.innerHTML = data.data.description
//       console.log(data)
//       //console.log(data.data.creatures.food)
//       document.querySelector('h2').innerText = data.data.name
//       document.querySelector('img').src = data.data.image
//       document.querySelector('h3').innerText = data.data.description
//     })
//     .catch(err => {
//         console.log(`error ${err}`)
//     })
 


// }


