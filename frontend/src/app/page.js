import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Container from "@/components/layout/Container";
import { TodoList } from "@/components/shared/TodoList";

const todos = [
    {'text': 'Постирать белье'},
    {'text': 'Покушать'},
    {'text': 'Выгулять собаку'}
]

export default function Home() {
    return (
        <ProtectedRoute>
            <Container >
                <TodoList todos={todos} />
            </Container>
        </ProtectedRoute>
    );
}
