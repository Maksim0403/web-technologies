function sumOfNatNumbers() {
    let sum = 0;
    let num = 1;

    while (num <= 50) {
        sum += num;
        num++;
    }
    console.log("Сума перших 50 натуральних чисел: " + sum);
}

console.log("-----Task1-----");
sumOfNatNumbers();

function factorialOfNumber(n) {
    let factorial = 1;
    for (let i = 1; i <= n; i++) {
        factorial *= i;
    }
    console.log(`Факторіал числа ${n} : ` + factorial)
}

console.log("-----Task2-----");
factorialOfNumber(5);

function monthsOfYear(month) {
    switch (month) {
        case 1:
            month = "Січень"
            break;
        case 2:
            month = "Лютий";
            break;
        case 3:
            month = "Березень";
            break;
        case 4:
            month = "Квітень";
            break;
        case 5:
            month = "Травень";
            break;
        case 6:
            month = "Червень";
            break;
        case 7:
            month = "Липень";
            break;
        case 8:
            month = "Серпень";
            break;
        case 9:
            month = "Вересень";
            break;
        case 10:
            month = "Жовтень";
            break;
        case 11:
            month = "Листопад";
            break;
        case 12:
            month = "Грудень";
            break;
        default:
            console.log("Невірне число! Будь ласка, введіть число від 1 до 12.");
    }
    return month;
}

console.log("-----Task3-----");
console.log("Вибраний місяць: " + monthsOfYear(3))

function sumOfEvenElementsInArr(array){
    let sum = 0;
    for (let i = 1; i <= array.length; i++) {
        if(array[i] %2 === 0){
            sum += array[i];
        }
    }
    return sum;
}
console.log("-----Task4-----");

let numbers = [1, 2, 3, 4, 5];
console.log("Масив: [ " + numbers + " ]");
let sum = sumOfEvenElementsInArr(numbers);
console.log("Сума парних елементів масиву: " + sum)


const vowels = ["a", "e", "i", "o", "u"];
let countVowels = (str) => {
    let count = 0;

    for(let i = 0; i < str.length; i++) {
        if(vowels.includes(str[i])){
            count++;
        }
    }
    return count;
}

console.log("-----Task5-----");
console.log("Кільксть голосних: " + countVowels("Hello world!"))


function pow(base, exponent){
    return base ** exponent;
}

console.log("-----Task6-----");
console.log(pow(2,4))
console.log(pow(5,3));