window.addEventListener("load", () => {
    todos = JSON.parse(localStorage.getItem("todos")) || [];
    const nameInput = document.querySelector("#name");
    const newTodoForm = document.querySelector("#new-todo-form");

    const username = localStorage.getItem("username") || "";

    nameInput.value = username;

    nameInput.addEventListener("change", (e) => {
        localStorage.setItem("username", e.target.value);
    });

    newTodoForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const todo = {
            content: e.target.elements.content.value,
            category: e.target.elements.category.value,
            done: false,
            createdAt: new Date().getTime(),
        };
        todos.push(todo);

        localStorage.setItem("todos", JSON.stringify(todos));

        e.target.reset();

        displayTodos();
    });

    displayTodos();
});

function displayTodos() {
    const todoList = document.querySelector("#todo-list");

    todoList.innerHTML = "";

    todos
        .sort((a, b) => b.createdAt - a.createdAt)
        .forEach((todo) => {
            const todoItem = document.createElement("div");
            todoItem.classList.add("todo-item");

            const label = document.createElement("label");
            const input = document.createElement("input");
            const span = document.createElement("span");
            const content = document.createElement("div");
            const actions = document.createElement("div");
            const editBtn = document.createElement("button");
            const deleteBtn = document.createElement("button");

            input.type = "checkbox";
            input.checked = todo.done;
            span.classList.add("bubble");

            if (todo.category == "personal") {
                span.classList.add("personal");
                todoItem.style.backgroundColor = "rgba(58, 130, 238, 0.2)";
            } else {
                span.classList.add("business");
                todoItem.style.backgroundColor = "rgba(241, 38, 72, 0.2)";
            }

            content.classList.add("todo-content");
            actions.classList.add("actions");
            editBtn.classList.add("edit");
            deleteBtn.classList.add("delete");

            content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;
            editBtn.innerHTML = "Edit";
            deleteBtn.innerHTML = "Delete";

            label.appendChild(input);
            label.appendChild(span);
            actions.appendChild(editBtn);
            actions.appendChild(deleteBtn);
            todoItem.appendChild(label);
            todoItem.appendChild(content);
            todoItem.appendChild(actions);

            todoList.appendChild(todoItem);

            if (todo.done) {
                todoItem.classList.add("done");
                todoItem.style.opacity = "0.6";
                todoItem.style.backgroundColor = "rgb(180, 175, 175, 0.3)";
            }
            input.addEventListener("click", (e) => {
                todo.done = e.target.checked;
                localStorage.setItem("todos", JSON.stringify(todos));

                if (todo.done) {
                    todoItem.classList.add("done");
                } else {
                    todoItem.classList.remove("done");
                }

                displayTodos();
            });
            editBtn.addEventListener("click", (e) => {
                const input = content.querySelector("input");
                input.removeAttribute("readonly");
                editBtn.innerHTML = "Save";
                input.focus();
                input.addEventListener("blur", (e) => {
                    input.setAttribute("readonly", true);
                    todo.content = e.target.value;
                    localStorage.setItem("todos", JSON.stringify(todos));
                    displayTodos();
                });
            });

            deleteBtn.addEventListener("click", (e) => {
                todos = todos.filter((t) => t !== todo);
                localStorage.setItem("todos", JSON.stringify(todos));
                displayTodos();
            });
        });
}
