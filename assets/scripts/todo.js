const app = document.getElementById("app");
const url = `http://localhost:3000/todos`;
const todoListElement = document.querySelector(".todo-list");
const formTodos = document.querySelector(".right-down");
const submitForm = document.getElementById("add-todo");
const inputTodo = document.getElementById("todo");
const rightElement = document.getElementById("right-up");

const getTodos = async () => {
  try {
    const response = await fetch(url);
    const todos = await response.json();
    todoListElement.innerHTML = "";
    for (let i = todos.length - 1; i >= 0; i--) {
      const todo = todos[i];
      const spanElement = document.querySelector(
        `[data-id="${todo.id}"] .todo-list-description`
      );

      const data = `<li data-id="${todo.id}" class="d-flex justify-between align-center todo-${todo.id}">
        <input type="checkbox" class="cursor-pointer">
        <span class="todo-list-description">${todo.title}</span>
        <div>
            <img src="/assets/images/misc/edit.svg" alt="">
            <img src="/assets/images/misc/delete.svg" alt="" class="cursor-pointer delete-todo">
        </div>
      </li>`;
      todoListElement.innerHTML += data;
    }
  } catch (error) {
    console.error(error);
  }
};

getTodos();

const createTodo = async () => {
  try {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        title: inputTodo.value,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response);
  } catch (error) {
    console.error(error);
  }
};

formTodos.addEventListener("submit", function (e) {
  e.preventDefault();
  if (inputTodo.value.trim()) {
    createTodo();
  } else {
    window.alert("لطفا چیزی درون تسک بنویسید و سپس دکمه ثبت را بزنید!!");
    inputTodo.value = "";
    inputTodo.focus();
  }
  console.log("submit");
});

const deleteTodo = async (id) => {
  const response = await fetch(url + `/${id}/`, {
    method: "DELETE",
  });
};

app.addEventListener("click", function (e) {
  const id = e.target.parentElement.parentElement.dataset.id;
  console.log(id);
  // delete job
  if (e.target.classList.contains("delete-todo")) {
    deleteTodo(id);
    console.log("delete request");
  }
});

window.addEventListener("resize", function () {
  getTodos();
});