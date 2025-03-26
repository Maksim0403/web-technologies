let lamp = document.getElementById('lamp');
let toggleBtn = document.getElementById('toggleBtn');
let lampType = document.getElementById('lampType');
let brightnessBtn = document.getElementById('brightnessBtn');

let isOn = false;
let currentType = 'standard';
let timerID;


function updateLampClass() {
    lamp.className = `lamp ${currentType} ${ isOn ? 'on' : 'off'}`;
}

toggleBtn.addEventListener('click', function() {
    isOn = !isOn;
    toggleBtn.textContent = isOn ? "OFF" : "ON";
    updateLampClass();

    clearTimeout(timerID);
    timerID = setTimeout(function () {
            isOn = false;
            toggleBtn.textContent = "OFF";
            updateLampClass();
        }, 300000/*5000*/);
});

lampType.addEventListener('change', function() {
    currentType = lampType.value;
    updateLampClass();

    clearTimeout(timerID);
    timerID = setTimeout(function () {
        isOn = false;
        toggleBtn.textContent = "OFF";
        updateLampClass();
    }, 1000);
});

brightnessBtn.addEventListener('click', function() {
    let brightness = prompt("Input brightness: ");
    let brightnessValue = parseInt(brightness);

    if (isNaN(brightnessValue) || brightnessValue <= 0 || brightnessValue > 200) {
        alert("Incorrect value");
        return;
    }

    lamp.style.filter = `brightness(${brightnessValue}%)`;

    });
