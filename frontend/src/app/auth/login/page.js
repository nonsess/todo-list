'use client'

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

import { useAuth } from "@/contexts/AuthContext";
import Container from "@/components/layout/Container";

export default function Login() {
    const { login } = useAuth()
    const router = useRouter()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setIsLoading(true)
        setErrorMessage("")
        
        try {
            await login(username, password)
            router.push("/")
        } catch (error) {
            setUsername('')
            setPassword('')
            setErrorMessage(error.message || "Произошла ошибка при входе")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Container>
            <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    <Card className="shadow-xl border-0">
                        <CardHeader className="space-y-1 text-center">
                            <CardTitle className="text-2xl font-bold">Вход в аккаунт</CardTitle>
                            <CardDescription>
                                Введите свои данные для входа в систему
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {/* Блок ошибки */}
                            {errorMessage && (
                                <Alert variant="destructive" className="animate-in fade-in-0 duration-300">
                                    <AlertDescription>
                                        {errorMessage}
                                    </AlertDescription>
                                </Alert>
                            )}

                            <form className="space-y-4" onSubmit={handleSubmit}>
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-sm font-medium">
                                        Имя пользователя
                                    </Label>
                                    <Input
                                        id="username"
                                        placeholder="Введите ваш юзернейм"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className={errorMessage && "border-destructive focus-visible:ring-destructive"}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        Пароль
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        placeholder="Введите ваш пароль"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        errorClassName={errorMessage && "border-destructive focus-visible:ring-destructive"}
                                    />
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-background border-t-transparent" />
                                            Вход...
                                        </>
                                    ) : (
                                        "Войти"
                                    )}
                                </Button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">или</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <p className="text-sm text-gray-600">
                                    Нет аккаунта?{" "}
                                    <Link 
                                        href="/auth/register" 
                                        className="font-semibold text-primary underline-offset-4 hover:underline"
                                    >
                                        Зарегистрироваться
                                    </Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>
    );
}