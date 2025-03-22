// script.js
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTask');
const taskList = document.getElementById('taskList');
const filterButtons = document.querySelectorAll('.filter-btn');
const clearCompletedButton = document.getElementById('clearCompleted');

let tasks = []; // Store tasks

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(task);
        renderTasks();
        taskInput.value = '';
    }
}

function renderTasks() {
    taskList.innerHTML = '';
    const filter = document.querySelector('.filter-btn.active').dataset.filter;
    const filteredTasks = tasks.filter(task => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.className = 'taskItem';
        taskItem.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">${task.text}</span>
            <div>
                <button class="complete"><i class="fas fa-check"></i></button>
                <button class="delete"><i class="fas fa-trash"></i></button>
            </div>
        `;
        taskList.appendChild(taskItem);

        const completeButton = taskItem.querySelector('.complete');
        const deleteButton = taskItem.querySelector('.delete');

        completeButton.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTasks();
        });

        deleteButton.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            renderTasks();
        });

        completeButton.parentElement.parentElement.querySelector('span').classList.toggle('completed', task.completed)
    });
}

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        renderTasks();
    });
});

clearCompletedButton.addEventListener('click', ()=>{
  tasks = tasks.filter(task=> !task.completed);
  renderTasks();
})

renderTasks(); // Initial render