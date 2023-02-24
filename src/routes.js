import React, { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";

//layouts
// import DashboardLayout from "./components/Common/Layouts/DashboardLayout";


//pages
const Dashboard = lazy(() => import("../src/pages/Login"));
const Login = lazy(() => import("../src/pages/Login"));



const Router = () => {
	let Routes = useRoutes([
		{
			path: '/',
			element: <DashboardLayout />,
			children: [
				{path: '', element: <Navigate to='dashboard' replace />},
				{path: 'dashboard', element: <Dashboard />},

				{
					path: 'clients',
					children: [
						{index:true, element: <Client />},
						{path: 'view/:clientId', element: <ViewClient />},
					]
				},
			]
		},
		{ path: "/", element: <Navigate to="dashboard" /> },
        { path: "*", element: <Navigate to="dashboard" /> },
	])
	return Routes
}

const AuthRouter = () => {
	let AuthRoutes = useRoutes([
		{path: '/login', element: <Login />},
		{ path: "/", element: <Navigate to="login" /> },
        { path: "*", element: <Navigate to="login" /> },
	])
	return AuthRoutes
}

export {
	Router,
	AuthRouter
}