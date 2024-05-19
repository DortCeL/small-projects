document.addEventListener("DOMContentLoaded", loadTodos);

const box = document.getElementById("box");
const todoInput = document.getElementById("inputBox");
const addTodoBtn = document.querySelector("#addTodoBtn");
const clearAllBtn = document.querySelector("#clearAllBtn");
const todoList = document.getElementById("list");

addTodoBtn.addEventListener("click", addTodo);
todoInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") addTodo();
});
clearAllBtn.addEventListener("click", clearTodo);

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((todoText) => {
    addTodoElement(todoText);
  });
}

function saveTodos() {
  const todos = [];
  document.querySelectorAll("#list li span").forEach((span) => {
    todos.push(span.textContent);
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodo() {
  let todoText = todoInput.value.trim();
  todoText = todoText.charAt(0).toUpperCase() + todoText.slice(1);

  if (todoText !== "") {
    addTodoElement(todoText);
    saveTodos();
    todoInput.value = "";
  }
}

function addTodoElement(todoText) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = todoText;

  const buttonsDiv = createButtonsDiv();

  li.addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") {
      e.target.classList.toggle("done");
    }
  });

  li.appendChild(span);
  li.appendChild(buttonsDiv);
  todoList.appendChild(li);
}

function clearTodo() {
  while (todoList.firstChild) {
    todoList.removeChild(todoList.firstChild);
  }
  localStorage.removeItem("todos");
}

function createButtonsDiv() {
  const buttonsDiv = document.createElement("div");
  buttonsDiv.classList.add("buttons");

  const editButton = document.createElement("button");
  editButton.classList.add("link-button");
  editButton.textContent = "✍";
  editButton.addEventListener("click", editTodo);
  buttonsDiv.appendChild(editButton);

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("link-button");
  deleteButton.textContent = "❌";
  deleteButton.addEventListener("click", deleteTodo);
  buttonsDiv.appendChild(deleteButton);

  return buttonsDiv;
}

function editTodo() {
  const li = this.parentElement.parentElement;
  const span = li.querySelector("span");
  const currentText = span.textContent;

  const input = document.createElement("input");
  input.classList.add("editBox");
  input.type = "text";
  input.value = currentText;

  li.replaceChild(input, span);

  input.focus();
  input.select();

  input.addEventListener("blur", () => saveChanges(input, li));
  input.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
      saveChanges(input, li);
    }
  });
}

function saveChanges(input, li) {
  let newText = input.value.trim();
  newText = newText.charAt(0).toUpperCase() + newText.slice(1);

  if (newText !== "") {
    const span = document.createElement("span");
    span.textContent = newText;

    li.addEventListener("click", (e) => {
      if (e.target.tagName !== "BUTTON") {
        e.target.classList.toggle("done");
      }
    });

    const buttonsDiv = createButtonsDiv();

    li.innerHTML = "";
    li.appendChild(span);
    li.appendChild(buttonsDiv);
    saveTodos();
  }
}

function deleteTodo() {
  this.parentElement.parentElement.remove();
  saveTodos();
}
