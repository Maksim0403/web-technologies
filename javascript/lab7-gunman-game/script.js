'use strict';
const sfxIntro = new Audio('/javascript/lab7-gunman-game/project_parts/sfx/intro.m4a');
const sfxFire = new Audio('/javascript/lab7-gunman-game/project_parts/sfx/fire.m4a');
const sfxDeath = new Audio('/javascript/lab7-gunman-game/project_parts/sfx/death.m4a');
const sfxWin = new Audio('/javascript/lab7-gunman-game/project_parts/sfx/win.m4a');
const sfxShot = new Audio('/javascript/lab7-gunman-game/project_parts/sfx/shot.m4a');
const sfxShotFall = new Audio('/javascript/lab7-gunman-game/project_parts/sfx/shot-fall.m4a');
const sfxWait = new Audio('/javascript/lab7-gunman-game/project_parts/sfx/wait.m4a');
const sfxFoul = new Audio('/javascript/lab7-gunman-game/project_parts/sfx/foul.m4a');

const gameState = {
    level: 1,
    score: 0,
    playerTime: 0,
    gunmanTime: 0,
    canShoot: false,
    duelActive: false,
    duelStartTime: 0,
    duelTimeout: null
};

function startGame() {
    sfxIntro.currentTime = 0;
    sfxIntro.play();

    document.querySelector('.game-menu').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'block';
    document.querySelector('.game-screen').style.display = 'block';
    document.querySelector('.game-panels').style.display = 'block';

    gameState.level = 1;
    gameState.score = 0;
    gameState.playerTime = 0;
    gameState.gunmanTime = 0;
    gameState.canShoot = false;
    gameState.duelActive = false;

    document.querySelector('.score-panel__score_num').textContent = '0';
    document.querySelector('.score-panel__level').textContent = 'Level ' + gameState.level;

    const gunman = document.querySelector('.gunman');
    gunman.className = 'gunman gunman-level-1 walking move-to-center';

    moveGunman();

    return {
        level: gameState.level,
        score: gameState.score
    };
}

function moveGunman() {
    const gunman = document.querySelector('.gunman');
    const level = gameState.level;
    const levelClass = 'gunman-level-' + level;

    gunman.className = 'gunman ' + levelClass + ' walking move-to-center';

    setTimeout(function() {
        gunman.className = 'gunman ' + levelClass + ' standing';
        setTimeout(prepareForDuel, 1000);
    }, 5000);

    return {
        level: level,
        gunmanClass: 'gunman ' + levelClass + ' walking move-to-center'
    };
}

function nextLevel() {
    const message = document.querySelector('.message');
    const nextLevelButton = document.querySelector('.button-next-level');
    const gunman = document.querySelector('.gunman');

    const newLevel = gameState.level + 1;
    gameState.level = newLevel;

    gameState.canShoot = false;
    gameState.duelActive = false;

    message.className = 'message';
    message.textContent = '';
    nextLevelButton.style.display = 'none';
    document.querySelector('.score-panel__level').textContent = 'Level ' + newLevel;

    const levelClass = 'gunman-level-' + newLevel;
    gunman.className = 'gunman ' + levelClass + ' walking';

    sfxIntro.currentTime = 0;
    sfxIntro.play();

    moveGunman();

    return {
        level: newLevel,
        canShoot: false,
        duelActive: false
    };
}

function prepareForDuel() {
    const gunman = document.querySelector('.gunman');
    const message = document.querySelector('.message');
    const level = gameState.level;

    const levelClass = 'gunman-level-' + level;

    sfxWait.play();

    const readyDelay = 1000 + Math.random() * 2000;

    setTimeout(function() {
        gunman.className = 'gunman ' + levelClass + ' ready';
        message.className = 'message message--fire';
        sfxFire.play();
        startDuel();
    }, readyDelay);

    return {
        level: level,
        readyDelay: readyDelay
    };
}

function startDuel() {
    const level = gameState.level;

    const shootDelay = 1500 - (level * 200);
    const newGunmanTime = Math.max(shootDelay, 500) / 1000; // Min 0.5 seconds

    gameState.gunmanTime = newGunmanTime;
    gameState.canShoot = true;
    gameState.duelActive = true;
    gameState.duelStartTime = Date.now();

    gameState.duelTimeout = setTimeout(function() {
        if (gameState.duelActive) {
            gunmanShootsPlayer();
        }
    }, newGunmanTime * 1000);

    return {
        canShoot: true,
        duelActive: true,
        duelStartTime: gameState.duelStartTime,
        gunmanTime: newGunmanTime
    };
}

function playerWins() {
    sfxIntro.pause();
    sfxShot.play();
    sfxShotFall.play();
    sfxWin.play();

    const gunman = document.querySelector('.gunman');
    const message = document.querySelector('.message');
    const nextLevelButton = document.querySelector('.button-next-level');

    document.querySelector('.win-restart').addEventListener('click', restartGame);

    const level = gameState.level;
    const playerTime = gameState.playerTime;
    const currentScore = gameState.score;

    const levelClass = 'gunman-level-' + level;

    const basePoints = 100;
    const timeBonus = Math.floor(1000 / (playerTime * 1000));
    const newScore = currentScore + basePoints + timeBonus;

    gameState.score = newScore;

    gunman.className = 'gunman ' + levelClass + ' dead';
    message.className = 'message message--win';
    message.textContent = 'You Win!';
    document.querySelector('.score-panel__score_num').textContent = newScore;

    if (level < 5) {
        nextLevelButton.style.display = 'block';
    } else {
        setTimeout(function() {
            document.getElementById('final-score').textContent = newScore;
            document.querySelector('.wrapper').style.display = 'none';
            document.querySelector('.win-screen').style.display = 'block';
            document.querySelector('.win-restart').style.display = 'block';
        }, 6000);
    }

    return {
        level: level,
        score: newScore,
        playerTime: playerTime
    };
}

function gunmanShootsPlayer() {
    sfxIntro.pause();
    sfxDeath.play();

    const gunman = document.querySelector('.gunman');
    const gameScreen = document.querySelector('.game-screen');
    const message = document.querySelector('.message');
    const restartButton = document.querySelector('.button-restart');

    const level = gameState.level;
    const playerTime = gameState.playerTime;
    const gunmanTime = gameState.gunmanTime;

    const levelClass = 'gunman-level-' + level;

    sfxFoul.play();

    gameState.canShoot = false;
    gameState.duelActive = false;

    gunman.className = 'gunman ' + levelClass + ' shooting';
    gameScreen.classList.add('game-screen--death');
    message.className = 'message message--dead';
    message.textContent = 'You Lost!';
    restartButton.style.display = 'block';

    document.querySelector('.time-panel__gunman').textContent = gunmanTime.toFixed(2);

    if (playerTime === 0) {
        document.querySelector('.time-panel__you').textContent = '—';
    } else {
        document.querySelector('.time-panel__you').textContent = playerTime.toFixed(2);
    }

    return {
        canShoot: false,
        duelActive: false,
        level: level,
        playerTime: playerTime,
        gunmanTime: gunmanTime
    };
}

function handleGameScreenClick(event) {
    if (!gameState.canShoot || !gameState.duelActive) {
        return false;
    }

    const gunman = document.querySelector('.gunman');

    const clickTime = Date.now();
    const newPlayerTime = (clickTime - gameState.duelStartTime) / 1000;
    gameState.playerTime = newPlayerTime;

    const wasHit = isClickOnGunman(gunman, event);

    clearTimeout(gameState.duelTimeout);

    gameState.canShoot = false;
    gameState.duelActive = false;

    document.querySelector('.time-panel__you').textContent = newPlayerTime.toFixed(2);
    document.querySelector('.time-panel__gunman').textContent = gameState.gunmanTime.toFixed(2);

    if (!wasHit) {
        gunmanShootsPlayer();
        return false;
    }

    if (newPlayerTime < gameState.gunmanTime) {
        playerWins();
    } else {
        gunmanShootsPlayer();
    }

    return {
        playerTime: newPlayerTime,
        gunmanTime: gameState.gunmanTime,
        canShoot: false,
        duelActive: false,
        wasHit: wasHit
    };
}

function isClickOnGunman(gunmanElement, event) {
    const rect = gunmanElement.getBoundingClientRect();

    const isHit = (
        event.clientX >= rect.left &&
        event.clientX <= rect.right &&
        event.clientY >= rect.top &&
        event.clientY <= rect.bottom
    );

    return isHit;
}

function restartGame() {
    sfxIntro.currentTime = 0;
    sfxIntro.play();

    const gameScreen = document.querySelector('.game-screen');
    const message = document.querySelector('.message');
    const restartButton = document.querySelector('.button-restart');

    gameState.level = 1;
    gameState.score = 0;
    gameState.playerTime = 0;
    gameState.gunmanTime = 0;
    gameState.canShoot = false;
    gameState.duelActive = false;

    document.querySelector('.win-screen').style.display = 'none';
    document.querySelector('.wrapper').style.display = 'block';
    gameScreen.classList.remove('game-screen--death');
    message.className = 'message';
    message.textContent = '';
    restartButton.style.display = 'none';
    document.querySelector('.time-panel__you').textContent = '0.00';
    document.querySelector('.time-panel__gunman').textContent = '0.00';
    document.querySelector('.score-panel__score_num').textContent = '0';
    document.querySelector('.score-panel__level').textContent = 'Level 1';

    moveGunman();

    return {
        level: 1,
        score: 0,
        playerTime: 0,
        gunmanTime: 0,
        canShoot: false,
        duelActive: false
    };
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.game-screen').addEventListener('click', handleGameScreenClick);
    document.querySelector('.button-restart').addEventListener('click', restartGame);
    document.querySelector('.button-next-level').addEventListener('click', nextLevel);

    const preloadImage = new Image();
    preloadImage.src = '/javascript/lab7-gunman-game/project_parts/img/gunman.png ';
});