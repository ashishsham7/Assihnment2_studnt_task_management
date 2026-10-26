
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let editIndex = -1;

// Save tasks in browser
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {
    let list = document.getElementById("taskList");
    let filter = document.getElementById("filter").value;

    list.innerHTML = "";

    tasks.forEach(function(task, index) {

        if (filter === "Pending" && task.completed) return;
        if (filter === "Completed" && !task.completed) return;

        let div = document.createElement("div");
        div.className = "task";

        if (task.completed) {
            div.classList.add("completed");
        }

        let title = document.createElement("h3");
        title.textContent = task.title;

        let subject = document.createElement("p");
        subject.textContent = "Subject: " + task.subject;

        let date = document.createElement("p");
        date.textContent = "Due Date: " + task.date;

        let status = document.createElement("p");
        status.textContent = task.completed
            ? "Completed"
            : "Pending";

        let completeButton = document.createElement("button");
        completeButton.textContent = task.completed
            ? "Mark Pending"
            : "Complete";

        completeButton.onclick = function() {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        };

        let editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.onclick = function() {
            document.getElementById("title").value = task.title;
            document.getElementById("subject").value = task.subject;
            document.getElementById("date").value = task.date;

            editIndex = index;
            document.getElementById("saveButton").textContent = "Update Task";
        };

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";

        deleteButton.onclick = function() {
            if (confirm("Delete this task?")) {
                tasks.splice(index, 1);
                saveTasks();
                displayTasks();
            }
        };

        div.append(title, subject, date, status,
                   completeButton, editButton, deleteButton);

        list.appendChild(div);
    });
}

// Add or update a task
document.getElementById("taskForm").onsubmit = function(event) {
    event.preventDefault();

    let title = document.getElementById("title").value;
    let subject = document.getElementById("subject").value;
    let date = document.getElementById("date").value;

    if (editIndex === -1) {
        tasks.push({
            title: title,
            subject: subject,
            date: date,
            completed: false
        });
    } else {
        tasks[editIndex].title = title;
        tasks[editIndex].subject = subject;
        tasks[editIndex].date = date;
        editIndex = -1;
    }

    saveTasks();
    displayTasks();

    document.getElementById("taskForm").reset();
    document.getElementById("saveButton").textContent = "Add Task";
};

// Change task filter
document.getElementById("filter").onchange = displayTasks;

// Show saved tasks when page opens
displayTasks();
