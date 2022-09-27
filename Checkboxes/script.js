const toggles = document.querySelectorAll('.toggle')
const good = document.querySelector('#good')
const bad = document.querySelector('#bad')
const ugly = document.querySelector('#ugly')

toggles.forEach(toggle => toggle.addEventListener('change', (e) => doTheTrick(e.target)))

function doTheTrick(theClikedOne){
  
  if(good.checked && bad.checked && ugly.checked){
   
    if(good === theClikedOne){
      ugly.checked = false
    }
    
    if(bad === theClikedOne){
      good.checked = false
    }

    if(ugly === theClikedOne){
      bad.checked = false
    }

  }
}