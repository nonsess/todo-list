// import TodoItem from "./TodoItem";

// export function TodoList({ todos }) {
//     return (
//         <div className="space-y-3">
//             {todos.length > 0 ? todos.map(todo => (
//                 <TodoItem key={todo.text} todo={todo} />
//             ))
//             :
//             <p>У вас пока нет тудушек</p>
//             }
//         </div>
//     )
// }


import TodoItem from "./TodoItem";

export function TodoList({ todos }) {
    const completedCount = todos.filter(todo => todo.completed).length;
    const totalCount = todos.length;

    return (
        <div className="space-y-4">
            {/* Статистика */}
            {totalCount > 0 && (
                <div className="flex items-center justify-between px-1">
                    <p className="text-sm text-muted-foreground">
                        Выполнено: {completedCount} из {totalCount}
                    </p>
                    {completedCount === totalCount && totalCount > 0 && (
                        <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            🎉 Все задачи выполнены!
                        </span>
                    )}
                </div>
            )}

            {/* Список задач */}
            <div className="space-y-3">
                {todos.length > 0 ? (
                    todos.map((todo, index) => (
                        <TodoItem 
                            key={todo.text + index} 
                            todo={todo} 
                        />
                    ))
                ) : (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-2xl">📝</span>
                        </div>
                        <p className="text-muted-foreground">У вас пока нет задач</p>
                        <p className="text-sm text-muted-foreground mt-1">
                            Добавьте первую задачу чтобы начать
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}