'use client'

import { redirect } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"

export default function ProtectedRoute({ children }) {
    const { isAuth } = useAuth()

    if (!isAuth) {
        redirect("/auth/login")
    } else {
        return children
    }
}