document.addEventListener('DOMContentLoaded', () => {
    loadTasks();
});

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        addTaskToDOM(task);
    });
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById('new-task');
    const taskText = taskInput.value.trim();

    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskText,
        completed: false
    };

    addTaskToDOM(task);

    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.push(task);
    saveTasks(tasks);

    taskInput.value = '';
}

function addTaskToDOM(task) {
    const taskList = document.getElementById('task-list');

    const taskItem = document.createElement('li');
    taskItem.className = `task-item ${task.completed ? 'completed' : ''}`;
    taskItem.dataset.id = task.id;

    const taskText = document.createElement('span');
    taskText.className = 'task-text';
    taskText.textContent = task.text;

    const taskActions = document.createElement('div');
    taskActions.className = 'task-actions';

    const completeButton = document.createElement('button');
    completeButton.className = 'complete-btn';
    completeButton.innerHTML = '&#10003;';
    completeButton.onclick = () => toggleComplete(task.id);

    const editButton = document.createElement('button');
    editButton.className = 'edit-btn';
    editButton.innerHTML = '&#9998;';
    editButton.onclick = () => editTask(task.id);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-btn';
    deleteButton.innerHTML = '&#10060;';
    deleteButton.onclick = () => deleteTask(task.id);

    taskActions.appendChild(completeButton);
    taskActions.appendChild(editButton);
    taskActions.appendChild(deleteButton);

    taskItem.appendChild(taskText);
    taskItem.appendChild(taskActions);

    taskList.appendChild(taskItem);
}

function toggleComplete(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === taskId);
    task.completed = !task.completed;
    saveTasks(tasks);
    location.reload();
}

function editTask(taskId) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const task = tasks.find(task => task.id === taskId);
    const newTaskText = prompt('Edit your task:', task.text);

    if (newTaskText !== null && newTaskText.trim() !== '') {
        task.text = newTaskText.trim();
        saveTasks(tasks);
        location.reload();
    }
}

function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks(tasks);
    location.reload();
}
