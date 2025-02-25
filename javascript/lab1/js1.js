let studentName = document.querySelectorAll("ul li");

let button = document.getElementById("show-btn");

button.onmousedown = function () {
    if (studentName.length > 0) {
        studentName[0].innerText = "Maksym Didychuk";
    }
};