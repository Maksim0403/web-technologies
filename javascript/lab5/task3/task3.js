//#1
function clock() {
    let span = document.getElementById('clock');

    function time() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();

        span.textContent = (hours < 10 ? '0' : '') + hours + ":" + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

    setInterval(time, 1000);
}

clock();

//#2
function countdownTimer() {
    let targetDate = document.getElementById("meeting-time");
    let targetTime = new Date(targetDate.value).getTime();

    let countdownInterval = setInterval(function () {
        let now = new Date().getTime();
        let timeLeft = targetTime - now;

        let days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        let hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
        let minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
        let seconds = Math.floor((timeLeft / 1000) % 60);

        document.getElementById("countdown").innerHTML =
            `${days}d ${hours}h ${minutes}m ${seconds}s`;

        if (timeLeft < 0) {
            clearInterval(countdownInterval);
            document.getElementById("countdown").innerHTML = "The event has started!";
        }

    }, 1000);
}

function createCalendar(month, year) {
    const monthYearDisplay = document.getElementById("month-year");
    const calendarBody = document.getElementById("calendar-body");

    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
        daysInMonth[1] = 29;
    }

    const firstDay = new Date(year, month - 1, 0).getDay();

    const months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень",
        "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

    monthYearDisplay.textContent = `${months[month - 1]} ${year}`;

    calendarBody.innerHTML = "";

    let dayCount = 1;

    for (let i = 0; i < 6; i++) {
        let row = document.createElement("tr");

        for (let j = 0; j < 7; j++) {
            let cell = document.createElement("td");

            if (i === 0 && j < firstDay) {
                row.appendChild(cell);
            } else if (dayCount <= daysInMonth[month - 1]) {
                cell.textContent = dayCount;
                row.appendChild(cell);
                dayCount++;
            }
        }
        calendarBody.appendChild(row);
    }
}

function updateCalendar() {
    let month = document.getElementById("month").value;
    let year = document.getElementById("year").value;
    createCalendar(month, year);
}

let currDate = new Date();
document.getElementById("month").value = currDate.getMonth() + 1;
document.getElementById("year").value = currDate.getFullYear();
createCalendar(currDate.getMonth() + 1, currDate.getFullYear());


function calculateTimeToBirthday() {
    const birthdayInput = document.getElementById("birthday").value;

    if (!birthdayInput) {
        alert("Будь ласка, введіть вашу дату народження!");
        return;
    }

    const currentDate = new Date();

    const birthday = new Date(birthdayInput);
    birthday.setFullYear(currentDate.getFullYear());

    if (birthday < currentDate) {
        birthday.setFullYear(currentDate.getFullYear() + 1);
    }

    const timeDifference = birthday - currentDate;

    const months = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    const days = Math.floor((timeDifference % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    document.getElementById("time-to-birthday").innerHTML =
        `До дня народження залишилось: ${months} місяців, ${days} днів, ${hours} годин, ${minutes} хвилин, ${seconds} секунд.`;
}