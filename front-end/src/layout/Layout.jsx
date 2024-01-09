import React from 'react';
import {Link, Outlet} from "react-router-dom";

function Layout(props) {
    return (
        <>
        <header className={" bg-gray-800  content-center "}>
            <div className={"flex px-3 text-white items-center h-20 "}>
                <div className={"flex-grow"}>management school</div>
                <div>
                    <button className={"mx-2"}><Link to={"/"}>Home page</Link> </button>
                    <button className={"mx-2"}><Link to={"/login"}>Login</Link></button>
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
