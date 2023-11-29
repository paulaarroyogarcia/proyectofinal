let targetNumber;
let attempts = 0;
let score = 0;
let intervalId;

const guessInput = document.getElementById('guessInput');
const resultElement = document.getElementById('result');
const instructionsElement = document.getElementById('instructions');

function generateRandomNumber() {
    return Math.floor(Math.random() * 10) + 1;
}

function checkGuess() {
    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 10) {
        resultElement.textContent = 'Ingresa un número entre 1 y 10.';
    } else {
        attempts++;

        if (userGuess === targetNumber) {
            handleCorrectGuess();
        } else {
            handleIncorrectGuess(userGuess);

        }
    }
}

window.onload = () => {
    targetNumber = generateRandomNumber();
    intervalId = setInterval(() => {
        showHint();
    }, 5000);
};

function handleCorrectGuess() {
    resultElement.textContent = `¡Felicidades! Adivinaste el número en ${attempts} intentos.`;

    if (attempts === 1) {
        resultElement.textContent += ' ¡Increíble, adivinaste en el primer intento!';
    }

    score = Math.max(11 - attempts, 1);
    resultElement.textContent += ` Tu puntuación es ${score}.`;

    resetGame();
}


function handleIncorrectGuess(userGuess) {
    const hint = userGuess < targetNumber ? 'mayor' : 'menor';
    resultElement.textContent = `Incorrecto. Sigue intentando. Intento #${attempts}. El número es ${hint} que ${userGuess}.`;

    if (attempts >= 3) {
        showHint();
    }
    if (attempts >= 5) {
        resultElement.textContent = `¡Oh no! Has agotado tus intentos. El número era ${targetNumber}.`;
        resetGame();
    } else {
        showHint();
    }
}

function showHint() {
    const userGuess = parseInt(guessInput.value);
    const hint = targetNumber > userGuess ? 'menor' : 'mayor';
    instructionsElement.textContent = `Pista: El número objetivo es ${hint} que ${userGuess}.`;
}

function resetGame() {
    targetNumber = generateRandomNumber();
    attempts = 0;
    score = 0;
    resultElement.textContent += ' ¡Vamos por otra ronda!';
    instructionsElement.textContent = '¡Buena suerte!';

    clearInterval(intervalId);
    intervalId = setInterval(() => {
        showHint();
    }, 5000);
}


// Configurar el primer intervalo
intervalId = setInterval(() => {
    showHint();
}, 5000);