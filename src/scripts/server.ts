let apiUrl = "https://app-servers.io/api/todos";

export async function getTodosFromServer(){
    let response = await fetch(apiUrl);
    let todos = await response.json();

    return todos;
}

export async function sendTodoToServer(taskName: string){
    await fetch(`${apiUrl}/add`, 
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskName }),
      }
    )
}

export async function deleteTodoOnServer(todoId: number){
    await fetch(`${apiUrl}/delete/${todoId}`, 
        {
            method: 'POST',
        }
    )
}

export async function editTodoNameOnServer(updatedName: string, editingId: number){
    await fetch(`${apiUrl}/edit/${editingId}`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: updatedName }), 
        }
    )
}

export async function editTodoCompletionOnServer(todoId: number, isChecked: boolean){
    await fetch(`${apiUrl}/edit/${todoId}`, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: isChecked }),
        }
    )
}