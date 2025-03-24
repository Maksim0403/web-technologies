function changeColor() {
    let red = document.querySelector('#red')
    let yellow = document.querySelector('#yellow')
    let green = document.querySelector('#green')
    let statusText = document.querySelector('#status');

    let redDuration = parseInt(prompt("Input duration for red light (in seconds): ", 5)) * 1000;
    let yellowDuration = parseInt(prompt("Input duration for yellow light (in seconds): ", 3)) * 1000;
    let greenDuration = parseInt(prompt("Input duration for green light (in seconds): ", 7)) * 1000;

    red.style.opacity = 1;
    yellow.style.opacity = 0.3;
    green.style.opacity = 0.3;
    statusText.textContent = "Current State: Red";

    console.log( "Current State: Red")

    setTimeout(function () {
        yellow.style.opacity = 1;
        red.style.opacity = 0.3;
        green.style.opacity = 0.3;
        statusText.textContent = "Current State: Yellow";
        console.log( "Current State: Yellow")
    }, redDuration);

    setTimeout(function () {
        yellow.style.opacity = 0.3;
        green.style.opacity = 1;
        statusText.textContent = "Current State: Green";
        console.log( "Current State: Green")
    }, redDuration + yellowDuration);

    setTimeout(function () {
        let count = 0;
        let intervalID = setInterval(function () {
            if (count < 6) {
                yellow.style.opacity = yellow.style.opacity === "1" ? "0.3" : "1";
                green.style.opacity = 0.3;
                red.style.opacity = 0.3;
                statusText.textContent = "Current State: Yellow (Blinking)";
                console.log( "Current State:  Yellow (Blinking)")
                count++;
            } else {
                clearInterval(intervalID);
            }
        }, 500);
    }, redDuration + yellowDuration + greenDuration);

    setTimeout(function () {
        red.style.opacity = 1;
        yellow.style.opacity = 0.3;
        green.style.opacity = 0.3;
        statusText.textContent = "Current State: Red";
        console.log( "Current State: Red")
    }, redDuration + yellowDuration + greenDuration + 4500);

    setTimeout(changeColor, redDuration + yellowDuration + greenDuration + 4500 + 3000);
}

let manualStateIndex = 0;

function manualSwitch() {
    let red = document.querySelector('#red');
    let yellow = document.querySelector('#yellow');
    let green = document.querySelector('#green');
    let statusText = document.querySelector('#status');

    switch (manualStateIndex) {
        case 0:
            red.style.opacity = 1;
            yellow.style.opacity = 0.3;
            green.style.opacity = 0.3;
            statusText.textContent = "Current State: Red";
            break;
        case 1:
            yellow.style.opacity = 1;
            red.style.opacity = 0.3;
            green.style.opacity = 0.3;
            statusText.textContent = "Current State: Yellow";
            break;
        case 2:
            yellow.style.opacity = 0.3;
            green.style.opacity = 1;
            statusText.textContent = "Current State: Green";
            break;
        case 3:
            let count = 0;
            let intervalID = setInterval(function () {
                if (count < 6) {
                    yellow.style.opacity = yellow.style.opacity === "1" ? "0.3" : "1";
                    green.style.opacity = 0.3;
                    red.style.opacity = 0.3;
                    statusText.textContent = "Current State: Yellow (Blinking)";
                    count++;
                } else {
                    clearInterval(intervalID);
                }
            }, 500);
            break;
    }

    manualStateIndex = (manualStateIndex + 1) % 4;
}