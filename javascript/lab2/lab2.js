//1.1
console.log("----1.1----");

const array = [4, 7, 2, 3, 0, 7];

function findMinAndMax(array) {
    if (!array.length) return null;

    let min = array[0], max = array[0];

    array.forEach(element => {
        if (element < min) min = element;
        if (element > max) max = element;
    });
    return {min, max};
}

console.log(findMinAndMax(array));

//1.2
console.log("----1.2----");
function compareTwoObjects(obj1, obj2) {
    for (let i in obj1) {
        if (obj1[i] !== obj2[i]) {
            return false;
        }
    }
    return true;
}

let obj1 = {name: "Object1", value: 1};
let obj2 = {name: "Object1", value: 1};
let obj3 = {name: "Object2", value: 2};

console.log(compareTwoObjects(obj1, obj2));

//2.1
console.log("----2.1----");

function inRange(num) {
    if (num > 0 && num <= 10) {
        return true;
    }
    return false;
}

let num = 2;

console.log(inRange(num));

console.log("--------");

//2.2
console.log("----2.2----");

let isTrue = true;

console.log(isTrue);

isTrue = !isTrue;

console.log(isTrue);

isTrue = !isTrue;

console.log(isTrue);

//3.1
console.log("----3.1----");

function convertMarkIntoWord (mark) {
    if (mark >= 90) {
        console.log("Відмінно");
    } else if (mark < 90 && mark >= 70) {
        console.log("Добре");
    } else if (mark < 70 && mark >= 50) {
        console.log("Задовільно");
    } else if (mark < 50) {
        console.log("Незадовільно");
    } else {
        return null;
    }
}

let mark1 = 75;
let mark2 = 91;
let mark3 = 48;

convertMarkIntoWord(mark1);
convertMarkIntoWord(mark2);
convertMarkIntoWord(mark3);

//3.2
console.log("----3.2----");

let month = 6;

if (month >= 3 && month <= 5) {
    console.log("Spring");
} else {
    if (month >= 6 && month <= 8) {
        console.log("Summer");
    } else {
        if (month >= 9 && month <= 11) {
            console.log("Autumn");
        } else {
            console.log("Winter");
        }
    }
}

let month1 = 5;

let season = (month1 >= 3 && month1 <= 5) ? "Spring" :
    (month1 >= 6 && month1 <= 8) ? "Summer" :
        (month1 >= 9 && month1 <= 11) ? "Autumn" : "Winter";

console.log(season);

