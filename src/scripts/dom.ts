export function drawTodosHtml(todos: any[], updateTaskStatus: Function, handleEditClick: Function, deleteTodo: Function){
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
}

export function getTextInputValue(){
    return (document.querySelector(".textInput") as HTMLInputElement).value;
}

export function setTextInputValue(value: string){
    (document.querySelector(".textInput") as HTMLInputElement).value =  value;
}

export function updateTodosCount(todoCount: any){
    document.querySelector(".todosCount").innerHTML = todoCount;
}

export function submitBtnListener(handleSubmitClick: Function){
    // @ts-ignore
    document.querySelector(".submitBtn").addEventListener("click", handleSubmitClick);
}

export function isTodoChecked(todoId: number){
    return (document.querySelector(`[data-todoid="${todoId}"]`) as HTMLInputElement).checked;
}