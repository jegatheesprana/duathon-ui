

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";
import { AuthProvider } from 'context/AuthContext'
import { AdminAuthProvider } from "context/AdminAuthContext";
import { ToastProvider } from 'context/ToastContext'

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <ToastProvider>
        <AuthProvider>
          <AdminAuthProvider>
            <App />
          </AdminAuthProvider>
        </AuthProvider>
      </ToastProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
