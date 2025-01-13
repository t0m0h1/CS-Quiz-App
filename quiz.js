// quiz.js

let quizData = {};  
let currentQuestionIndex = 0;
let selectedTopic = "";
let score = 0;
let totalQuestions = 0;

// Fetch quiz data
fetch('quiz_data.json')
  .then(response => response.json())
  .then(data => {
    quizData = data;
  })
  .catch(error => {
    console.error("Error loading quiz data:", error);
    alert("Failed to load quiz data. Please try again later.");
  });

// Start quiz
document.getElementById("start_quiz").addEventListener("click", startQuiz);

function startQuiz() {
  selectedTopic = document.querySelector("select").value;
  if (selectedTopic && quizData[selectedTopic]) {
    totalQuestions = quizData[selectedTopic].length;
    currentQuestionIndex = 0;
    score = 0;
    document.querySelector(".choose_quiz").style.display = "none";
    document.querySelector(".start_quiz").style.display = "none";
    document.querySelector(".quiz_container").style.display = "block";
    showQuestion();
    updateProgressBar();
  } else {
    alert("Please select a valid topic to start the quiz.");
  }
}

// Show question
function showQuestion() {
  const currentQuestion = quizData[selectedTopic][currentQuestionIndex];
  const questionElement = document.querySelector(".question");
  questionElement.innerHTML = `<p>${currentQuestion.question}</p>`;

  const answers = currentQuestion.options.map((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.onclick = () => checkAnswer(index);
    return button;
  });

  const answerContainer = document.querySelector(".select_answer");
  answerContainer.innerHTML = ''; // Clear previous answers
  answers.forEach(button => answerContainer.appendChild(button));
}

// Check answer
function checkAnswer(selectedIndex) {
  const correctIndex = quizData[selectedTopic][currentQuestionIndex].correct;
  if (selectedIndex === correctIndex) {
    score++;
  }
  currentQuestionIndex++;

  if (currentQuestionIndex < totalQuestions) {
    showQuestion();
    updateProgressBar();
  } else {
    showResults();
  }
}

// Update progress bar
function updateProgressBar() {
  const progressBar = document.getElementById("progress_bar");
  const progress = (currentQuestionIndex / totalQuestions) * 100;
  progressBar.style.width = `${progress}%`;
}

// Show results
function showResults() {
  document.querySelector(".quiz_container").style.display = "none";
  document.querySelector(".results").style.display = "block";
  const percentage = (score / totalQuestions) * 100;
  alert(`You scored ${score} out of ${totalQuestions} (${percentage.toFixed(2)}%)`);
}

// Restart quiz
document.getElementById("restart_quiz").addEventListener("click", restartQuiz);

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  document.querySelector(".results").style.display = "none";
  document.querySelector(".choose_quiz").style.display = "block";
  document.querySelector(".start_quiz").style.display = "block";
}

// Show score
document.getElementById("see_results").addEventListener("click", () => {
  alert(`Your score: ${score} out of ${totalQuestions}`);
});
