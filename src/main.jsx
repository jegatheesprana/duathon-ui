import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "./context"
import { AuthProvider } from "./context/AuthContext"
import { ToastProvider } from "./context/ToastContext"

ReactDOM.createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <MaterialUIControllerProvider>
            <ToastProvider>
                <AuthProvider>
                    <App />
                </AuthProvider>
            </ToastProvider>
        </MaterialUIControllerProvider>
    </BrowserRouter>
)
