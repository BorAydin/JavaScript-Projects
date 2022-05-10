// Oyun Değerleri
let min = 1,
    max = 10,
    winningNum = Math.floor(Math.random()*10+1); // Math.floor(Math.random()*(max-min+1)+min) Formül
    guessesLeft = 3;

// UI Elementleri
const game = document.querySelector('#game'),
      minNum = document.querySelector('.min-num'),
      maxNum = document.querySelector('.max-num'),
      guessBtn = document.querySelector('#guess-btn'),
      guessInput = document.querySelector('#guess-input'),
      message = document.querySelector('.message');

// UI'ye min ve max değerleri atama
minNum.textContent = min;
maxNum.textContent = max;

// Yeniden Oynama için Olay Dinleyicisi
game.addEventListener('mouseup', function(e){
  
 if(e.target.className === 'play-again'){
    window.location.reload();
  }

 e.preventDefault();

});

// Tahmin için Dinleme
guessBtn.addEventListener('click', function(){
  
  let guess = parseInt(guessInput.value);

  // Onaylama
  if(isNaN(guess) || guess < min || guess > max){
    
    setMessage(`Lütfen ${min} ile ${max} arasında bir sayı giriniz`, 'red');

  } else {
    
      guessesLeft -= 1;

      // Kazanma Kontrolü
      if(guess === winningNum){

      gameOver(true, `${winningNum} doğru, kazandın`);

      } else {

          if(guessesLeft === 0 ){

            gameOver(false, `Oyun bitti, kaybettin. Doğru sayı ${winningNum}`);

            } else if(guessesLeft > 0 ){

              guessInput.style.borderColor = 'red';

              // Girişi Temizle
              guessInput.value = '';

              setMessage(`${guess} doğru değil, ${guessesLeft} hakkınız kaldı.`, 'red');
            }  
        }
    }
})

function gameOver(won, msg){

  let color;
  won === true ? color = 'green' : color = 'red'

  // Giriş alanını disabled yapma
  guessInput.disabled = true;
  // Border rengini değiştirme
  guessInput.style.borderColor = color;
  // Text rengini değiştirme
  message.style.color = color;

  setMessage(msg);

  // Yeniden Oynama
  guessBtn.value = ' Yenİden Oynama';
  guessBtn.className += 'play-again';
}

function setMessage(msg, color){
  message.style.color = color;
  message.textContent = msg;
}

