let targetNumber;
let attempts = 0;
let score = 0;
let intervalId;
let countdown;

const guessInput = document.getElementById('guessInput');
const resultElement = document.getElementById('result');
const instructionsElement = document.getElementById('instructions');

function generateRandomNumber() {
    return Math.floor(Math.random() * 100) + 1;
}

function startCountdown() {
    let seconds = 40;

    countdown = setInterval(() => {
        instructionsElement.textContent = `¡Buena suerte! - Tiempo restante: ${seconds} segundos`;

        if (seconds === 0) {
            resultElement.textContent = `¡Se agotó el tiempo! El número era ${targetNumber}.`;
            resetGame();
        }

        seconds--;
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdown);
    instructionsElement.textContent = '¡Buena suerte!';
}

function checkGuess() {
    if (attempts === 0) {
        startCountdown();
    }

    const userGuess = parseInt(guessInput.value);

    if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
        resultElement.textContent = 'Ingresa un número entre 1 y 100.';
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
    const hint = userGuess < targetNumber ? 'MAYOR' : 'MENOR';
    resultElement.textContent = `Incorrecto. Sigue intentando. Intento ${attempts}. El número es ${hint} que ${userGuess}.`;

    if (attempts >= 3) {
        showHint();
    }
    if (attempts >= 6) {
        resultElement.textContent = `¡Oh no! Has agotado tus intentos. El número era ${targetNumber}.`;
        resetGame();
    } else {
        showHint();
    }
}

function showHint() {
    const userGuess = parseInt(guessInput.value);
    const hint = targetNumber > userGuess ? 'menor' : 'mayor';
}

function resetGame() {
    targetNumber = generateRandomNumber();
    attempts = 0;
    score = 0;
    resultElement.textContent += ' ¡Vamos por otra ronda!';
    stopCountdown();

    clearInterval(intervalId);
    intervalId = setInterval(() => {
        showHint();
    }, 5000);
}


intervalId = setInterval(() => {
    showHint();
}, 5000);

