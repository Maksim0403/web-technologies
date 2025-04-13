// === Game State Variables ===
let duelTimeout;
let canShoot = false;

// === Game Initialization ===
function startGame() {
    document.querySelector('.game-menu').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'block';
    document.querySelector('.game-screen').style.display = 'block';
    document.querySelector('.game-panels').style.display = 'block';

    moveGunman();
}

// === Gunman Movement and Preparation ===
function moveGunman() {
    const gunman = document.querySelector('.gunman');

    gunman.classList.add('move-to-center');

    gunman.addEventListener('animationend', () => {
        gunman.classList.remove('move-to-center');
        gunman.classList.add('standing');
    });

}

function prepareForDuel() {
    const gunman = document.querySelector('.gunman');

    // Change to standing image
    gunman.classList.remove('move-to-center');
    gunman.classList.add('.gunman.ready');

    // Wait a moment before duel starts
    setTimeout(() => {
        document.addEventListener('keydown', handlePlayerShoot);
        gunman.classList.remove('.gunman.ready');
        gunman.classList.add('.gunman.ready');

        // Gunman shoots after a random delay
        const shootDelay = Math.random() * 2000 + 1000; // 1 to 3 seconds
        setTimeout(() => {
            gunmanShoot();
        }, shootDelay);
    }, 1000);
}

// === Duel Handling ===
function timeCounter() {
    console.log('Time counter starts. You can shoot!');
    canShoot = true;

    duelTimeout = setTimeout(() => {
        canShoot = false;
        console.log('Gunman shoots!');
        const gunman = document.querySelector('.gunman');
        gunman.style.backgroundImage = "url('/javascript/lab7-gunman-game/project_parts/img/gunman_duel.gif')";
        gunmanShootsPlayer();
    }, 1500);
}

function gunmanShoot() {
    const gunman = document.querySelector('.gunman');
    gunman.classList.remove('.gunman.ready');
    gunman.classList.add('.gunman.shooting');

    // Handle player loss
    document.querySelector('.game-screen').classList.add('game-screen--death');
    document.removeEventListener('keydown', handlePlayerShoot);

    // Show dead gunman image
    gunman.className = 'gunman .gunman.dead';
}

function gunmanShootsPlayer() {
    console.log('Gunman shot the player!');
    scoreCount(false); // Player lost
}

// === Player Shooting Logic ===
function handlePlayerShoot(event) {
    if (event.code === 'Space') {
        document.removeEventListener('keydown', handlePlayerShoot);

        if (canShoot) {
            clearTimeout(duelTimeout);
            canShoot = false;
            console.log('Player shot the gunman!');
            const gunman = document.querySelector('.gunman');
            gunman.classList.remove('.gunman.ready');
            gunman.classList.add('.gunman.dead');
            scoreCount(true);
        } else {
            console.log('Too early!');
            scoreCount(false);
        }
    }
}

// === Scoring & Level Control ===
function scoreCount(win) {
    if (win) {
        console.log('You won this round!');
        nextLevel();
    } else {
        console.log('You lost this round!');
        showLossVisuals();
    }
}

function nextLevel() {
    document.querySelector('.message').textContent = "You won this round!";
    const nextButton = document.querySelector('.button-next-level');
    nextButton.style.display = 'block';
    nextButton.addEventListener('click', () => {
        nextButton.style.display = 'none';
        prepareForDuel(); // You can insert logic for next level here
    });
}

function showLossVisuals() {
    const gunman = document.querySelector('.gunman');
    gunman.className = 'gunman .gunman.dead'; // Set class with new dead image
    document.querySelector('.game-screen').classList.add('game-screen--death');
}

// === Game Restart ===
function restartGame() {
    window.location.reload(); // Reload page to restart
}

document.querySelector('.button-restart').addEventListener('click', restartGame);

// === Spacebar Shooting (Global Listener) ===
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        if (canShoot) {
            clearTimeout(duelTimeout);
            canShoot = false;
            console.log('Player shot the gunman!');
            scoreCount(true);
        } else {
            console.log('Too early!');
            scoreCount(false);
        }
    }
});
