document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const quizContainer = document.getElementById('quiz');
    const resultsContainer = document.getElementById('results');
    const submitButton = document.getElementById('submit');
    const scoreDisplay = document.getElementById('score');
    const feedbackContainer = document.getElementById('feedback');

    // Quiz Questions
    const questions = [
        {
            question: "Which of Newton's Laws is known as the Law of Inertia?",
            options: [
                "First Law",
                "Second Law",
                "Third Law",
                "Law of Gravitation"
            ],
            answer: 0,
            explanation: "The First Law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by an unbalanced force."
        },
        {
            question: "What does F=ma represent?",
            options: [
                "Newton's First Law",
                "Newton's Second Law",
                "Newton's Third Law",
                "None of the above"
            ],
            answer: 1,
            explanation: "F=ma is the mathematical representation of Newton's Second Law, showing the relationship between force, mass, and acceleration."
        },
        {
            question: "When a rocket launches, the action is the rocket pushing gases downward. What is the reaction?",
            options: [
                "The gases pushing the rocket upward",
                "The rocket moving sideways",
                "The ground shaking",
                "There is no reaction"
            ],
            answer: 0,
            explanation: "This demonstrates Newton's Third Law - for every action (gases pushed down), there is an equal and opposite reaction (rocket pushed up)."
        },
        {
            question: "Which scenario best demonstrates Newton's First Law?",
            options: [
                "A book sitting on a table",
                "A car accelerating when the gas pedal is pressed",
                "A swimmer pushing water backward to move forward",
                "A balloon releasing air and flying around the room"
            ],
            answer: 0,
            explanation: "The book remains at rest (demonstrating inertia) until an unbalanced force acts on it."
        },
        {
            question: "If you double the force applied to an object while keeping its mass constant, what happens to its acceleration?",
            options: [
                "It doubles",
                "It halves",
                "It stays the same",
                "It quadruples"
            ],
            answer: 0,
            explanation: "According to F=ma, acceleration is directly proportional to force when mass is constant."
        },
        {
            question: "Which of these is NOT an action-reaction pair?",
            options: [
                "A person pushing a wall and the wall pushing back",
                "Earth's gravity pulling on you and your gravity pulling on Earth",
                "A book pushing down on a table and the table pushing up on the book",
                "A car accelerating forward and air resistance pushing backward"
            ],
            answer: 3,
            explanation: "These are opposing forces but not action-reaction pairs because they act on the same object (the car)."
        },
        {
            question: "What is inertia?",
            options: [
                "The tendency of an object to resist changes to its motion",
                "The force that causes objects to fall",
                "The energy an object has due to its motion",
                "The product of mass and acceleration"
            ],
            answer: 0,
            explanation: "Inertia is the resistance of any physical object to any change in its velocity."
        },
        {
            question: "If a 10 kg object is accelerating at 2 m/s², what is the net force acting on it?",
            options: [
                "5 N",
                "12 N",
                "20 N",
                "0.2 N"
            ],
            answer: 2,
            explanation: "Using F=ma: 10 kg × 2 m/s² = 20 N."
        },
        {
            question: "Why do passengers lurch forward when a car stops suddenly?",
            options: [
                "Because of inertia - their bodies tend to keep moving forward",
                "Because of gravity pulling them forward",
                "Because of the car's deceleration creating a forward force",
                "Because of the seat belts not working properly"
            ],
            answer: 0,
            explanation: "This demonstrates inertia - the passengers' bodies tend to maintain their state of motion."
        },
        {
            question: "Which statement about action-reaction forces is TRUE?",
            options: [
                "They act on the same object",
                "They are always equal in magnitude",
                "They always cancel each other out",
                "They are the same as balanced forces"
            ],
            answer: 1,
            explanation: "Action-reaction forces are always equal in magnitude but opposite in direction, and act on different objects."
        }
    ];

    // Quiz State
    let userAnswers = new Array(questions.length).fill(null);

    // Display Quiz Questions
    function displayQuiz() {
        let quizHTML = '';

        questions.forEach((question, index) => {
            let optionsHTML = '';
            
            question.options.forEach((option, optionIndex) => {
                optionsHTML += `
                    <div class="option">
                        <input type="radio" 
                               name="question${index}" 
                               value="${optionIndex}" 
                               id="q${index}o${optionIndex}"
                               ${userAnswers[index] === optionIndex ? 'checked' : ''}>
                        <label for="q${index}o${optionIndex}">${option}</label>
                    </div>
                `;
            });

            quizHTML += `
                <div class="question" id="question-${index}">
                    <h3>${index + 1}. ${question.question}</h3>
                    <div class="options">${optionsHTML}</div>
                </div>
            `;
        });

        quizContainer.innerHTML = quizHTML;

        // Add event listeners to radio buttons
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('change', function() {
                const questionIndex = parseInt(this.name.replace('question', ''));
                userAnswers[questionIndex] = parseInt(this.value);
            });
        });
    }

    // Calculate and Display Results
    function showResults() {
        let score = 0;
        let feedbackHTML = '<h3>Quiz Results</h3>';
        let allCorrect = true;

        questions.forEach((question, index) => {
            const questionElement = document.getElementById(`question-${index}`);
            const optionsContainer = questionElement.querySelector('.options');
            
            // Check if answer is correct
            const isCorrect = userAnswers[index] === question.answer;
            
            if (isCorrect) {
                score++;
                optionsContainer.style.color = '#27ae60'; // Green for correct
            } else {
                allCorrect = false;
                optionsContainer.style.color = '#e74c3c'; // Red for incorrect
                
                // Add feedback for incorrect answers
                feedbackHTML += `
                    <div class="feedback-item">
                        <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                        <p class="incorrect">Your answer: ${userAnswers[index] !== null ? question.options[userAnswers[index]] : 'Not answered'}</p>
                        <p class="correct">Correct answer: ${question.options[question.answer]}</p>
                        <p class="explanation">Explanation: ${question.explanation}</p>
                    </div>
                `;
            }
        });

        // Display score
        scoreDisplay.textContent = score;
        resultsContainer.innerHTML = `You scored ${score} out of ${questions.length}`;

        // Display feedback
        if (allCorrect) {
            feedbackHTML = `
                <div class="perfect-score">
                    <h3>Perfect Score! 🎉</h3>
                    <p>You got all ${questions.length} questions correct!</p>
                    <p>You have an excellent understanding of Newton's Laws of Motion.</p>
                </div>
            `;
        } else if (score >= questions.length * 0.7) {
            feedbackHTML = `
                <div class="good-score">
                    <h3>Good Job! 👍</h3>
                    <p>You scored ${score}/${questions.length} (${Math.round((score/questions.length)*100)}%).</p>
                    <p>You understand most concepts but could review some areas.</p>
                </div>
                ${feedbackHTML}
            `;
        } else {
            feedbackHTML = `
                <div class="improve-score">
                    <h3>Keep Practicing! 📚</h3>
                    <p>You scored ${score}/${questions.length} (${Math.round((score/questions.length)*100)}%).</p>
                    <p>Review the material and try the quiz again to improve your score.</p>
                </div>
                ${feedbackHTML}
            `;
        }

        feedbackContainer.innerHTML = feedbackHTML;
        
        // Scroll to results
        feedbackContainer.scrollIntoView({ behavior: 'smooth' });
    }

    // Initialize Quiz
    displayQuiz();

    // Submit Button Event Listener
    submitButton.addEventListener('click', function() {
        const unanswered = userAnswers.filter(answer => answer === null).length;
        
        if (unanswered > 0) {
            if (confirm(`You have ${unanswered} unanswered questions. Submit anyway?`)) {
                showResults();
            }
        } else {
            showResults();
        }
    });
});