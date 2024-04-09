import { Server } from "./server";
import { drawTodosHtml, getTextInputValue, setTextInputValue, updateTodosCount, submitBtnListener, isTodoChecked } from "./dom";

let editingId = 0;
let ServerObj = new Server();

export async function refreshTodos(){
    let todos = await ServerObj.getTodosFromServer();
    renderTodosHtml(todos); 
}

function renderTodosHtml(todos: any[]) {
    drawTodosHtml(todos, updateTaskStatus, handleEditClick, deleteTodo);

    let uncompletedTodos = getUncompletedTodosCount(todos);
    updateTodosCount(uncompletedTodos);
}

async function deleteTodo(todoId: number){
    await ServerObj.deleteTodoOnServer(todoId);

    await refreshTodos();
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

// 
submitBtnListener(handleSubmitClick);

function handleSubmitClick(){
    let userText = getTextInputValue();
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
    let updatedName = getTextInputValue();

    await ServerObj.editTodoNameOnServer(updatedName, editingId);

    await refreshTodos();

    setTextInputValue("");

    editingId = 0;
}

async function createTodo(){
    let todoName = getTextInputValue();
    await ServerObj.sendTodoToServer(todoName);

    await refreshTodos();
}

async function updateTaskStatus(todoId: number){
    let isChecked = isTodoChecked(todoId);

    await ServerObj.editTodoCompletionOnServer(todoId, isChecked);

    await refreshTodos();
}

async function handleEditClick(taskName: string, todoId: number){
    editingId = todoId;

    setTextInputValue(taskName);
}