const resultEl = document.getElementById('result')
const lengthEl = document.getElementById('length')
const uppercaseEl = document.getElementById('uppercase')
const lowercaseEl = document.getElementById('lowercase')
const numbersEl = document.getElementById('numbers')
const symbolsEl = document.getElementById('symbols')
const generateEl = document.getElementById('generate')
const clipboardEl = document.getElementById('clipboard')

clipboardEl.addEventListener('click', () => {
  
  const textarea = document.createElement('textarea')
  const password = resultEl.innerText

  if(!password) { return(alert('Önce şifre oluşturun.'))}

  textarea.value = password
  document.body.appendChild(textarea)
  textarea.select()
  document.execCommand('copy')
  textarea.remove()
  alert('Şifre panoya kopyalandı.')

})

generateEl.addEventListener('click', () => {
  
  const length = +lengthEl.value // + ile Number'a dönüşüm sağlıyor.
  const hasLower = lowercaseEl.checked
  const hasUpper = uppercaseEl.checked
  const hasNumber = numbersEl.checked
  const hasSymbol = symbolsEl.checked
  
  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length)
  
})

function generatePassword(lower, upper, number, symbol, length) {

  let generatedPassword = ''
  const typesCount = lower + upper + number + symbol
  const password = [];
  const funcs = [];

  if(typesCount === 0 ){
    return 'Seçim yapınız.'    
  }

  if(lower === true ){
    idx = Math.floor(Math.random()*length);
    while(!(password[idx]== undefined))
      idx = Math.floor(Math.random()*length);
    password[idx] = getRandomLower()
    funcs.push(getRandomLower)
  }

  if(upper === true ){
    idx = Math.floor(Math.random()*length);
    while(!(password[idx]== undefined))
      idx = Math.floor(Math.random()*length);
    password[idx] = getRandomUpper()
    funcs.push(getRandomUpper)
  }

  if(number === true ){
    idx = Math.floor(Math.random()*length);
    while(!(password[idx]== undefined))
      idx = Math.floor(Math.random()*length);
    password[idx] = getRandomNumber()
    funcs.push(getRandomNumber)
  }

  if(symbol === true ){
    idx = Math.floor(Math.random()*length);
    while(!(password[idx]== undefined))
      idx = Math.floor(Math.random()*length);
    password[idx] = getRandomSymbol()
    funcs.push(getRandomSymbol)
  }

  for(let i=0; i<length; i++){
    if(password[i] == undefined){
      let j= (Math.floor(Math.random()*funcs.length))
      password[i]= funcs[j]()
    } else
      continue
    }

    for(let i=0; i<password.length; i++){
      generatedPassword += password[i]
    }

  return generatedPassword
}

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}

function getRandomSymbol() {
  const symbols = '!@#$%^&(){}[]=<>/,.'
  return symbols[Math.floor(Math.random() * symbols.length)]
}
