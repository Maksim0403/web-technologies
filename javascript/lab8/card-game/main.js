const images = [
    'project_parts/img/circle.png',
    'project_parts/img/hexagon.png',
    'project_parts/img/octagon.png',
    'project_parts/img/pentagon.png',
    'project_parts/img/rectangle.png',
    'project_parts/img/rhombus.png',
    'project_parts/img/square.png',
    'project_parts/img/triangle.png',
    'project_parts/img/star.png',
    'project_parts/img/oval.png',
    'project_parts/img/heart.png',
    'project_parts/img/cross.png',
    'project_parts/img/arrow.png',
    'project_parts/img/diamond.png',
    'project_parts/img/trapezium.png',
];

let flippedCards = [], matchedCards = [], moves = 0, time = 0, timerInterval;
let round = 0, totalRounds = 1, currentPlayerIndex = 0;
let playerCount = 2;
let players = [];

let currentPlayer = 1;
let scores = {1: {name: '', moves: 0, pairs: 0}, 2: {name: '', moves: 0, pairs: 0}};
let currentRound = 1;
let gameMode = 1;

const board = document.getElementById('board');
const movesText = document.getElementById('moves');
const timerText = document.getElementById('timer');

function shuffleArray(array) {
    return [...array].sort(() => Math.random() - 0.5);
}

function createCard(image) {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front"></div>
        <div class="card-back"><img src="${image}" alt="img"/></div>
      </div>`;
    card.addEventListener('click', () => handleCardClick(card, image));
    return card;
}

function startTimer(duration) {
    clearInterval(timerInterval);
    time = duration;
    updateTimer();
    timerInterval = setInterval(() => {
        time--;
        updateTimer();
        if (time <= 0) {
            clearInterval(timerInterval);
            alert('Час вичерпано! Раунд завершено.');
            endRound();
        }
    }, 1000);
}

function updateTimer() {
    const min = Math.floor(time / 60);
    const sec = time % 60;
    timerText.textContent = `Час: ${min}:${sec < 10 ? '0' + sec : sec}`;
}

function handleCardClick(card, image) {
    if (flippedCards.length === 2 || matchedCards.includes(card) || flippedCards.some(f => f.card === card)) return;

    card.classList.add('flipped');
    flippedCards.push({card, image});

    if (flippedCards.length === 2) {
        scores[currentPlayer].moves++;
        updateStatus();

        const [first, second] = flippedCards;
        if (first.image === second.image) {
            matchedCards.push(first.card, second.card);
            scores[currentPlayer].pairs++;
            flippedCards = [];

            if (matchedCards.length === cards.length) {
                clearInterval(timerInterval);
                setTimeout(() => endRound(), 500);
            }
        } else {
            setTimeout(() => {
                first.card.classList.remove('flipped');
                second.card.classList.remove('flipped');
                flippedCards = [];

                if (gameMode === 2) {
                    currentPlayer = currentPlayer === 1 ? 2 : 1;
                    updateStatus();
                }
            }, 1000);
        }
    }
}

let cards = [];

function startGame() {
    const size = document.getElementById('gridSize').value.split('x');
    const difficulty = document.getElementById('difficulty').value;
    gameMode = parseInt(document.getElementById('playerMode').value);
    totalRounds = parseInt(document.getElementById('rounds').value);
    scores[1].name = document.getElementById('player1').value || 'Гравець 1';
    scores[2].name = document.getElementById('player2').value || 'Гравець 2';
    scores[1].moves = 0;
    scores[2].moves = 0;
    scores[1].pairs = 0;
    scores[2].pairs = 0;
    currentPlayer = 1;

    let seconds = difficulty === 'easy' ? 180 : difficulty === 'normal' ? 120 : 60;

    const rows = parseInt(size[0]);
    const cols = parseInt(size[1]);
    const totalCards = rows * cols;
    const pairs = totalCards / 2;

    const selectedImages = shuffleArray(images).slice(0, pairs);
    cards = shuffleArray([...selectedImages, ...selectedImages]);

    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    board.innerHTML = '';
    cards.forEach(img => board.appendChild(createCard(img)));

    matchedCards = [];
    flippedCards = [];
    movesText.textContent = 'Ходи: 0';
    startTimer(seconds);
    updateStatus();
}

function nextRound() {
    if (round >= totalRounds) {
        showFinalStats();
        return;
    }

    const size = document.getElementById('gridSize').value.split('x');
    const difficulty = document.getElementById('difficulty').value;
    const seconds = difficulty === 'easy' ? 180 : difficulty === 'normal' ? 120 : 60;

    const rows = parseInt(size[0]);
    const cols = parseInt(size[1]);
    const totalCards = rows * cols;
    const pairs = totalCards / 2;

    const selectedImages = shuffleArray(images).slice(0, pairs);
    cards = shuffleArray([...selectedImages, ...selectedImages]);

    board.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    board.innerHTML = '';
    cards.forEach(img => board.appendChild(createCard(img)));

    matchedCards = [];
    flippedCards = [];
    moves = 0;
    movesText.textContent = 'Ходи: 0';

    round++;
    currentPlayerIndex = (playerCount === 2) ? round % 2 : 0;

    alert(`Раунд ${round} — ${players[currentPlayerIndex].name}`);
    startTimer(seconds);
}

function showFinalStats() {
    let results = players.map(p => {
        const totalMoves = p.rounds.reduce((sum, r) => sum + r.moves, 0);
        const totalTime = p.rounds.reduce((sum, r) => sum + r.timeUsed, 0);
        return {name: p.name, totalMoves, totalTime};
    });

    let winner = results[0];
    if (playerCount === 2 && results[1].totalMoves < results[0].totalMoves) {
        winner = results[1];
    }

    let summary = '📊 Підсумки:\n';
    results.forEach(r => {
        summary += `\n${r.name} — загалом ходів: ${r.totalMoves}, залишилось часу: ${r.totalTime} сек\n`;
    });

    summary += `\n🏆 Переможець: ${winner.name}`;
    alert(summary);
}

function resetSettings() {
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    document.getElementById('playerMode').value = '1';
    document.getElementById('gridSize').value = '4x4';
    document.getElementById('difficulty').value = 'easy';
    document.getElementById('rounds').value = 1;
}

function restartGame() {
    clearInterval(timerInterval);
    startGame();
}

function updateStatus() {
    if (gameMode === 2) {
        movesText.textContent = `Ходи: ${scores[1].name}: ${scores[1].moves}, ${scores[2].name}: ${scores[2].moves} | Зараз грає: ${scores[currentPlayer].name}`;
    } else {
        movesText.textContent = `Ходи: ${scores[1].moves}`;
    }
}

function endRound() {
    let summary = `Раунд ${currentRound} завершено!\n`;
    if (gameMode === 1) {
        summary += `${scores[1].name}: Ходи - ${scores[1].moves}, Пари - ${scores[1].pairs}`;
    } else {
        summary += `${scores[1].name}: Ходи - ${scores[1].moves}, Пари - ${scores[1].pairs}\n`;
        summary += `${scores[2].name}: Ходи - ${scores[2].moves}, Пари - ${scores[2].pairs}\n`;

        const winner = scores[1].pairs > scores[2].pairs
            ? scores[1].name
            : scores[2].pairs > scores[1].pairs
                ? scores[2].name
                : 'Нічия';
        summary += `Переможець раунду: ${winner}`;
    }
    alert(summary);

    if (currentRound < totalRounds) {
        currentRound++;
        nextRound();
    } else {
        alert('Гру завершено! Дякуємо за гру!');
    }
}

