// let moves = 0;
// let seconds = 0;
// let timer;
// let currentNumber = 1;
// let circles = [];
// let previousButton = null;
// const totalNumbers = 14;

// const movesContainer = document.getElementById('moves-container');
// const movesProgress = document.getElementById('moves-progress');
// const timerElement = document.getElementById('timer');
// const popupInfo = document.querySelector('.popupPractice');
// const continueBtn = document.querySelector('.continue-button');
// const main = document.querySelector('.main');
// const gameArea = document.getElementById('game-area');
// const nextBtn = document.querySelector('.next-button'); 

// continueBtn.onclick = () => {
//     popupInfo.style.display = 'none';
//     main.style.display = 'block';
//     startGame();
// };

// function startGame() {
//     moves = 0;
//     seconds = 0;
//     currentNumber = 1;
//     previousButton = null;
//     circles = generateFixedCircles();
//     updateMovesAndTimer();
//     startTimer();
//     drawCircles();
// }

// function generateFixedCircles() {
//     return [
//         { number: 1, x: 433.8, y: 125.95, correct: false },
//         { number: 2, x: 698.59, y: 102.95, correct: false },
//         { number: 3, x: 775.89, y: 500.95, correct: false },
//         { number: 4, x: 451.51, y: 500.95, correct: false },
//         { number: 5, x: 265.89, y: 215.95, correct: false },
//         { number: 6, x: 653.89, y: 173.95, correct: false },
//         { number: 7, x: 507.89, y: 238.95, correct: false },
//         { number: 8, x: 343.89, y: 280.95, correct: false },
//         { number: 9, x: 695.89, y: 269.95, correct: false },
//         { number: 10, x: 461, y: 323, correct: false },
//         { number: 11, x: 593, y: 365, correct: false },
//         { number: 12, x: 549, y: 440, correct: false },
//         { number: 13, x: 723, y: 460, correct: false },
//         { number: 14, x: 686, y: 368, correct: false }
//     ];
// }

// function updateMovesAndTimer() {
//     movesProgress.style.width = `${(moves / totalNumbers) * 100}%`;
//     // movesProgress.textContent = `Steps:${moves}`;
//     timerElement.textContent = formatTime(seconds);
// }

// function startTimer() {
//     clearInterval(timer);
//     timer = setInterval(() => {
//         seconds++;
//         updateMovesAndTimer();
//     }, 1000);
// }

// function formatTime(totalSeconds) {
//     const minutes = Math.floor(totalSeconds / 60);
//     const seconds = totalSeconds % 60;
//     return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
// }

// function drawCircles() {
//     gameArea.innerHTML = '';
//     circles.forEach(circle => {
//         const button = document.createElement('button');
//         button.classList.add('circle-button');
//         button.style.left = `${circle.x}px`;
//         button.style.top = `${circle.y}px`;
//         button.textContent = circle.number;

//         if (circle.number === 1) {
//             const startLabel = document.createElement('div');
//             startLabel.textContent = 'Start';
//             startLabel.classList.add('label');
//             button.appendChild(startLabel);
//             button.classList.add('start-circle'); //  start circle class
//         }

//         if (circle.number === totalNumbers) {
//             const endLabel = document.createElement('div');
//             endLabel.textContent = 'End';
//             endLabel.classList.add('label');
//             button.appendChild(endLabel);
//             button.classList.add('end-circle'); // end circle class
//         }

//         button.onclick = () => handleButtonClick(button, circle);
//         gameArea.appendChild(button);
//     });
// }

// function handleButtonClick(button, circle) {
//     if (circle.number === currentNumber) {
//         button.classList.remove('wrong');
//         button.classList.add('correct');
//         if (previousButton) {
//             drawLine(previousButton, button);
//         }
//         previousButton = button;
//         currentNumber++;
//         moves++;
//         if (circle.number === totalNumbers) {
//             clearInterval(timer);
//             // Store the timing for Part 1
//             const part1Timing = formatTime(seconds);
//             localStorage.setItem('part1Timing', part1Timing);
//             nextBtn.style.display = 'block'; // Show the next button
//         }
//     } else {
//         button.classList.add('wrong');
//         setTimeout(() => {
//             button.classList.remove('wrong');
//         }, 1000);
//     }
//     updateMovesAndTimer();
// }

// function drawLine(button1, button2) {
//     const line = document.createElement('div');
//     line.classList.add('line');
    
//     const x1 = button1.offsetLeft + button1.offsetWidth / 2;
//     const y1 = button1.offsetTop + button1.offsetHeight / 2;
//     const x2 = button2.offsetLeft + button2.offsetWidth / 2;
//     const y2 = button2.offsetTop + button2.offsetHeight / 2;

//     const dx = x2 - x1;
//     const dy = y2 - y1;
//     const distance = Math.sqrt(dx * dx + dy * dy);

//     const radius = button1.offsetWidth / 2;
//     const ratio = radius / distance;

//     const adjustedX1 = x1 + dx * ratio;
//     const adjustedY1 = y1 + dy * ratio;
//     const adjustedX2 = x2 - dx * ratio;
//     const adjustedY2 = y2 - dy * ratio;

//     const length = Math.sqrt((adjustedX2 - adjustedX1) ** 2 + (adjustedY2 - adjustedY1) ** 2);
//     const angle = Math.atan2(adjustedY2 - adjustedY1, adjustedX2 - adjustedX1) * 180 / Math.PI;
//     line.style.width = `${length}px`;
//     line.style.transform = `rotate(${angle}deg)`;
//     line.style.top = `${adjustedY1}px`;
//     line.style.left = `${adjustedX1}px`;
//     gameArea.appendChild(line);
// }


let moves = 0;
let seconds = 0;
let timer;
let currentNumber = 1;
let circles = [];
let previousButton = null;
const totalNumbers = 14;

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
    previousButton = null;
    circles = generateFixedCircles();
    updateMovesAndTimer();
    startTimer();
    drawCircles();
}

// function generateFixedCircles() {
//     return [
//         { number: 1, x: 433.8, y: 125.95, correct: false },
//         { number: 2, x: 698.59, y: 102.95, correct: false },
//         { number: 3, x: 775.89, y: 500.95, correct: false },
//         { number: 4, x: 451.51, y: 500.95, correct: false },
//         { number: 5, x: 265.89, y: 215.95, correct: false },
//         { number: 6, x: 653.89, y: 173.95, correct: false },
//         { number: 7, x: 507.89, y: 238.95, correct: false },
//         { number: 8, x: 343.89, y: 280.95, correct: false },
//         { number: 9, x: 695.89, y: 269.95, correct: false },
//         { number: 10, x: 461, y: 323, correct: false },
//         { number: 11, x: 593, y: 365, correct: false },
//         { number: 12, x: 549, y: 440, correct: false },
//         { number: 13, x: 723, y: 460, correct: false },
//         { number: 14, x: 686, y: 368, correct: false }
//     ];
// }

function generateFixedCircles() {
    return [
        { number: 1, x: 433.8, y: 105.95, correct: false },
        { number: 2, x: 698.59, y: 82.95, correct: false },
        { number: 3, x: 775.89, y: 480.95, correct: false },
        { number: 4, x: 451.51, y: 480.95, correct: false },
        { number: 5, x: 265.89, y: 195.95, correct: false },
        { number: 6, x: 653.89, y: 153.95, correct: false },
        { number: 7, x: 507.89, y: 218.95, correct: false },
        { number: 8, x: 343.89, y: 260.95, correct: false },
        { number: 9, x: 695.89, y: 249.95, correct: false },
        { number: 10, x: 461, y: 303, correct: false },
        { number: 11, x: 593, y: 345, correct: false },
        { number: 12, x: 549, y: 420, correct: false },
        { number: 13, x: 723, y: 440, correct: false },
        { number: 14, x: 686, y: 348, correct: false }
    ];
}




function updateMovesAndTimer() {
    movesProgress.style.width = `${(moves / totalNumbers) * 100}%`;
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
    circles.forEach(circle => {
        const button = document.createElement('button');
        button.classList.add('circle-button');
        button.style.left = `${circle.x}px`;
        button.style.top = `${circle.y}px`;
        button.textContent = circle.number;

        if (circle.number === 1) {
            const startLabel = document.createElement('div');
            startLabel.textContent = 'Start';
            startLabel.classList.add('label');
            button.appendChild(startLabel);
            button.classList.add('start-circle');
        }

        if (circle.number === totalNumbers) {
            const endLabel = document.createElement('div');
            endLabel.textContent = 'End';
            endLabel.classList.add('label');
            button.appendChild(endLabel);
            button.classList.add('end-circle');
        }

        button.onclick = () => handleButtonClick(button, circle);
        gameArea.appendChild(button);
    });
}

function handleButtonClick(button, circle) {
    if (circle.number === currentNumber) {
        button.classList.remove('wrong');
        button.classList.add('correct');
        if (previousButton) {
            drawLine(previousButton, button);
        }
        previousButton = button;
        currentNumber++;
        moves++;
        if (circle.number === totalNumbers) {
            clearInterval(timer);
            // Store the timing for Part A
            const partATiming = formatTime(seconds);
            localStorage.setItem('partATiming', partATiming);
            nextBtn.style.display = 'block'; // Show the next button
            nextBtn.onclick = () => {
                window.location.href = 'practice2.html'; // Navigate to the next part
            };
        }
    } else {
        button.classList.add('wrong');
        setTimeout(() => {
            button.classList.remove('wrong');
        }, 1000);
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
