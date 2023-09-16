(function () {
  function buildQuiz() {
    const output = [];
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {
        const answers = [];
        for (letter in currentQuestion.answers) {
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }
        output.push(
          `<div class="slide">
            <div class="question"> ${currentQuestion.question} </div><br>
            <div class="answers"> ${answers.join("<br>")} </div>
          </div>`
        );
      }
    );
    quizContainer.innerHTML = output.join('');
  }
  const wrongAnswers = [];

  function showResults() {
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;
    wrongAnswers.length = 0; // Limpa a lista de perguntas erradas
  
    myQuestions.forEach((currentQuestion, questionNumber) => {
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;
      if (userAnswer === currentQuestion.correctAnswer) {
        numCorrect++;
        answerContainers[questionNumber].style.color = 'green'; // Resposta correta em verde
      }
      else {
        answerContainers[questionNumber].style.color = 'red'; // Resposta errada em vermelho
        wrongAnswers.push({
          question: currentQuestion.question,
          correctAnswer: currentQuestion.correctAnswer,
          userAnswer: userAnswer,
          answers: currentQuestion.answers
        });
      }
    });
  
    // Exibe a lista de perguntas respondidas erroneamente com todas as opções de resposta
    if (wrongAnswers.length > 0) {
      resultsContainer.innerHTML = `<h2> Você acertou ${numCorrect} respostas de ${myQuestions.length} perguntas.<h2> <h3>Perguntas respondidas erroneamente:</h3> `;
      wrongAnswers.forEach((wrongAnswer, index) => {
        resultsContainer.innerHTML += `<p style="font-weight: 500">${index + 1}. ${wrongAnswer.question}</p>`;
        for (const letter in wrongAnswer.answers) {
          const answerText = wrongAnswer.answers[letter];
          if (letter === wrongAnswer.correctAnswer) {
            resultsContainer.innerHTML += `<p style="color: green;">${letter} : ${answerText} (Correta)</p>`;
          } else if (letter === wrongAnswer.userAnswer) {
            resultsContainer.innerHTML += `<p style="color: red;">${letter} : ${answerText} (Sua Resposta)</p>`;
          } else {
            resultsContainer.innerHTML += `<p>${letter} : ${answerText}</p>`;
          }
        }
      });
    } else {
      resultsContainer.innerHTML = `Você acertou todas as ${myQuestions.length} perguntas!`;
    }
  }
  
  

  function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    if (currentSlide === 0) {
      previousButton.style.display = 'none';
    }
    else {
      previousButton.style.display = 'inline-block';
    }
    if (currentSlide === slides.length - 1) {
      nextButton.style.display = 'none';
      previousButton.style.display = 'none';
      submitButton.style.display = 'inline-block';
      restartButton.style.display = 'inline-block';
    }
    else {
      nextButton.style.display = 'inline-block';
      submitButton.style.display = 'none';
    }
  }

  function showNextSlide() {
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide() {
    showSlide(currentSlide - 1);
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "Quem inventou o JavaScript?",
      answers: {
        a: "Douglas Crockford",
        b: "Sheryl Sandberg",
        c: "Brendan Eich"
      },
      correctAnswer: "c"
    },
    {
      question: "Qual destes é um gerenciador de pacotes JavaScript?",
      answers: {
        a: "Node.js",
        b: "TypeScript",
        c: "npm"
      },
      correctAnswer: "c"
    },
    {
      question: "Qual ferramenta você pode usar para garantir a qualidade do código?",
      answers: {
        a: "Angular",
        b: "jQuery",
        c: "RequireJS",
        d: "ESLint"
      },
      correctAnswer: "d"
    },
    {
      question: "Como você escreve 'Olá Mundo' em uma caixa de alerta?",
      answers: {
        a: "msgBox('Olá Mundo');",
        b: "alertBox('Olá Mundo');",
        c: "msg('Olá Mundo');",
        d: "alert('Olá Mundo');"
      },
      correctAnswer: "d"
    }
  ];

  buildQuiz();
  // Paginação
  const previousButton = document.getElementById("previous");
  const nextButton = document.getElementById("next");
  const slides = document.querySelectorAll(".slide");
  let currentSlide = 0;

  // Mostrar o primeiro slide
  showSlide(currentSlide);

  submitButton.addEventListener('click', showResults);
  previousButton.addEventListener("click", showPreviousSlide);
  nextButton.addEventListener("click", showNextSlide);
})();

function refreshPage() {
  window.location.reload();
}
