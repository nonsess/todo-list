import AuthProvider from "./AuthContext"

export default function MainProvider({ children }) {
    return (
        <AuthProvider>
            {children}
        </AuthProvider>
    )
}