let randomNumber = Math.floor(Math.random() * 100) + 1;
const submit = document.querySelector("#subt");
const userInput = document.querySelector("#guessField");
const guessSlot = document.querySelector(".guesses");
const remaining = document.querySelector(".lastResult");
const lowOrHi = document.querySelector(".lowOrHi");
const restartButton = document.querySelector("#restartGame");

let prevGuesses = [];
let numGuesses = 0;
let maxGuesses = 10;
let gameActive = true;

// Event listener for submit button
submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (gameActive) {
        const guess = parseInt(userInput.value);
        validateGuess(guess);
    }
});

// Validate user input
function validateGuess(guess) {
    if (isNaN(guess) || guess < 1 || guess > 100) {
        displayMessage("⚠️ Please enter a number between 1 and 100!");
    } else {
        processGuess(guess);
    }
}

// Process the guess
function processGuess(guess) {
    prevGuesses.push(guess);
    numGuesses++;
    displayGuesses();
    
    if (guess === randomNumber) {
        displayMessage("🎉 Correct! You guessed the number!");
        endGame();
    } else if (numGuesses === maxGuesses) {
        displayMessage(`❌ Game Over! The number was ${randomNumber}`);
        endGame();
    } else {
        let hint = guess < randomNumber ? "🔼 Try a higher number!" : "🔽 Try a lower number!";
        displayMessage(hint);
    }
}

// Update UI for guesses
function displayGuesses() {
    userInput.value = "";
    guessSlot.textContent = prevGuesses.join(", ");
    remaining.textContent = maxGuesses - numGuesses;
}

// Display messages
function displayMessage(message) {
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

// End game logic
function endGame() {
    gameActive = false;
    userInput.setAttribute("disabled", true);
    submit.setAttribute("disabled", true);
    restartButton.style.display = "block"; // Show restart button
}

// Restart game logic
restartButton.addEventListener("click", () => {
    gameActive = true;
    numGuesses = 0;
    prevGuesses = [];
    randomNumber = Math.floor(Math.random() * 100) + 1;

    userInput.removeAttribute("disabled");
    submit.removeAttribute("disabled");
    restartButton.style.display = "none";

    guessSlot.textContent = "None";
    remaining.textContent = maxGuesses;
    lowOrHi.innerHTML = "";
    userInput.value = "";
});
