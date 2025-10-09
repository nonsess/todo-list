"use client"

import { createContext, useContext, useState, useMemo } from "react"
import AuthService from "@/services/auth.service"

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const login = async (username, password) => {
        try {
            await AuthService.login(username, password)
        } catch (error) {
            throw error
        }
    }

    const register = async (username, password) => {
        try {
            await AuthService.register(username, password)
        } catch (error) {
            throw error
        }
    }

    const logout = () => {
        try {
            AuthService.logout()
            setUser(null)
        } catch (error) {
            throw error
        }
    }

    const isAuth = useMemo(() => {
        return true
    }, [user])

    const contextValue = useMemo(() => ({
        user,
        loading,
        login,
        register,
        logout,
        isAuth
    }), [
        user,
        loading,
        login,
        register,
        logout,
        isAuth
    ])

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}