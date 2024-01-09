import React, {useEffect, useState} from 'react';
import {Link, Outlet, useNavigate} from "react-router-dom";
import {LOGIN_ROUTE} from "../../router/index.jsx";
import {useDispatch, useSelector} from "react-redux";
import {DropdownMenuDemo} from "./studentDropDownMenu.jsx";
import {ModeToggle} from "../../components/mode-toggle.jsx";
import {Sidebar} from "./Administrations/StudentAdministrationSideBar.jsx";
import {logout, setIsLoggedIn, setStudent} from "../../features/User/StudentSlice.jsx";
import {StudentApi} from "../../../Services/Student/StudentApi.js";

function Layout(props) {

    const {data , isLoggedIn} = useSelector(({student})=>student)
    console.log(data , isLoggedIn)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()

    useEffect( () => {
        console.log(isLoggedIn)
        if(isLoggedIn === true)
        {
            StudentApi.getUser().then(({data})=>{
                setIsLoading(false)
                dispatch(setStudent(data))
                dispatch(setIsLoggedIn(true))
            }).catch(reason=>{
                dispatch(logout())
                 navigate(LOGIN_ROUTE)

            })
        }else{
            dispatch(logout())
            navigate(LOGIN_ROUTE)
        }

    }, [isLoggedIn]);

    if(isLoading){
        return <></>
    }

    return (
        <>
        <header className={" bg-gray-800  content-center "}>
            <div className={"flex px-3 text-white items-center h-20 "}>
                <div className={"flex-grow"}>management school</div>
                <div className="flex  align-middle justify-around w-1/5">
                    <button className={"mx-2"}><Link to={"/"}>Home page</Link> </button>
                        <DropdownMenuDemo/>
                   <ModeToggle/>
                </div>
            </div>
        </header>
            <main>
                <div className="container mx-auto">
                    <div className={'flex'}>
                        <div className="md:w-1/4"><Sidebar/></div>
                        <div className="md:w-3/4"><Outlet/></div>
                    </div>
                </div>

            </main>

            <footer>
                <p> &copy bby soufiane rabya 2023</p>
            </footer>


        </>
    );
}

export default Layout;
