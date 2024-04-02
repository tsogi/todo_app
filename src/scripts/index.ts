import "../styles/todo.scss";
import { refreshTodos } from "./todo";

main();

async function main(){
    await refreshTodos();
}