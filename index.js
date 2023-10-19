let input = document.getElementById("taskInput");
let tasks = document.getElementById("taskList");

loadTasksFromLs();

function addTask() {
  if (input.value == "") {
    alert("Please enter a Task");
  } else {
    let newElement = document.createElement("li");
    newElement.innerHTML = `${input.value}`;
    tasks.appendChild(newElement);
    input.value = "";

    let delButton = document.createElement("button");
    delButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
    delButton.classList.add("delete-button");
    newElement.appendChild(delButton);

    let editButton = document.createElement("button");
    editButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
    editButton.classList.add("edit-button");
    newElement.appendChild(editButton);

    saveTasktoLocalStorage();

    delButton.addEventListener("click", function () {
      tasks.removeChild(newElement);
      saveTasktoLocalStorage();
    });

    editButton.addEventListener("click", function () {
      newElement.classList.toggle("completed");
      saveTasktoLocalStorage();
    });
  }
}
function saveTasktoLocalStorage() {
  localStorage.setItem("tasks", tasks.innerHTML);
}

function loadTasksFromLs() {
  const savedTasks = localStorage.getItem("tasks");
  if (savedTasks) {
    tasks.innerHTML = savedTasks;

    const deleteButtons = document.querySelectorAll(".delete-button");
    const editButtons = document.querySelectorAll(".edit-button");

    for (let i = 0; i < deleteButtons.length; i++) {
      deleteButtons[i].addEventListener("click", function () {
        const listItem = deleteButtons[i].parentElement;
        tasks.removeChild(listItem);
        saveTasktoLocalStorage();
      });
    }

    for (let i = 0; i < editButtons.length; i++) {
      editButtons[i].addEventListener("click", function () {
        const listItem = editButtons[i].parentElement;
        listItem.classList.toggle("completed");
        saveTasktoLocalStorage();
      });
    }
  }
}
