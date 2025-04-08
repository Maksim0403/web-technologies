const taskInput = document.getElementById('taskInput');
const addButton = document.getElementById('addButton');
const taskList = document.getElementById('taskList');
const sortButtons = document.querySelectorAll('.sort-button');

let tasks = [];
let currentSort = 'date';

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    tasks.push(task);
    updateTaskList();
}

function deleteTask(id) {
    const taskElement = document.querySelector(`li[data-id="${id}"]`);

    if (taskElement) {
        taskElement.classList.add('fadeOut');

        setTimeout(() => {
            tasks = tasks.filter(task => task.id !== id);
            updateTaskList();
        }, 500);
    }
}

function toggleComplete(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
            task.updatedAt = new Date();
        }
        return task;
    });

    updateTaskList();
}

function sortTasks() {
    return tasks.slice().sort((a, b) => {
        if (currentSort === 'status') {
            return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
        } else if (currentSort === 'update') {
            return b.updatedAt - a.updatedAt;
        } else {
            return b.createdAt - a.createdAt;
        }
    });
}

function updateTaskText(id, newText) {
    tasks = tasks.map(function(task) {
        if (task.id === id) {
            task.text = newText;
            task.updatedAt = new Date();
        }
        return task;
    });

    updateTaskList();
}

function updateTaskList() {
    const sortedTasks = sortTasks();
    taskList.innerHTML = '';

    sortedTasks.forEach(function(task) {
        const li = document.createElement('li');
        li.dataset.id = task.id;

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', function() {
            toggleComplete(task.id);
        });

        const taskText = document.createElement('div');
        taskText.className = 'task-text' + (task.completed ? ' completed' : '');
        taskText.textContent = task.text;
        taskText.contentEditable = true;

        const dateCreatedElement = document.createElement('div');
        dateCreatedElement.className = 'date-created';
        dateCreatedElement.innerHTML = 'Створено: <span class="date-time">' + task.createdAt.toLocaleString() + '</span>';

        const dateUpdatedElement = document.createElement('div');
        dateUpdatedElement.className = 'date-updated';
        dateUpdatedElement.innerHTML = 'Оновлено: <span class="date-time">' + task.updatedAt.toLocaleString() + '</span>';

        const taskButtons = document.createElement('div');
        taskButtons.className = 'task-buttons';

        const editButton = document.createElement('button');
        editButton.className = 'edit-button';
        editButton.textContent = 'Змінити';
        editButton.addEventListener('click', function() {
            taskText.focus();
        });

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Видалити';
        deleteButton.addEventListener('click', function() {
            deleteTask(task.id);
        });

        taskText.addEventListener('blur', function() {
            if (taskText.textContent.trim().length >= 3) {
                updateTaskText(task.id, taskText.textContent);
            } else {
                taskText.textContent = task.text;
            }
        });

        taskButtons.appendChild(editButton);
        taskButtons.appendChild(deleteButton);

        li.appendChild(checkbox);
        li.appendChild(taskText);
        li.appendChild(dateCreatedElement);
        li.appendChild(dateUpdatedElement);
        li.appendChild(taskButtons);

        taskList.appendChild(li);
    });
}
addButton.addEventListener('click', () => {
    const text = taskInput.value.trim();

    if (text.length >= 3) {
        addTask(text);
        taskInput.value = '';
    }
});

sortButtons.forEach(button => {
    button.addEventListener('click', () => {
        currentSort = button.dataset.sort;

        sortButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        updateTaskList();
    });
});

updateTaskList();