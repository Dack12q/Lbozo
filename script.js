let targetWord = "train"; // Default target word
const maxAttempts = 6;
let currentAttempt = 0;

function createGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';

    for (let i = 0; i < maxAttempts; i++) {
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            grid.appendChild(cell);
        }
    }
}

function makeGuess() {
    const input = document.getElementById('guessInput');
    const guess = input.value.toLowerCase();

    if (guess.length !== 5) {
        alert("Please enter a 5-letter word.");
        return;
    }

    const cells = document.querySelectorAll('#grid .cell');
    const startIndex = currentAttempt * 5;

    let guessArray = guess.split('');
    let targetArray = targetWord.split('');

    // First pass: Check for correct letters
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] === targetArray[i]) {
            cells[startIndex + i].textContent = guessArray[i];
            cells[startIndex + i].classList.add('correct');
            guessArray[i] = null; // Mark as processed
            targetArray[i] = null; // Mark as processed
        }
    }

    // Second pass: Check for present letters
    for (let i = 0; i < 5; i++) {
        if (guessArray[i] !== null) {
            if (targetArray.includes(guessArray[i])) {
                cells[startIndex + i].textContent = guessArray[i];
                cells[startIndex + i].classList.add('present');
                // Remove the letter from targetArray to prevent multiple occurrences
                targetArray[targetArray.indexOf(guessArray[i])] = null;
            } else {
                cells[startIndex + i].textContent = guessArray[i];
                cells[startIndex + i].classList.add('absent');
            }
        }
    }

    currentAttempt++;
    input.value = '';

    if (guess === targetWord) {
        document.getElementById('message').textContent = 'Congratulations! You guessed the word!';
    } else if (currentAttempt >= maxAttempts) {
        document.getElementById('message').textContent = `Sorry, you've used all attempts. The word was "${targetWord}".`;
    }
}

function changeWord() {
    const changeWordInput = document.getElementById('changeWordInput');
    const newWord = changeWordInput.value.toLowerCase();

    if (newWord === "bozo") {
        targetWord = prompt("Enter a new 5-letter word:").toLowerCase();
        if (targetWord.length !== 5) {
            alert("The new word must be exactly 5 letters long.");
            targetWord = "train"; // Revert to default if invalid input
        } else {
            currentAttempt = 0; // Reset the attempt counter
            document.getElementById('message').textContent = `Target word changed. Start guessing!`;
        }
    } else {
        alert("Invalid password.");
    }

    changeWordInput.value = '';
}

// Add an event listener to handle Enter key press
document.getElementById('guessInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevent the default action (e.g., form submission)
        makeGuess(); // Trigger the guess submission
    }
});

createGrid();