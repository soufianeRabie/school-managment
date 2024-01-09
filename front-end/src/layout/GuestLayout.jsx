import React, {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE, USER_DASHBOARD_ROUTE} from "../router/index.jsx";
import {useSelector} from "react-redux";

function Layout(props) {

    const navigate = useNavigate();
    const {data:studentData , isLoggedIn} = useSelector(({student})=>student)
    // const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if(isLoggedIn)
        {
            navigate(USER_DASHBOARD_ROUTE)
            // setIsLoading(false)
        }


    }, []);


    return (
        <>
        <header className={" bg-gray-800  content-center "}>
            <div className={"flex px-3 text-white items-center h-20 "}>
                <div className={"flex-grow"}>management school</div>
                <div>
                    <button className={"mx-2"}><Link to={"/"}>Home page</Link> </button>
                    <button className={"mx-2"}><Link to={LOGIN_ROUTE}>Login</Link></button>
                    <button className={"mx-2 border-sky-100 p-2 bg-white text-black rounded-xl hover:bg-blue-50"}>Dark mode  </button>
                </div>
            </div>
        </header>
            <main>
                <Outlet/>
            </main>

            <footer>
                <p> &copy bby soufiane rabya 2023</p>
            </footer>


        </>
    );
}

export default Layout;
