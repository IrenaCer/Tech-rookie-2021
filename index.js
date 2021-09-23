const taskForm = document.getElementById("taskForm");

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

const readStorage = () => {
  const taskListStateJSON = localStorage.getItem("taskListState");
  return taskListStateJSON !== null ? JSON.parse(taskListStateJSON) : {};
};

const updateStorage = () => {
  localStorage.setItem("taskListState", JSON.stringify({ tasks, ids }));
};

const taskListState = readStorage();
const tasks = taskListState.tasks || {};
let ids = taskListState.ids || [];

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const id = (+new Date()).toString();
  ids.push(id);
  tasks[id] = { completed: false, value: taskInput.value };
  taskInput.value = "";

  updateStorage();

  render();
});

const render = () => {
  taskList.innerHTML = "";

  ids.forEach((id) => {
    const task = tasks[id];
    const newTask = document.createElement("div");

    newTask.innerHTML = `
        <input data-status-id="${id}" type="checkbox" ${
      task.completed ? "checked" : ""
    }/>
        <span class="text"></span>
        <button data-remove-id="${id}">Remove</button>
    `;

    newTask.getElementsByClassName("text")[0].innerText = task.value;

    taskList.appendChild(newTask);
  });
};

render();

document.addEventListener("change", (e) => {
  const id = e.target.getAttribute("data-status-id");
  if (id) {
    tasks[id].completed = !tasks[id].completed;

    updateStorage();
    render();
  }
});

document.addEventListener("click", (e) => {
  const id = e.target.getAttribute("data-remove-id");
  if (id) {
    delete tasks[id];
    ids = ids.filter((cur) => cur !== id);

    updateStorage();
    render();
  }
});
