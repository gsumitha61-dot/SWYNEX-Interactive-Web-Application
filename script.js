const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const taskCount = document.getElementById("task-count");
const filterButtons = document.querySelectorAll(".filter-btn");

let currentFilter = "all";
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
localStorage.setItem("tasks", JSON.stringify(tasks));
}

function updateCount() {
const completed = tasks.filter(task => task.completed).length;
const pending = tasks.length - completed;
taskCount.textContent =
    `Total: ${tasks.length} | Pending: ${pending} | Completed: ${completed}`;


}

function applyFilter(filter) {
currentFilter = filter;

document.querySelectorAll(".task-item").forEach(li => {
    const isCompleted = li.classList.contains("completed");

    if (filter === "all") {
        li.style.display = "flex";
    } else if (filter === "pending") {
        li.style.display = isCompleted ? "none" : "flex";
    } else {
        li.style.display = isCompleted ? "flex" : "none";
    }
});

filterButtons.forEach(button => {
    button.classList.toggle("active", button.dataset.filter === filter);
});


}

function renderTasks() {
taskList.innerHTML = "";


tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task-item";

    if (task.completed) {
        li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = task.text;

    const completeButton = document.createElement("button");
    completeButton.type = "button";
    completeButton.className = "complete-btn";
    completeButton.textContent = task.completed ? "Undo" : "Complete";

    completeButton.addEventListener("click", () => {
        task.completed = !task.completed;
        saveTasks();
        renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", () => {
        tasks = tasks.filter(item => item.id !== task.id);
        saveTasks();
        renderTasks();
    });

    li.append(span, completeButton, deleteButton);
    taskList.appendChild(li);
});

updateCount();
applyFilter(currentFilter);


}

filterButtons.forEach(button => {
button.addEventListener("click", () => {
applyFilter(button.dataset.filter);
});
});

taskForm.addEventListener("submit", event => {
event.preventDefault();

const text = taskInput.value.trim();

if (!text) {
    alert("Please enter a task!");
    return;
}

tasks.push({
    id: Date.now() + Math.random(),
    text: text,
    completed: false
});

saveTasks();
taskInput.value = "";
renderTasks();


});

renderTasks();

console.log("Task Manager JavaScript loaded successfully!");
