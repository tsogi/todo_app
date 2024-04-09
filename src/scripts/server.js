export class Server{
    name = "Api server for todo app";
    apiUrl = "https://app-servers.io/api/todos";

    async getTodosFromServer(){
        let response = await fetch(this.apiUrl);
        let todos = await response.json();
    
        return todos;
    }
    
    async sendTodoToServer(taskName){
        await fetch(`${this.apiUrl}/add`, 
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task: taskName }),
          }
        )
    }
    
    async deleteTodoOnServer(todoId){
        await fetch(`${this.apiUrl}/delete/${todoId}`, 
            {
                method: 'POST',
            }
        )
    }
    
    async editTodoNameOnServer(updatedName, editingId){
        await fetch(`${this.apiUrl}/edit/${editingId}`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ task: updatedName }), 
            }
        )
    }
    
    async editTodoCompletionOnServer(todoId, isChecked){
        await fetch(`${this.apiUrl}/edit/${todoId}`, 
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ completed: isChecked }),
            }
        )
    }
}