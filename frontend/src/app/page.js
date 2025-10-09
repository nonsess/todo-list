'use client'

import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Container from "@/components/layout/Container";
import { TodoList } from "@/components/shared/TodoList";
import { useAuth } from "@/contexts/AuthContext";
import { Calendar, Sparkles } from "lucide-react";

const initialTodos = [
    {'text': 'Постирать белье', completed: false},
    {'text': 'Покушать', completed: true},
    {'text': 'Выгулять собаку', completed: false}
]

export default function Home() {
    const { user, loading } = useAuth()

    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 6) return 'Доброй ночи';
        if (hour < 12) return 'Доброе утро';
        if (hour < 18) return 'Добрый день';
        return 'Добрый вечер';
    };

    return (
        <ProtectedRoute>
            <Container className="py-8">
                {!loading && (
                    <div className="mb-8">
                        <div className="flex items-center gap-3 mb-2">
                            <Sparkles className="h-6 w-6 text-yellow-500" />
                            <h1 className="font-bold text-3xl">
                                {getGreeting()}, {user?.username}!
                            </h1>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                            <Calendar className="h-4 w-4" />
                            <p className="text-sm">
                                {new Date().toLocaleDateString('ru-RU', { 
                                    weekday: 'long', 
                                    year: 'numeric', 
                                    month: 'long', 
                                    day: 'numeric' 
                                })}
                            </p>
                        </div>
                    </div>
                )}
                
                <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Мои задачи</h2>
                    <TodoList todos={initialTodos} />
                </div>
            </Container>
        </ProtectedRoute>
    );
}