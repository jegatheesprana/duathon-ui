import React, { Suspense, useEffect } from "react";
import {  CircularProgress, Backdrop } from "@mui/material";
import reactLogo from './assets/react.svg'
import './App.css'
import { BrowserRouter } from "react-router-dom";
import {AuthRouter, Router} from "./routes";

const loading = (
	<Backdrop open={true}>
		<CircularProgress color="primary" size={60} />
	</Backdrop>
)

function App() {
  const isAuthenticated = false
  const ChooseRouter = () => {
		console.log(isAuthenticated)
		return isAuthenticated ? <Router/> : <AuthRouter />
	}

  return (
    <BrowserRouter>
      <div >
        <Suspense fallback={loading} >
          {isAuthenticated&&<NavBar user={{ displayName: "Steve" }} />}
        </Suspense>
        <Suspense fallback={loading} >
          {ChooseRouter()}
        </Suspense>
      </div>
    </BrowserRouter>
  )
}

export default App
