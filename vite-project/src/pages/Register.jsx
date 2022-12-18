import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider.jsx";

export default function Register() {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const [loading, setLoading] = useState(false);

    const { setToken, setUser } = useStateContext();

    const onSubmit = (e) => {
        setLoading(true);
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                setLoading(false);
                setUser(data.user);
                setToken(data.token);
            })
            .catch((error) => {
                setLoading(false);
                const response = error.response;
                if (response && response.status === 422) {
                    console.log(response.data.errors);
                }
            });
    };
    return (
        <>
            {" "}
            <h1 className="title">Sign up for free</h1>
            <form onSubmit={onSubmit}>
                <input ref={nameRef} type="text" placeholder="Full Name" />
                <input
                    ref={emailRef}
                    type="email"
                    placeholder="Email Address"
                />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                />
                <input
                    ref={passwordConfirmationRef}
                    type="password"
                    placeholder="Repeat Password"
                />
                <button className="btn btn-block">
                    {loading ? "Please wait..." : "Sign up"}
                </button>
                <p className="message">
                    Already Registered? <Link to="/login">Sign in</Link>
                </p>
            </form>
        </>
    );
}
