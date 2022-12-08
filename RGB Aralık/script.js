const rangeRed = document.getElementById('rangerred')
const rangeGreen = document.getElementById('rangegreen')
const rangeBlue = document.getElementById('rangeblue')
const ranges = document.querySelectorAll('.range')

rangeRed.addEventListener('input', RGB)
rangeGreen.addEventListener('input', RGB)
rangeBlue.addEventListener('input', RGB)
 
function RGB(e){
  
  const value = +e.target.value
  const label = e.target.nextElementSibling
  label.innerHTML = value
  document.body.style.backgroundColor=`rgb(${ranges[0].children[0].value}, ${ranges[1].children[0].value} , ${ranges[2].children[0].value})`

  if(rangeRed.value <= 85 || rangeGreen.value <= 85 || rangeBlue.value <= 85){
   
    if (rangeRed.value >= 170 || rangeGreen.value >= 170 ){
      
      for(let i = 0; i< ranges.length ; i++){
        
        ranges[i].previousElementSibling.style.color='black'
        ranges[i].children[1].classList.remove('active')

      }
    } else {
        
        for(let i = 0; i< ranges.length ; i++){
          
          ranges[i].previousElementSibling.style.color='white'
          ranges[i].children[1].classList.add('active') 
       }
      }
    
  } else {
      
    for(let i = 0; i< ranges.length ; i++){
      
      ranges[i].previousElementSibling.style.color='black'
      ranges[i].children[1].classList.remove('active')
    
    }
  }
}

