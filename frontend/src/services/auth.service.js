import APIRoutes from "@/config/api.routes";

export default class AuthService {
    static ACCESS_TOKEN_KEY = "access_token"
    static REFRESH_TOKEN_KEY = "refresh_token"

    static setTokens(access_token, refresh_token) {
        localStorage.setItem(this.ACCESS_TOKEN_KEY, access_token)
        localStorage.setItem(this.REFRESH_TOKEN_KEY, refresh_token)
    }

    static deleteTokens() {
        localStorage.clear(this.ACCESS_TOKEN_KEY)
        localStorage.clear(this.REFRESH_TOKEN_KEY)
    }

    static getTokens() {
        const access_token = localStorage.getItem(this.ACCESS_TOKEN_KEY)
        const refresh_token = localStorage.getItem(this.REFRESH_TOKEN_KEY)        
        return [ access_token, refresh_token ]
    }
    
    static async register(username, password) {
        try {
            const response = await fetch(APIRoutes.auth.register, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password})
            })

            if (!response.ok) {
                const errorMessage = this.getErrorMessage(response.status)
                throw new Error(errorMessage)
            }

            const data = await response.json()
            this.setTokens(data.access_token, data.refresh_token)
        } catch (error) {
            throw error
        }
    }

    static async login(username, password) {
        try {
            const response = await fetch(APIRoutes.auth.login, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({username, password})
            })

            if (!response.ok) {
                const errorMessage = this.getErrorMessage(response.status)
                throw new Error(errorMessage)
            }

            const data = await response.json()
            this.setTokens(data.access_token, data.refresh_token)
        } catch (error) {
            throw error
        }
    }

    static async getCurrentUser() {
        const [ access_token, refresh_token ] = this.getTokens()

        try {
            const response = await fetch(APIRoutes.auth.me, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "access-token": access_token
                }
            })

            if (!response.ok) {
                const errorMessage = this.getErrorMessage(response.status)
                throw new Error(errorMessage)
            }

            const data = await response.json()
            
            return data
        } catch (error) {
            throw error
        }
    }

    static async logout() {
        this.deleteTokens()
    }

    static getErrorMessage(status) {
        const errorMessages = {
            400: "Неверный юзернейм или пароль",
            401: "Ошибка входа в аккаунт",
            429: "Некорректные данные",
            409: "Юзернейм занят",
            500: "Ошибка сервера",
            503: "Сервис временно недоступен"
        }
        return errorMessages[status] || `Ошибка: ${status}`
    }
}