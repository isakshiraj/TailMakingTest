let moves = 0;
let seconds = 0;
let timer;
let currentNumber = 1;
let currentLetter = 'A';
let isNumberTurn = true;
let circles = [];
let previousButton = null;
const totalNumbers = 12; // Total numbers
const totalLetters = 12; // Total letters
const totalCircles = totalNumbers + totalLetters; // Total circles including numbers and letters

const movesContainer = document.getElementById('moves-container');
const movesProgress = document.getElementById('moves-progress');
const timerElement = document.getElementById('timer');
const popupInfo = document.querySelector('.popupPractice');
const continueBtn = document.querySelector('.continue-button');
const main = document.querySelector('.main');
const gameArea = document.getElementById('game-area');
const nextBtn = document.querySelector('.next-button');

continueBtn.onclick = () => {
    popupInfo.style.display = 'none';
    main.style.display = 'block';
    startGame();
};

function startGame() {
    moves = 0;
    seconds = 0;
    currentNumber = 1;
    currentLetter = 'A';
    isNumberTurn = true;
    previousButton = null;
    circles = generateFixedCircles();
    updateMovesAndTimer();
    startTimer();
    drawCircles();
}

function generateFixedCircles() {
    return [
        { number: 1, x: 421.23, y: 300.85, correct: false },
        { letter: 'A', x: 110.27, y: 394.93, correct: false },
        { number: 2, x: 59.65, y: 136.93, correct: false },
        { letter: 'B', x: 160.48, y: 39.93, correct: false },
        { number: 3, x: 876.86, y: 35.93, correct: false },
        { letter: 'C', x: 794.27, y: 100.93, correct: false },
        { number: 4, x: 976.27, y: 96.93, correct: false },
        { letter: 'D', x: 942.48, y: 388.93, correct: false },
        { number: 5, x: 612.65, y: 446.93, correct: false },
        { letter: 'E', x: 820, y: 497.93, correct: false },
        { number: 6, x: 177, y: 466, correct: false },
        { letter: 'F', x: 115, y: 202, correct: false },
        { number: 7, x: 562, y: 91, correct: false },
        { letter: 'G', x: 719, y: 99, correct: false },
        { number: 8, x: 241, y: 215, correct: false },
        { letter: 'H', x: 193, y: 303, correct: false },
        { number: 9, x: 671, y: 147, correct: false },
        { letter: 'I', x: 930, y: 145, correct: false },
        { number: 10, x: 548, y: 221, correct: false },
        { letter: 'J', x: 814, y: 295, correct: false },
        { number: 11, x: 921, y: 240, correct: false },
        { letter: 'K', x: 772, y: 380, correct: false },
        { number: 12, x: 249, y: 404, correct: false },
        { letter: 'L', x: 522, y: 323, correct: false }
    ];
}

function updateMovesAndTimer() {
    movesProgress.style.width = `${(moves / totalCircles) * 100}%`;
    timerElement.textContent = formatTime(seconds);
}

function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => {
        seconds++;
        updateMovesAndTimer();
    }, 1000);
}

function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function drawCircles() {
    gameArea.innerHTML = '';
    circles.forEach((circle, index) => {
        const button = document.createElement('button');
        button.classList.add('circle-button');
        button.style.left = `${circle.x}px`;
        button.style.top = `${circle.y}px`;
        button.textContent = circle.number || circle.letter;

        if (circle.number === 1) {
            const startLabel = document.createElement('div');
            startLabel.textContent = 'Start';
            startLabel.classList.add('label');
            button.appendChild(startLabel);
            button.classList.add('start-circle'); // start circle class
        }

        if (index === circles.length - 1) {
            const endLabel = document.createElement('div');
            endLabel.textContent = 'End';
            endLabel.classList.add('label');
            button.appendChild(endLabel);
            button.classList.add('end-circle'); // end circle class
        }

        button.onclick = () => handleButtonClick(button, circle);
        gameArea.appendChild(button);
    });
}

function handleButtonClick(button, circle) {
    if (isNumberTurn && circle.number === currentNumber) {
        button.classList.remove('wrong');
        button.classList.add('correct');
        if (previousButton) {
            drawLine(previousButton, button);
        }
        previousButton = button;
        currentNumber++;
        moves++;
        isNumberTurn = false; // Switch to letter turn
    } else if (!isNumberTurn && circle.letter === currentLetter) {
        button.classList.remove('wrong');
        button.classList.add('correct');
        if (previousButton) {
            drawLine(previousButton, button);
        }
        previousButton = button;
        currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);
        moves++;
        isNumberTurn = true; // Switch to number turn
    } else {
        button.classList.add('wrong');
        setTimeout(() => {
            button.classList.remove('wrong');
        }, 1000);
    }

    // Check if the game is complete
    if (moves === totalCircles) {
        clearInterval(timer);
        // Store the timing for Part B
        const partBTiming = formatTime(seconds);
        localStorage.setItem('partBTiming', partBTiming);
        nextBtn.style.display = 'block'; // Show the next button
        nextBtn.onclick = () => {
            window.location.href = 'Trailresults.html'; // Navigate to the results page
        };
    }

    updateMovesAndTimer();
}

function drawLine(button1, button2) {
    const line = document.createElement('div');
    line.classList.add('line');
    
    const x1 = button1.offsetLeft + button1.offsetWidth / 2;
    const y1 = button1.offsetTop + button1.offsetHeight / 2;
    const x2 = button2.offsetLeft + button2.offsetWidth / 2;
    const y2 = button2.offsetTop + button2.offsetHeight / 2;

    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const radius = button1.offsetWidth / 2;
    const ratio = radius / distance;

    const adjustedX1 = x1 + dx * ratio;
    const adjustedY1 = y1 + dy * ratio;
    const adjustedX2 = x2 - dx * ratio;
    const adjustedY2 = y2 - dy * ratio;

    const length = Math.sqrt((adjustedX2 - adjustedX1) ** 2 + (adjustedY2 - adjustedY1) ** 2);
    const angle = Math.atan2(adjustedY2 - adjustedY1, adjustedX2 - adjustedX1) * 180 / Math.PI;

    line.style.width = `${length}px`;
    line.style.transform = `rotate(${angle}deg)`;
    line.style.top = `${adjustedY1}px`;
    line.style.left = `${adjustedX1}px`;
    gameArea.appendChild(line);
}
