const canvas = document.getElementById('canvas');
const increaseBtn = document.getElementById('increase');
const deccreaseBtn = document.getElementById('decrease');
const sizeEl = document.getElementById('size');
const colorEl = document.getElementById('color');
const clearEl = document.getElementById('clear');
const eraserEl = document.getElementById('eraser');
const penEl = document.getElementById('pen');

const ctx = canvas.getContext('2d');

let isPressed = false
let x
let y
let size = 20
let color = 'black'

canvas.addEventListener('mousedown', (e) => {
  
  isPressed = true

  x = e.offsetX
  y = e.offsetY
  
})

canvas.addEventListener('mouseup', (e) => {
  
  isPressed = false

  x = undefined
  y = undefined
  
})

canvas.addEventListener('mousemove', (e) => {
  
  if(isPressed && document.body.style.cursor !== "cell") {
  
    const x2 = e.offsetX
    const y2 = e.offsetY

    drawCircle(x2, y2)
    drawLine(x, y, x2, y2)

    x = x2
    y = y2

  }
})

canvas.addEventListener('mousemove', (e) => {
  
  if(isPressed && document.body.style.cursor === "cell") {
    const x2 = e.offsetX
    const y2 = e.offsetY

    eraser(x2,y2)

    x = x2
    y = y2

  }
})

function drawCircle(x, y){
  
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI*2)
  ctx.fillStyle = color 
  ctx.fill()

}

function drawLine(x1, y1, x2, y2){
  
  ctx.beginPath();
  ctx.moveTo(x1, y1)
  ctx.lineTo(x2, y2)
  ctx.strokeStyle = color
  ctx.lineWidth = size * 2
  ctx.stroke()

}

function updateSizeOnScreen(){
  sizeEl.innerText = size
}

function eraser(x,y){
  ctx.clearRect(x, y, size, size)
}

colorEl.addEventListener('change', (e) => color = e.target.value)

increaseBtn.addEventListener('click', () => {

  size += 5

  if(size > 50) {
    size = 50
  }

  updateSizeOnScreen()

})

deccreaseBtn.addEventListener('click', () => {

  size -= 5

  if(size < 5) {
    size = 5
  }

  updateSizeOnScreen()

})

clearEl.addEventListener('click', () => ctx.clearRect(0, 0, canvas.width, canvas.height))

eraserEl.addEventListener('click', () => {
  document.body.style.cursor = "cell"
  eraser()
})

penEl.addEventListener('click', () => document.body.style.cursor="auto")