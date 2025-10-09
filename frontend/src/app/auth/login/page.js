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
import { nabla } from "@/components/layout/Header";

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
            <div className=" flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-md">
                    {/* Логотип над карточкой */}
                    <div className="text-center mb-6">
                        <p className={`${nabla.className} text-5xl mb-2`}>
                            TODOLIST
                        </p>
                        <p className="text-muted-foreground text-sm">
                            Управляйте своими задачами эффективно
                        </p>
                    </div>

                    <Card className="shadow-2xl border-0 bg-background/95 backdrop-blur-sm">
                        <CardHeader className="space-y-1 text-center pb-4">
                            <div className="mx-auto w-12 h-1 bg-gradient-to-r from-white to-yellow-500 rounded-full mb-4"></div>
                            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text text-transparent">
                                Вход в аккаунт
                            </CardTitle>
                            <CardDescription className="text-base">
                                Введите свои данные для входа в систему
                            </CardDescription>
                        </CardHeader>
                        
                        <CardContent className="space-y-6">
                            {/* Блок ошибки */}
                            {errorMessage && (
                                <Alert variant="destructive" className="animate-in fade-in-0 slide-in-from-top-5 duration-300 border-l-4 border-l-destructive">
                                    <AlertDescription className="flex items-center">
                                        <div className="flex-1">
                                            {errorMessage}
                                        </div>
                                    </AlertDescription>
                                </Alert>
                            )}

                            <form className="space-y-5" onSubmit={handleSubmit}>
                                <div className="space-y-3">
                                    <Label htmlFor="username" className="text-sm font-semibold">
                                        Имя пользователя
                                    </Label>
                                    <Input
                                        id="username"
                                        placeholder="Введите ваш юзернейм"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className={`h-12 transition-all duration-200 ${
                                            errorMessage 
                                                ? "border-destructive focus-visible:ring-destructive" 
                                                : "border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        }`}
                                    />
                                </div>

                                <div className="space-y-3">
                                    <Label htmlFor="password" className="text-sm font-semibold">
                                        Пароль
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        placeholder="Введите ваш пароль"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        inputClassName={`h-12 transition-all duration-200 ${
                                            errorMessage 
                                                ? "border-destructive focus-visible:ring-destructive" 
                                                : "border-input focus:border-primary focus:ring-2 focus:ring-primary/20"
                                        }`}
                                    />
                                </div>

                                <Button 
                                    type="submit" 
                                    className="w-full h-12 text-base font-semibold bg-gradient-to-r bg-primary transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02]"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-5 h-5 border-2 border-background border-t-transparent rounded-full animate-spin" />
                                            <span>Вход...</span>
                                        </div>
                                    ) : (
                                        "Войти в аккаунт"
                                    )}
                                </Button>
                            </form>

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-border/50" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-background px-3 text-muted-foreground">Нет аккаунта?</span>
                                </div>
                            </div>

                            <div className="text-center">
                                <Button 
                                    variant="outline" 
                                    className="w-full h-11 border-2 border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-colors"
                                    asChild
                                >
                                    <Link href="/auth/register">
                                        <span className="text-primary/20 font-semibold">
                                            Создать новый аккаунт
                                        </span>
                                    </Link>
                                </Button>
                            </div>

                            <div className="text-center pt-4 border-t border-border/30">
                                <p className="text-xs text-muted-foreground">
                                    Входя в систему, вы соглашаетесь с нашими<br />
                                    <Link href="/terms" className="text-primary hover:underline">условиями использования</Link>
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Container>
    );
}