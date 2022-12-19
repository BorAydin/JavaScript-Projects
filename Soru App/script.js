const quizData = [
  {
    question: "Hangi dil tarayıcıda çalışır ?" ,
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d"
  },
  {
    question: "CSS'in açılımı nedir ?" ,
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cairo Seul Strasbourg",
    correct: "b"
  },
  {
    question: "HTML'in açılımı nedir ?" ,
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Langugage",
    d: "Honda Tesla Maserati Lamborghini",
    correct: "a"
  },
  {
    question: "JavaScript kaç yılında yayınlandı ?" ,
    a: "1996",
    b: "1994",
    c: "1995",
    d: "1997",
    correct: "c",
  }
];

const quiz = document.getElementById('quiz')
const answerEls = document.querySelectorAll('.answer')
const questionEl = document.getElementById('question')
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit')

let currentQuiz = 0
let score = 0

loadQuiz() 

function loadQuiz() {
  
  deselectAnswers()

  const currentQuizData = quizData[currentQuiz]

  questionEl.innerText = currentQuizData.question
  a_text.innerText = currentQuizData.a
  b_text.innerText = currentQuizData.b
  c_text.innerText = currentQuizData.c
  d_text.innerText = currentQuizData.d

}

function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
 
  let answer 

  answerEls.forEach(answerEl => {
    if(answerEl.checked) {
      answer = answerEl.id
    }
  })

  return answer

}

submitBtn.addEventListener('click', () => {
  
  const answer = getSelected()
  
  if(answer) {
    
    if(answer === quizData[currentQuiz].correct){
      score++
    }

    currentQuiz++

    if(currentQuiz < quizData.length){
      loadQuiz()
    } else {
      
      quiz.innerHTML = `
      <h2>Doğru cevaplanan soru sayısı ${score}/${quizData.length}</h2> 
      
      <button onclick="location.reload()">Yenile</button>
      `
      
    }

  }
})
