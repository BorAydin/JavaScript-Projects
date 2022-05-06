const data = [
  {
    name: 'Tan Taşçı',
    age: 41,
    location: 'Muğla EG',
    image: 'Fotoğraflar/tan.jpg'
  },
  {
    name: 'Gökhan Türkmen',
    age: 38,
    location: 'İstanbul MA',
    image: 'Fotoğraflar/gt.jpg'
  },
  {
    name: 'Sarp Palaur',
    age: 34,
    location: 'İstanbul MA',
    image: 'Fotoğraflar/sarp.jpg'
  },
];

const profiles = profileIterator(data);

// Sonraki Olayı
document.getElementById('next').addEventListener('click', nextProfile);

// Sonraki Profil Gösterme
function nextProfile() {
  
  const currentProfile = profiles.next().value;

  if(currentProfile !== undefined){

  document.getElementById('profileDisplay').innerHTML = `
    <ul class="list-group">
      <li class="list-group-item">Ad: ${currentProfile.name}
      </li>
      <li class="list-group-item">Yaş: ${currentProfile.age}
      </li>
      <li class="list-group-item">Konum: ${currentProfile.location}
      </li>
    </ul>
  `;

  document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}">`;

  } else {
    window.location.reload();
  }
}

// Profile Iterator
function profileIterator(profiles) {
  
  let nextIndex = 0;

  return {
    next: function() {
      return nextIndex < profiles.length ? 
      { value: profiles[nextIndex++], done: false} :
      { done: true }
    }
  }
};

