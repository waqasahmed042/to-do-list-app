const inputTask = document.getElementById(`input-task`);
const listSection = document.getElementById(`list-section`);
const taskCountLine = document.getElementById(`task-count`);

// Function to add task
function addTask() {
    if (inputTask.value === ``) {
        alert(`Enter the Task first!`);
    } else if (isDuplicate(inputTask.value)) {
        alert(`Task already exists!`);
    } else {
        let li = document.createElement(`li`);
        let taskTextNode = document.createTextNode(inputTask.value);
        li.appendChild(taskTextNode);

        let deleteSpan = document.createElement(`span`);
        deleteSpan.innerHTML = `&#x1F5D1`;
        deleteSpan.addEventListener(`click`, function () {
            li.remove();
            taskCount();
            saveData();
        });
        li.appendChild(deleteSpan);

        let editSpan = document.createElement(`span`);
        editSpan.innerHTML = `&#x270E`;
        editSpan.addEventListener(`click`, function () {
            editTask(li, taskTextNode);
        });
        li.appendChild(editSpan);

        listSection.appendChild(li);
        inputTask.value = ``;
        taskCount();
        saveData();
    }
}

// Function to check for duplicate tasks
function isDuplicate(taskValue) {
    const items = listSection.getElementsByTagName("li");
    for (let li of items) {
        if (li.childNodes[0].textContent === taskValue) {
            return true;
        }
    }
    return false;
}

// Function to edit task
function editTask(li, taskTextNode) {
    let taskText = taskTextNode.textContent;
    let editInput = document.createElement(`input`);
    editInput.type = `text`;
    editInput.value = taskText;

    li.innerHTML = ``;
    li.appendChild(editInput);

    let saveButton = document.createElement(`button`);
    saveButton.textContent = `Save`;
    saveButton.addEventListener(`click`, function () {
        saveTask(editInput, li, taskTextNode);
    });
    li.appendChild(saveButton);

    // Save task on Enter key press
    editInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            saveTask(editInput, li, taskTextNode);
        }
    });
}

// Function to save task
function saveTask(editInput, li, taskTextNode) {
    let newTaskText = editInput.value;
    // Check for duplicates before saving
    if (isDuplicate(newTaskText)) {
        alert(`Task already exists!`);
    } else {
        taskTextNode.textContent = newTaskText;

        li.innerHTML = ``;
        li.appendChild(taskTextNode);

        let deleteSpan = document.createElement(`span`);
        deleteSpan.innerHTML = `&#x1F5D1`;
        deleteSpan.addEventListener(`click`, function () {
            li.remove();
            taskCount();
            saveData();
        });
        li.appendChild(deleteSpan);

        let editSpan = document.createElement(`span`);
        editSpan.innerHTML = `&#x270E`;
        editSpan.addEventListener(`click`, function () {
            editTask(li, taskTextNode);
        });
        li.appendChild(editSpan);

        taskCount();
        saveData();
    }
}

// Event listener for the list section to handle check and delete
listSection.addEventListener(`click`, function (e) {
    if (e.target.tagName === `LI`) {
        e.target.classList.toggle(`checked`);
        taskCount();
        saveData();
    }
});

// Function to update task count
function taskCount() {
    const taskCount = listSection.children.length;
    const completedTasks = listSection.querySelectorAll(`.checked`).length;
    taskCountLine.textContent = `You have ${taskCount - completedTasks} task(s) to complete`;
}

// Function to save data to local storage
function saveData() {
    localStorage.setItem("data", listSection.innerHTML);
}

// Function to show data from local storage
function showData() {
    listSection.innerHTML = localStorage.getItem("data") || "";
    // Re-add event listeners for edit and delete buttons after loading from storage
    const items = listSection.getElementsByTagName("li");
    for (let li of items) {
        const taskTextNode = li.childNodes[0];
        const deleteSpan = li.querySelector("span:first-of-type");
        const editSpan = li.querySelector("span:last-of-type");

        deleteSpan.addEventListener("click", function () {
            li.remove();
            taskCount();
            saveData();
        });

        editSpan.addEventListener("click", function () {
            editTask(li, taskTextNode);
        });
    }
}

showData();
taskCount();

// Event listener for the input field to add task on Enter key press
inputTask.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
