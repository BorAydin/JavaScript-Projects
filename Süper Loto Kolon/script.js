const textarea = document.getElementById('textarea')
const button = document.querySelector('.btn')
const result = [];

button.addEventListener('click', e => {
  
  result.forEach(res => {
    document.getElementById(res).classList.remove('highlight');
  })
  result.splice(0,6);

  let i = 1
  
  while (i<7){
   
    num = Math.floor(Math.random()*60+1);
    test = result.indexOf(num);
    if(test === -1){
      result.push(num);
      document.getElementById(num).classList.add('highlight');
      i++;
    }
  }
  textarea.innerHTML = result.sort((x,y) => {
    return x-y;
  });

  e.preventDefault();
})





    
      
 
