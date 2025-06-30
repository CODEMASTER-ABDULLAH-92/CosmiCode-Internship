let taskInput = document.getElementById("taskInput");
let adding = document.getElementById("adding");
let todoList = document.querySelector(".todo-list");
let count = 0;
// Load tasks from localStorage on page load
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

// Display existing tasks
taskList.forEach(task => {
  let li = document.createElement("li");
  li.innerHTML = `<span>${count+1}. ${task}</span> <button class="delete-btn">&times;</button>`;
  todoList.appendChild(li);
});

adding.addEventListener("click", () => {
  if (taskInput.value.trim() === "") {
    alert("Please Add The Task First!");
    return;
  }

  const taskValue = taskInput.value.trim();

  // Add to DOM
  let li = document.createElement("li");
  li.innerHTML = `<span>${taskValue}</span> <button class="delete-btn">&times;</button>`;
  todoList.appendChild(li);

  // Add to array and save to localStorage
  taskList.push(taskValue);
  localStorage.setItem("tasks", JSON.stringify(taskList));

  // Clear input
  taskInput.value = "";
});