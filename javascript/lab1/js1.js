let studentName = document.querySelectorAll("ul li button");

let button = document.getElementById("show-btn");

button.onmousedown = function () {
    if (studentName.length > 0) {
        studentName[0].innerText = "Maksym Didychuk";
    }
};