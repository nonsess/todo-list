import Container from "@/components/layout/Container";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PasswordInput } from "@/components/ui/PasswordInput";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Login() {
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
                            <form className="space-y-4">
                                {/* Поле username */}
                                <div className="space-y-2">
                                    <Label htmlFor="username" className="text-sm font-medium">
                                        Имя пользователя
                                    </Label>
                                    <Input
                                        id="username"
                                        placeholder="Введите ваш юзернейм"
                                    />
                                </div>

                                {/* Поле пароля */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium">
                                        Пароль
                                    </Label>
                                    <PasswordInput
                                        id="password"
                                        placeholder="Введите ваш пароль"
                                    />
                                </div>

                                {/* Кнопка входа */}
                                <Button 
                                    type="submit" 
                                    className="w-full"
                                >
                                    Войти
                                </Button>
                            </form>

                            {/* Разделитель */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="bg-white px-2 text-gray-500">или</span>
                                </div>
                            </div>

                            {/* Ссылка на регистрацию */}
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