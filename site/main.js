const inputTodo = document.querySelector(".input-todo input");
const inputButton = document.querySelector(".input-todo button");
const listItem = document.querySelector(".todoList");
const filterTodo = document.querySelector(".filter-todo");
//events
document.addEventListener("DOMContentLoaded", getTodo);
inputButton.addEventListener("click", addItem);
listItem.addEventListener("click", deleteComp);
filterTodo.addEventListener("click", filter);
//function
function addItem(e) {
  e.preventDefault();
  //Add item
  const item = document.createElement("li");
  item.classList.add("item");
  let spanValue = inputTodo.value;
  saveData(spanValue);
  item.innerHTML = `<span>${spanValue}</span> <button class="completed"><i class="fas fa-check"></i></button><button class="delete"><i
  class="fas fa-trash"></i></button>`;
  listItem.appendChild(item);

  //delete the value from the input
  inputTodo.value = "";
}

function deleteComp(e) {
  const elementClicked = e.target;
  if (elementClicked.classList[0] == "delete") {
    const todo = elementClicked.parentElement;
    removeLocalStorage(todo);
    todo.classList.add("transitionList");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  } else if (elementClicked.classList[0] == "completed") {
    const todo = elementClicked.parentElement;
    todo.classList.toggle("transparent");
  }
}
function filter(e) {
  const value = e.target.value;
  const classBtn = document.querySelectorAll(".item");
  classBtn.forEach(function (item) {
    switch (value) {
      case "all":
        item.style.display = "flex";
        break;
      case "completed":
        if (item.classList.contains("transparent")) {
          item.style.display = "flex";
        } else {
          item.style.display = "none";
        }
        break;
      case "uncompleted":
        if (item.classList.contains("transparent")) {
          item.style.display = "none";
        } else {
          item.style.display = "flex";
        }
        break;
    }
  });
}
function saveData(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function getTodo() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  //Add todos item
  todos.forEach(function (todo) {
    const item = document.createElement("li");
    item.classList.add("item");
    let spanValue = todo;
    item.innerHTML = `<span>${spanValue}</span> <button class="completed"><i class="fas fa-check"></i></button><button class="delete"><i
  class="fas fa-trash"></i></button>`;
    listItem.appendChild(item);
  });
}
function removeLocalStorage(item) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const text = item.children[0].innerText;
  todos.splice(todos.indexOf(text), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
