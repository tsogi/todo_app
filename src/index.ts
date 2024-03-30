main();

let editingId = 0;

async function getTodosFromServer(){
    let response = await fetch("https://app-servers.io/api/todos");
    let todos = await response.json();

    return todos;
}

async function sendTodoToServer(taskName: string){
    await fetch('https://app-servers.io/api/todos/add', 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskName }),
      }
    )
}

async function main(){
    await refreshTodos();
}

async function refreshTodos(){
    let todos = await getTodosFromServer();
    renderTodosHtml(todos); 
}

function renderTodosHtml(todos: any[]) {
    const todoList = document.querySelector(".todoList");
    todoList.innerHTML = ""; // Clear existing todos

    todos.forEach(todo => {
        if (!todo.completed) {
            // Create todo item container
            const todoItem = document.createElement("div");
            todoItem.className = "todoItem";

            // Checkbox
            const todoCheckbox = document.createElement("div");
            todoCheckbox.className = "todoCheckbox";
            const input = document.createElement("input");
            input.type = "checkbox";
            input.checked = todo.completed;
            input.dataset.todoid = todo.id;
            // Add event listener for checkbox
            input.addEventListener("click", () => updateTaskStatus(todo.id));
            todoCheckbox.appendChild(input);

            // Todo name
            const todoName = document.createElement("div");
            todoName.className = "todoName";
            todoName.textContent = todo.task;

            // Actions container
            const actions = document.createElement("div");
            actions.className = "actions";

            // Edit button
            const btnEdit = document.createElement("span");
            btnEdit.className = "btnEdit";
            btnEdit.textContent = "Edit";
            // Add event listener for edit button
            btnEdit.addEventListener("click", () => handleEditClick(todo.task, todo.id));

            // Delete button
            const btnDelete = document.createElement("span");
            btnDelete.className = "btnDelete";
            btnDelete.textContent = "Delete";
            // Add event listener for delete button
            btnDelete.addEventListener("click", () => deleteTodo(todo.id));

            // Append children
            actions.appendChild(btnEdit);
            actions.appendChild(btnDelete);

            todoItem.appendChild(todoCheckbox);
            todoItem.appendChild(todoName);
            todoItem.appendChild(actions);

            // Add the todo item to the list
            todoList.appendChild(todoItem);
        }
    });

    let uncompletedTodos = getUncompletedTodosCount(todos);
    updateTodosCount(uncompletedTodos);
}

function getUncompletedTodosCount(todos: any[]){
    let count = 0;

    for(let iteration = 0; iteration < todos.length; iteration++) {
        if(!todos[iteration].completed) {
            count++;
        }
    }

    return count;
}

document.querySelector(".submitBtn").addEventListener("click", handleSubmitClick);

function handleSubmitClick(){
    let userText = (document.querySelector(".textInput") as HTMLInputElement).value;
    if(userText.length < 5 || userText.length > 30) {
        alert("Task name should be between 5 and 30 letters");
        return;
    }

    if(editingId !== 0) {
        editTodo();
    } else {
        createTodo();
    }
}

async function editTodo(){
    let updatedName = (document.querySelector(".textInput") as HTMLInputElement).value;

    await fetch(`https://app-servers.io/api/todos/edit/${editingId}`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: updatedName }), 
        }
    )

    await refreshTodos();

    (document.querySelector(".textInput") as HTMLInputElement).value = "";

    editingId = 0;
}

async function createTodo(){
    let todoName = (document.querySelector(".textInput") as HTMLInputElement).value;
    await sendTodoToServer(todoName);

    await refreshTodos();
}

async function updateTaskStatus(todoId: number){
    let isChecked = (document.querySelector(`[data-todoid="${todoId}"]`) as HTMLInputElement).checked;

    await fetch(`https://app-servers.io/api/todos/edit/${todoId}`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: isChecked }),
        }
    )

    await refreshTodos();
}

async function deleteTodo(todoId: number){
    await fetch(`https://app-servers.io/api/todos/delete/${todoId}`, 
        {
            method: 'POST',
        }
    )

    await refreshTodos();
}

async function handleEditClick(taskName: string, todoId: number){
    editingId = todoId;

    (document.querySelector(".textInput") as HTMLInputElement).value = taskName;
}

function updateTodosCount(todoCount: any){
    document.querySelector(".todosCount").innerHTML = todoCount;
}