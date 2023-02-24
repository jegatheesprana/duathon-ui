

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Material Dashboard 2 React Context Provider
import { MaterialUIControllerProvider } from "context";

import { ToastProvider } from 'context/ToastContext'

ReactDOM.render(
  <BrowserRouter>
    <MaterialUIControllerProvider>
      <ToastProvider>
        <App />
      </ToastProvider>
    </MaterialUIControllerProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
