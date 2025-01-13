// Global Variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;

// DOM Elements
const quizContainer = document.querySelector(".quiz_container");
const questionElement = document.querySelector(".question");
const progressBar = document.getElementById("progress_bar");
const startQuizButton = document.getElementById("start_quiz");
const resultsContainer = document.querySelector(".results");

// Event Listeners
startQuizButton.addEventListener("click", loadQuestions);

// Functions

// Load Questions from JSON
function loadQuestions() {
    fetch('questions.json') // Path to your JSON file
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch questions.');
            }
            return response.json();
        })
        .then(data => {
            questions = data; // Store the fetched questions
            startQuiz();
        })
        .catch(error => {
            console.error('Error loading questions:', error);
        });
}

// Start Quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = "block";
    resultsContainer.style.display = "none";
    loadQuestion();
    updateProgressBar();
}

// Load a Question
function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `
        <h3>${currentQuestion.question}</h3>
        <div class="select_answer">
            ${currentQuestion.options.map((option, index) => `
                <button onclick="handleAnswer(${index})">${option}</button>
            `).join('')}
        </div>
    `;
}

// Handle Answer Selection
function handleAnswer(selectedIndex) {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedIndex === currentQuestion.answer) {
        score++;
    }

    // Move to the next question or end quiz
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        updateProgressBar();
    } else {
        endQuiz();
    }
}

// Update Progress Bar
function updateProgressBar() {
    const progress = ((currentQuestionIndex / questions.length) * 100).toFixed(2);
    progressBar.style.width = `${progress}%`;
}

// End Quiz
function endQuiz() {
    quizContainer.style.display = "none";
    resultsContainer.innerHTML = `
        <h2>Your Score: ${score} / ${questions.length}</h2>
        <button onclick="restartQuiz()">Restart Quiz</button>
    `;
}

// Restart Quiz
function restartQuiz() {
    startQuiz();
}


