import React from 'react';
import { Button } from "../ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "../ui/form.jsx";
import { Input } from "../ui/input.jsx";
"use client"

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { axiosClient } from "../../axios/axios.js";
import { useNavigate } from "react-router-dom";
import { USER_DASHBOARD_ROUTE } from "../../router/index.jsx";
import { Loader } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchCsrfToken,
    getCsrfToken,
    login,
    loginStudent,
    setStudent,
    setIsLoggedIn,
} from "../../features/User/StudentSlice.jsx";
import { StudentApi } from "../../../Services/Student/StudentApi.js";

const formSchema = z.object({
    email: z.string().email().min(2).max(50),
    password: z.string().min(8).max(30),
});

function StudentLogin(props) {
    const navigate = useNavigate();
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "soufiane@gmail.com",
            password: "hello world",
        },
    });
    const { setError } = form;
    const { isSubmitting } = form.formState;
    const dispatch = useDispatch();
    const student = useSelector(({ student }) => student);

    const onSubmit = async (values) => {
        try {
            dispatch(fetchCsrfToken())
            await dispatch(loginStudent({email:values.email, password:values.password}));
            const response = await StudentApi.getUser();
            if (response && response.status === 200 ) {
                dispatch(setStudent(response.data));
                dispatch(setIsLoggedIn(true));
                navigate(USER_DASHBOARD_ROUTE);
                form.reset(); // Reset the form
                setError("email", {}); // Reset specific field error
            } else {
                console.error("Login failed:", response);
                setError("email", {
                    message: "Login failed. Please check your credentials.",
                });
            }
        } catch (error) {
            console.error("An error occurred:", error);
            setError("email", {
                message: "An error occurred during login.",
            });
        }
    };

    return (
        <>
            <div className="w-4/5 mx-auto">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your password" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button disabled={isSubmitting} type="submit">
                            {isSubmitting && <Loader className="mx-1 animate-spin" />}
                            Login
                        </Button>
                    </form>
                </Form>
            </div>
        </>
    );
}

export default StudentLogin;
