"use client"

import { createContext, useContext, useState, useMemo, useEffect } from "react"
import AuthService from "@/services/auth.service"

export const AuthContext = createContext()

export default function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                const user = await AuthService.getCurrentUser()
                setUser(user)
            } catch {
                setUser(null)
            } finally {
                setLoading(false)
            }
        }
        
        fetchData()
    }, [])

    const login = async (username, password) => {
        try {
            await AuthService.login(username, password)
            setUser({ username })
        } catch (error) {
            throw error
        }
    }

    const register = async (username, password) => {
        try {
            await AuthService.register(username, password)
            setUser({ username })
        } catch (error) {
            throw error
        }
    }

    const getCurrentUser = async () => {
        try {
            const user = await AuthService.getCurrentUser()
            setUser(user)
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
        return user !== null
    }, [user])

    const contextValue = useMemo(() => ({
        user,
        loading,
        login,
        register,
        getCurrentUser,
        logout,
        isAuth
    }), [
        user,
        loading,
        login,
        register,
        getCurrentUser,
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