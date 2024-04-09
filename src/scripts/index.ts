import "../styles/todo.scss";
import { refreshTodos } from "./controller";

main();

async function main(){
    await refreshTodos();
}