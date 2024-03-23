main();

let editingId = 0;

async function getTodosFromServer(){
    let response = await fetch("https://app-servers.io/api/todos");
    let todos = await response.json();

    return todos;
}

async function sendTodoToServer(taskName){
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

function renderTodosHtml(todos){
    let html = "";
    for(let i = 0; i<todos.length; i++){
        if(!todos[i].completed) {
            html += `
            <div class="todoItem">
                <div class="todoCheckbox">
                    <input ${ todos[i].completed ? "checked" : "" } onclick='updateTaskStatus(${todos[i].id})' data-todoid="${todos[i].id}" type="checkbox" />
                </div>
                <div class="todoName">${todos[i].task}</div>
                <div class="actions">
                    <span class="btnEdit" onclick='handleEditClick("${todos[i].task}", ${todos[i].id})'>Edit</span>
                    <span class="btnDelete" onclick='deleteTodo(${todos[i].id})'>Delete</span>
                </div>
            </div> 
            `
        }
    }

    let uncompletedTodos = getUncompletedTodosCount(todos);

    updateTodosCount(uncompletedTodos);

    document.querySelector(".todoList").innerHTML = html;
}

function getUncompletedTodosCount(todos){
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
    let userText = document.querySelector(".textInput").value;
    if(userText.length < 5 || userText > 30) {
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
    let updatedName = document.querySelector(".textInput").value;

    await fetch(`https://app-servers.io/api/todos/edit/${editingId}`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: updatedName }), 
        }
    )

    await refreshTodos();

    document.querySelector(".textInput").value = "";

    editingId = 0;
}

async function createTodo(){
    let todoName = document.querySelector(".textInput").value;
    await sendTodoToServer(todoName);

    await refreshTodos();
}

async function updateTaskStatus(todoId){
    let isChecked = document.querySelector(`[data-todoid="${todoId}"]`).checked;

    await fetch(`https://app-servers.io/api/todos/edit/${todoId}`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: isChecked }),
        }
    )

    await refreshTodos();
}

async function deleteTodo(todoId){
    await fetch(`https://app-servers.io/api/todos/delete/${todoId}`, 
        {
            method: 'POST',
        }
    )

    await refreshTodos();
}

async function handleEditClick(taskName, todoId){
    editingId = todoId;

    document.querySelector(".textInput").value = taskName;
}

function updateTodosCount(todoCount){
    document.querySelector(".todosCount").innerHTML = todoCount;
}