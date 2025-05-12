const questions = [
    {
        question:
            "In Xenoblade Chronicles X, which class has a sniper rifle as it&#039;s primary weapon?",
        answers: [
            { text: "Blast Fencer", correct: false },
            { text: "Winged Viper", correct: false },
            { text: "Bastion Warrior", correct: false },
            { text: "Partisan Eagle", correct: true },
        ],
    },
    {
        question:
            "Which car tire manufacturer is famous for its &quot;Eagle&quot; brand of tires, and is the official tire supplier of NASCAR?",
        answers: [
            { text: "Pirelli", correct: false },
            { text: "Bridgestone", correct: false },
            { text: "Michelin", correct: false },
            { text: "Goodyear", correct: true },
        ],
    },
    {
        question:
            "What genre of EDM is the Dutch DJ, musician, and remixer Armin van Buuren most well-known for?",
        answers: [
            { text: "House", correct: false },
            { text: "Drum and Bass", correct: false },
            { text: "Dubstep", correct: false },
            { text: "Trance", correct: true },
        ],
    },
    {
        question: "What does a funambulist walk on?",
        answers: [
            { text: "Broken Glass", correct: false },
            { text: "Balls", correct: false },
            { text: "The Moon", correct: false },
            { text: "A Tight Rope", correct: true },
        ],
    },
]

const questionElement = document.getElementById("question")
const answerButtons = document.getElementById("answer-buttons")
const nextButton = document.getElementById("next-btn")

let currentQuestionIndex = 0
let score = 0

function startQuiz() {
    currentQuestionIndex = 0
    score = 0
    showQuestion()
}

function showQuestion() {
    resetState()

    let currentQuestion = questions[currentQuestionIndex]
    let questionNo = currentQuestionIndex + 1
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button")
        button.innerHTML = answer.text
        button.classList.add("btn")
        answerButtons.appendChild(button)

        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer)
    })
}

function resetState() {
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild)
    }
    nextButton.style.display = "none"
}

function selectAnswer(e) {
    const selectedButton = e.target
    const isCorrect = selectedButton.dataset.correct === "true"

    if (isCorrect) {
        selectedButton.classList.add("correct")
        score++
    } else {
        selectedButton.classList.add("incorrect")
    }

    Array.from(answerButtons.children).forEach((button) => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct")
        }
        button.disabled = true
    })

    nextButton.style.display = "block"
}

nextButton.addEventListener("click", () => {
    currentQuestionIndex++
    if (currentQuestionIndex < questions.length) {
        showQuestion()
    } else if (currentQuestionIndex == questions.length) {
        showScore()
    } else {
        startQuiz()
    }
})

function showScore() {
    resetState()
    questionElement.innerHTML = `You scored ${score} of ${questions.length} points`
    nextButton.innerHTML = "Play again"
    nextButton.style.display = "block"
}

startQuiz()
