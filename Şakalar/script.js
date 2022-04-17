const jokeR = document.getElementById('joke');
const jokeBtn = document.getElementById('jokeBtn');

jokeBtn.addEventListener('click', generateJoke)

async function generateJoke() {
  
  const config = {
    headers: {
      'Accept': 'application/json'
    }
  }

  const res = await fetch('https://icanhazdadjoke.com', config)

  const data = await res.json()

  jokeR.innerHTML = data.joke
}

// Then kullanımı
// function generateJoke() {
  
//   const config = {
//     headers: {
//       'Accept': 'application/json'
//     }
//   }

//   fetch('https://icanhazdadjoke.com', config).then(res => res.json()).then(data => {
//     jokeR.innerHTML = data.joke
//   })
// }