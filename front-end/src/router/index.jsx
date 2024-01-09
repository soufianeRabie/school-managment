import {createBrowserRouter} from "react-router-dom";
import Home from "../pages/Home.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Users from "../pages/Users.jsx";
import NotFound from "../pages/NotFound.jsx";
import Layout from "../layout/Layout.jsx";
import StudentDashboardLayout from "../layout/Student/StudentDashboardLayout.jsx";
import GuestLayout from "../layout/GuestLayout.jsx";
import StudentDashboard from "../components/Student/StudentDashboard.jsx";


export const LOGIN_ROUTE = "/login"
export const USER_DASHBOARD_ROUTE = "/dashboard"
export const router = createBrowserRouter([
    {
        element:<Layout/>,
        children:[
            {
                path: "/",
                element:<Home/>
            },

            {
                path:"*",
                element:<NotFound/>
            }
        ]
    },
    {
        element : <StudentDashboardLayout/>,
        children : [
            {
                path:USER_DASHBOARD_ROUTE,
                element: <StudentDashboard/>
            },
        ]
    },
    {
        element : <GuestLayout/>,
        children  : [
            {
                path: LOGIN_ROUTE,
                element:<Login/>
            },
        ]
    }
])
