// The questions, options, correct answers, and topics:
const questions = [
    {
        question: "Suppose you have $100 in a savings account earning 5% interest per year. None of the money is removed from the account. After 5 years, how much money would you have?",
        options: ["$125", "$100", "More than $125", "Don't know"],
        correct: 2,
        topic: "Savings"
    },
    {
        question: "Which investment class is safest?",
        options: ["Company stock", "Government bonds", "Currencies (e.g. USD or Chinese Yuan)", "Don't know"],
        correct: 1,
        topic: "Investing"
    },
    {
        question: "If a company goes bankrupt, the shareholders are entitled to the assets of the company before the debt holders are.",
        options: ["True", "False", "Don't know"],
        correct: 1,
        topic: "Corporate Finance"
    },
    {
        question: "Which term describes the amount of money one must pay themselves before the insurance company pays for further expenses?",
        options: ["Deductible", "Premium", "Co-payment", "Don't know"],
        correct: 0,
        topic: "Insurance"
    },
    {
        question: "Imagine that the interest rate on your savings account is 2% per year and inflation is 5% per year. After one year, would the money in the savings account buy more than it does now, the same, or less?",
        options: ["More", "The same", "Less", "Don't know"],
        correct: 2,
        topic: "Economy"
    }
];

let currentQuestion = 0; // Index to track the current question
let score = 0; // Variable to track the user's score
let acedTopics = []; // Array to store topics the user aced
let workOnTopics = []; // Array to store topics the user needs to work on

// Function to load the current question and its options
function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const question = questions[currentQuestion];

    let optionsHtml = '';
    question.options.forEach((option, index) => {
        optionsHtml += `<div class="quiz-option" onclick="selectOption(${index})" id="option-${index}">${option}</div>`;
    });

    questionContainer.innerHTML = `
        <h3>${question.question}</h3>
        ${optionsHtml}
    `;

    updateProgressBar();
}

// Function to handle option selection
function selectOption(index) {
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => {
        option.classList.remove('selected');
    });
    document.getElementById(`option-${index}`).classList.add('selected');
}

// Function to handle the next question action
function nextQuestion() {
    const selectedOption = document.querySelector('.quiz-option.selected');
    if (!selectedOption) {
        alert("Please select an answer before proceeding.");
        return;
    }

    const selectedAnswer = parseInt(selectedOption.id.split('-')[1]);

    // Check if the selected answer is correct
    if (selectedAnswer === questions[currentQuestion].correct) {
        selectedOption.classList.add('correct');
        acedTopics.push(questions[currentQuestion].topic);
        score++;
    } else {
        selectedOption.classList.add('wrong');
        document.getElementById(`option-${questions[currentQuestion].correct}`).classList.add('correct');
        workOnTopics.push(questions[currentQuestion].topic);
    }

    // Delay before loading the next question or showing results
    setTimeout(() => {
        const options = document.querySelectorAll('.quiz-option');
        options.forEach(option => {
            option.classList.remove('selected', 'correct', 'wrong');
        });
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResults();
        }
    }, 2000); // Adjusted delay to 2000ms (2 seconds)
}

// Function to display the quiz results
function showResults() {
    const questionContainer = document.getElementById('question-container');
    const resultGifContainer = document.getElementById('result-gif');
    const resultImage = document.getElementById('result-image');

    // Determine the appropriate GIF based on the score
    let gifPath = '';
    if (score === 5) {
        gifPath = 'EzFin Images/perfect.gif';
    } else if (score >= 3 && score <= 4) {
        gifPath = 'EzFin Images/celebratory.gif';
    } else if (score >= 0 && score <= 2) {
        gifPath = 'EzFin Images/disappointment.gif';
    }

    resultImage.src = gifPath;
    resultGifContainer.style.display = 'block';

    questionContainer.innerHTML = '';
    document.getElementById('next-button').style.display = 'none';

    const resultBox = document.getElementById('result-box');
    const scoreElement = document.getElementById('score');
    scoreElement.textContent = `${score} out of ${questions.length}`;

    const acedTopicsList = document.getElementById('aced-topics');
    const workOnTopicsList = document.getElementById('work-on-topics');

    acedTopicsList.innerHTML = '';
    workOnTopicsList.innerHTML = '';

    // Display the list of topics the user aced
    acedTopics.forEach(topic => {
        const listItem = document.createElement('li');
        listItem.textContent = topic;
        acedTopicsList.appendChild(listItem);
    });

    // Display the list of topics the user needs to work on
    workOnTopics.forEach(topic => {
        const listItem = document.createElement('li');
        listItem.textContent = topic;
        workOnTopicsList.appendChild(listItem);
    });

    resultBox.style.display = 'block';

    updateProgressBar();
}

// Function to update the progress bar
function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentQuestion + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// Event listener to load the first question when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});

// Function to show the selected branch content
function showBranch(branchId) {
    // Hide all branches
    document.querySelectorAll('.branch').forEach(branch => {
        branch.style.display = 'none';
    });
    
    // Show the selected branch
    document.getElementById(branchId).style.display = 'block';
}

// Function to show the lesson content based on the selected lesson
function showLessonContent(lessonTitle) {
    const lessonContent = document.getElementById('lesson-content');
    if (lessonTitle === 'Intro Quiz') {
        lessonContent.innerHTML = `
            <h3>Financial Literacy Quiz</h3>
            <p>You will be quizzed on:</p>
            <ul>
                <li>Personal Finance</li>
                <li>Saving & Investing</li>
                <li>The Economy</li>
            </ul>
            <a href="IntroQuiz.html" class="start-learning-button">Start learning</a>
        `;
    } else {
        lessonContent.innerHTML = `
            <h3>${lessonTitle}</h3>
            <p>You will learn about:</p>
            <ul>
                <li>Title 1</li>
                <li>Content point 1</li>
                <li>Content point 2</li>
                <li>Content point 3</li>
            </ul>
            <a href="lesson.html" class="start-learning-button">Start learning</a>
        `;
    }
}

// Initial display setting to show the 'savings-investing' branch content by default
showBranch('savings-investing');