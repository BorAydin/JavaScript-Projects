// Github ilkleme
const github = new Github;

// UI ilkleme
const ui = new UI;

// Arama Girişi
const searchUSer = document.getElementById('searchUser');

// Arama Girişi Olay Dinleyicisi
searchUSer.addEventListener('keyup', (e) => {
  // Texti alma
  const userText = e.target.value;

  if(userText !== ''){
    github.getUser(userText)
      .then(data => {
        if(data.profile.message === 'Not Found'){
          // Hata Gösterme
          ui.showAlert('Kullanıcı bulunamadı.', 'alert alert-danger');
        } else {
          // Profili Gösterme
          ui.showProfile(data.profile);
          ui.showRepos(data.repos);
        }
      })
  } else {
    //Profili Temizleme
    ui.clearProfile();
  }
});