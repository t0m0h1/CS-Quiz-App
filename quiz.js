// Global variables
let questions = [];
let currentQuestionIndex = 0;
let score = 0;


// DOM elements
const quizContainer = document.querySelector('.quiz-container');
const questionElement = document.querySelector('.question');
const progressBar = document.querySelector('.progress_bar');
const startQuizButton = document.getElementById('.start_quiz');
const resultsContainer = document.querySelector('.results');


// Add event listener to start quiz button
startQuizButton.addEventListener('click', startQuiz);



// Functions:


// Function to load questions from JSON file
function startQuiz() {
    fetch('quiz_data.json') // Path to your JSON file
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