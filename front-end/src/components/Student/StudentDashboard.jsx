import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {LOGIN_ROUTE, USER_DASHBOARD_ROUTE} from "../../router/index.jsx";
import {StudentApi} from "../../../Services/Student/StudentApi.js";
import {useNavigate} from "react-router-dom";
import {logout, setStudent} from "../../features/Student/StudentSlice.jsx";



function StudentDashboard(props) {
    const {data:studentData , isLoggedIn} = useSelector(({student})=>student)
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)
    const navigate = useNavigate()
    return (
            <>
            <h1 className="text-3xl text-red-700"> hello {studentData?.name} </h1>
            </>
    );
}

export default StudentDashboard;
