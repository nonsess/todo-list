import TodoItem from "./TodoItem";

export function TodoList({ todos }) {
    return (
        <div className="space-y-3">
            {todos.length > 0 ? todos.map(todo => (
                <TodoItem key={todo.text} todo={todo} />
            ))
            :
            <p>У вас пока нет тудушек</p>
            }
        </div>
    )
}