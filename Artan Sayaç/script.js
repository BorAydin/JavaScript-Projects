const counters = document.querySelectorAll('.counter')

counters.forEach(counter => {
  
  counter.innerText = '0'

  const updateCounter = () => {
    
    const target = +counter.getAttribute('data-target') // String dönüyordu + ile Number'a çevirdi.
    const c = +counter.innerText

    const increment = target / 600

    if (c < target){

      counter.innerText = `${Math.ceil(c + increment)}`
      setTimeout(updateCounter, 1)

    } else{
      counter.innerText = target
    }
  }

  updateCounter()

})