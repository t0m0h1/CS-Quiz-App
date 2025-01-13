// quiz.js

let quizData = {};  // To store quiz data from JSON
let currentQuestionIndex = 0;
let selectedTopic = "";
let score = 0;
let totalQuestions = 0;

// Fetch the quiz data from the JSON file
fetch('quiz_data.json')
  .then(response => response.json())
  .then(data => {
    quizData = data;
  })
  .catch(error => {
    console.error("Error loading quiz data:", error);
  });

// Function to start the quiz
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

// Function to show a question
function showQuestion() {
  const currentQuestion = quizData[selectedTopic][currentQuestionIndex];
  document.querySelector(".question").innerHTML = `
    <p>${currentQuestion.question}</p>
    <div class="select_answer">
      ${currentQuestion.options.map((option, index) => `
        <button onclick="checkAnswer(${index})">${option}</button>
      `).join('')}
    </div>
  `;
}

// Function to check the selected answer
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

// Function to update progress bar
function updateProgressBar() {
  const progressBar = document.getElementById("progress_bar");
  const progress = (currentQuestionIndex / totalQuestions) * 100;
  progressBar.style.width = progress + "%";
}

// Function to show results
function showResults() {
    document.querySelector(".quiz_container").style.display = "none";
    document.querySelector(".results").style.display = "block";
    const percentage = (score / totalQuestions) * 100;
    alert(`You scored ${score} out of ${totalQuestions} (${percentage.toFixed(2)}%)`);
    quizFinished = progress === 100;
    if (!quizFinished) {
        alert("Quiz is not finished yet");
    }
}

// Restart the quiz
document.getElementById("restart_quiz").addEventListener("click", restartQuiz);

function restartQuiz() {
  document.querySelector(".results").style.display = "none";
  document.querySelector(".choose_quiz").style.display = "block";
  document.querySelector(".start_quiz").style.display = "block";
}

// Show results
document.getElementById("see_results").addEventListener("click", () => {
  alert(`Your score: ${score} out of ${totalQuestions}`);
});
