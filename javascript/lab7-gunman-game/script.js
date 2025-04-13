'use strict';

// variables and elements

function startGame() {
    const section = document.getElementsByClassName('game-menu')[0];
    section.style.display = 'none';
    const section1 = document.getElementsByClassName('wrapper')[0];
    section1.style.display = 'block';
    const section2 = document.getElementsByClassName('game-screen')[0];
    section2.style.display = 'block';
    const section3 = document.getElementsByClassName('game-panels')[0];
    section3.style.display = 'block';


    const gunman = document.querySelector('.gunman');
    gunman.className = 'gunman gunman-level-1 gunman-level-1__walking';
  //  gunman.className = 'gunman gunman-level-1 gunman-level-1__standing';
// Ready
   // gunman.className = 'gunman gunman-level-1 gunman-level-1__ready';


   /* const section4 = document.getElementsByClassName('gunman')[0];
    section4.style.display = 'block';
    section4.classList.add('gunman-level-1')*/
/*    const div = document.createElement('div');
    div.className = 'gunman-level-1';
    section4.appendChild(div);*/

}

function restartGame() {

}

function nextLevel() {

}

function moveGunman() {

}

function prepareForDuel() {

}

function timeCounter() {

}

function gunmanShootsPlayer() {

}

function playerShootsGunman() {

}

function scoreCount() {

}