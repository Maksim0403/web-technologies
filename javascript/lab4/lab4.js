//Task 1
function task1() {
    console.log("--------Task 1--------");

    let array = ["orange", "banana", "apple", "peach", "pear"];
    console.log("Array: [" + array + "]");

    function deleteLastElOfArray(array) {
        array.pop();
        return array;
    }

    console.log("1. Array without last element: [" + deleteLastElOfArray(array) + "]");

    function addFirstEl(array) {
        array.unshift("pineapple");
        return array;
    }

    console.log("2. Array with [pineapple] at start: [" + addFirstEl(array) + "]");

    function sortArray(array) {
        array.sort((a, b) => -1 * a.localeCompare(b));
        return array;
    }

    console.log("3. Sorted array: [" + sortArray(array) + "]");

    console.log("4. Index of [apple]: " + array.indexOf("apple"));
}

//Task 2
function task2() {
    console.log("--------Task 2--------");

    let colorsArray = ["black", "redblue", "green", "blue", "aquamarine", "blue"];

    console.log("1. Colors array: [" + colorsArray + "]");

    function findLongestElOfArray(colorsArray) {
        let longestEl;
        for (const color of colorsArray) {
            if (!longestEl || color.length > longestEl.length) {
                longestEl = color;
            }
        }
        return longestEl;
    }

    console.log("2.1. Longest element of array: " + findLongestElOfArray(colorsArray));

    function findShortestElOfArray(colorsArray) {
        let shortestEl;
        for (const color of colorsArray) {
            if (!shortestEl || color.length < shortestEl.length) {
                shortestEl = color;
            }
        }
        return shortestEl;
    }

    console.log("2.2. Shortest element of array: " + findShortestElOfArray(colorsArray));

    console.log("3. Delete all despite blue: [" + colorsArray.filter(col => col.includes("blue")) + "]");

    console.log("4, 5. Joined array output: " + colorsArray.join(", "));
}

//Task 3
function task3() {
    console.log("--------Task 3--------");
    let employees = [{name: "John", age: 22, position: "Developer"},
        {name: "Den", age: 31, position: "QA"},
        {name: "Bob", age: 27, position: "Developer"},
        {name: "Jack", age: 27, position: "PM"},
        {name: "Frank", age: 35, position: "Data scientist"}];


    console.log("1.-----------------------------")
    for (let employee of employees) {
        console.log(employee);
    }

    console.log("2.----------------------------");

    function sortEmployeesByName(employees) {
        employees.sort((a, b) => a.name.localeCompare(b.name));
        return employees;
    }

    let sorted = sortEmployeesByName(employees);
    for (let employee of sorted) {
        console.log(employee);
    }

    console.log("3.----------------------------");

    function findEmployeesByPosition(employees, position) {
        let isTrue = false;

        for (let employee of employees) {
            if (employee.position === position) {
                console.log(employee);
                isTrue = true;
            }
        }
        if (isTrue === false) {
            console.log("No such employee");
        }
    }

    findEmployeesByPosition(employees, "Developer");


    console.log("4.-------------------------")

    function deleteEmployeesByAge(employees, age) {
        return employees.filter(employee => employee.age >= age);
    }

    console.log(deleteEmployeesByAge(employees, 31));

    console.log("5.-------------------------")

    function addEmployee(name, age, position) {
        return employees.push({name, age, position});
    }

    addEmployee("SSS", 23, "fdf");

    for (let employee of employees) {
        console.log(employee);
    }
}

//Task 4
function task4() {
    console.log("--------Task 4--------");

    console.log("1.------------------------")
    let students = [{name: "Олексій", age: 18, grade: 2},
        {name: "Іван", age: 19, grade: 2},
        {name: "Петро", age: 20, grade: 3},
        {name: "Дмитро", age: 17, grade: 1},
        {name: "Олександр", age: 21, grade: 4},];

    for (let student of students) {
        console.log(student);
    }

    console.log("2.------------------------");

    function deleteStudentsByName(students, name) {
        return students.filter(students => students.name !== name);
    }

    console.log(deleteStudentsByName(students, "Олексій"));


    console.log("3.-----------------------");

    function addStudent(name, age, grade) {
        return students.push({name, age, grade});

    }

    addStudent("Андрій", 20, 3);

    for (let student of students) {
        console.log(student);
    }

    console.log("4.------------------------");

    function sortStudentsByAge(students) {
        students.sort((a, b) => a.age - b.age);
        return students;
    }

    let sortStud = sortStudentsByAge(students);

    for (let student of sortStud) {
        console.log(student);
    }

    console.log("5.------------------------");

    function findStudentOnThirdGrade(students) {
        let isTrue = false;

        for (let student of students) {
            if (student.grade === 3) {
                console.log(student);
                isTrue = true;
            }
        }
        if (isTrue === false) {
            console.log("No students at this grade");
        }
    }

    findStudentOnThirdGrade(students);
}

//Task 5
function task5() {
    console.log("--------Task 5--------");

    console.log("1.------------------------");
    let arrayOfNums = [1, 3, 5, 6, 12, 4, 8];
    console.log("Array: " + arrayOfNums);

    let map1 = arrayOfNums.map((x) => x * x);
    console.log("Squares: " + map1);

    console.log("2.------------------------");
    let evens = arrayOfNums.filter(num => num % 2 === 0);
    console.log("Evens: " + evens);

    console.log("3.------------------------");
    let sum = arrayOfNums.reduce((sum, num) => sum + num, 0)
    console.log("Sum of array: " + sum);

    console.log("4.------------------------");
    let newArrayOfNums = [2, 4, 7, 9, 11];
    arrayOfNums.push(newArrayOfNums);
    console.log("Array with 5 elements: " + arrayOfNums);

    console.log("5.------------------------");
    arrayOfNums.splice(0, 3);
    console.log("Array without first 3 elements: " + arrayOfNums);
}

function task6() {
    console.log("--------Task 6--------");

    function libraryManagement() {

        return {
            books: [
                {
                    title: "Death On The Nile",
                    author: "Agatha Christie",
                    genre: "Mystery",
                    pages: 100,
                    isAvailable: false
                },
                {title: "1984", author: "George Orwell", genre: "Dystopian", pages: 328, isAvailable: true},
                {title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", pages: 310, isAvailable: true},
                {
                    title: "To Kill a Mockingbird",
                    author: "Harper Lee",
                    genre: "Classic",
                    pages: 281,
                    isAvailable: false
                },
                {
                    title: "The Great Gatsby",
                    author: "F. Scott Fitzgerald",
                    genre: "Classic",
                    pages: 180,
                    isAvailable: true
                },
                {
                    title: "The Catcher in the Rye",
                    author: "J.D. Salinger",
                    genre: "Fiction",
                    pages: 214,
                    isAvailable: false
                },
                {
                    title: "Brave New World",
                    author: "Aldous Huxley",
                    genre: "Science Fiction",
                    pages: 268,
                    isAvailable: true
                }
            ],
            createBook: function () {
                console.log(this.books);
            },
            addBook: function (title, author, genre, pages, isAvailable = true) {
                this.books.push({title, author, genre, pages, isAvailable});
                console.log(`Book "${title}" added.`);
            },
            removeBook: function (title) {
                let index = this.books.findIndex(book => book.title === title);
                if (index !== -1) {
                    this.books.splice(index, 1);
                    console.log(`Book "${title}" removed.`);
                } else {
                    console.log(`Book "${title}" not found.`);
                }
            },
            findBooksByAuthor: function (author) {
                let bookByAuthor = this.books.filter(book => book.author === author);
                if (bookByAuthor.length > 0) {
                    console.log(`Books with author "${author}: `);
                    console.log(bookByAuthor);
                } else {
                    console.log(`Books with author "${author}" not found.`);
                }
            },
            toggleBookAvailability: function (title, isBorrowed) {
                let book = this.books.find(book => book.title === title);
                if (book) {
                    book.isAvailable = !isBorrowed;
                    console.log(`Book "${title}" availability toggled.`);
                } else {
                    console.log(`Book "${title}" not found.`);
                }
            },
            sortBooksByPages: function () {
                console.log("Sorted books: ");
                this.books.sort((a, b) => a.pages - b.pages);
            },
            getBooksStatistics: function () {
                let totalAmountOfBooks = this.books.length;
                console.log("Total amount of books: " + totalAmountOfBooks);

                let availableBooks = this.books.filter(book => book.isAvailable === true);
                let amountOfAvailableBooks = (availableBooks.length);
                console.log("Available books: " + amountOfAvailableBooks);

                let borrowedBooks = this.books.filter(book => book.isAvailable === false);
                let amountOfBorrowedBooks = borrowedBooks.length;
                console.log("Borrowed books: " + amountOfBorrowedBooks);

                let totalAmountOfPages = this.books.reduce((num, book) => num + book.pages, 0);
                let averageAmountOfPagesInBook = totalAmountOfPages / totalAmountOfBooks;
                console.log("Average amount of pages in book: " + averageAmountOfPagesInBook);
            }
        };
    }

    let library = libraryManagement();
    console.log("------------------");
    library.createBook();

    console.log("------------------");
    library.addBook("New", "Auth", "Detective", 123);
    library.createBook();

    console.log("------------------");
    library.removeBook("New");
    library.createBook();

    console.log("------------------");
    library.findBooksByAuthor("Agatha Christie");

    console.log("------------------");
    library.toggleBookAvailability("Brave New World", false);
    library.createBook();

    console.log("------------------");
    library.sortBooksByPages();
    library.createBook();

    console.log("------------------");
    library.getBooksStatistics();
}

function task7() {
    console.log("--------Task 7--------");

    let student = {name: "Ivan", age: 19, grade: 2};

    Object.defineProperty(student, 'subjects', {
        value: ["Javascript", "Python", "C#"],
        writable: true,
        enumerable: true,
        configurable: true
    })
    console.log(student);

    delete student.age;
    console.log(student);
}

task1();
task2();
task3();
task4();
task5();
task6();
task7();
