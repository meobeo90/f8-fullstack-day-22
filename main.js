const todoForm = document.querySelector(".todo-form");
const taskName = document.querySelector("#todo-input");
const tasksList = document.querySelector(".task-list");

const tasks = JSON.parse(localStorage.getItem("tasks")) ?? [];
console.log(tasks);

todoForm.onsubmit = (e) => {
  e.preventDefault();

  const newTask = {
    name: taskName.value.trim(),
    isCompleted: false,
  };

  if (!newTask.name) {
    alert("Tên công việc không được để trống!");
    return;
  }

  const existTask = tasks.find((task) => task.name === newTask.name);
  if (existTask) {
    alert(`Tên công việc "${existTask.name}" đã tồn tại!`);
    return;
  }
  tasks.unshift(newTask);

  localStorage.setItem("tasks", JSON.stringify(tasks));

  renderTasks();
  taskName.value = "";
};

function renderTasks() {
  if (!tasks.length) {
    tasksList.innerHTML = `<li class="task-item">
          <span class="task-title">Danh sách trống</span>`;
    return;
  }
  const html = tasks
    .map((task, index) => {
      return `<li class="task-item">
          <span class="task-title">${task.name}</span>
          <div class="task-action">
            <button class="task-btn edit">Sửa</button>
            <button class="task-btn done">Chưa hoàn thành</button>
            <button class="task-btn delete" onclick="deleteTask(${index})">Xóa</button>
          </div>
        </li>`;
    })
    .join("");
  tasksList.innerHTML = html;
}
renderTasks();
function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}
