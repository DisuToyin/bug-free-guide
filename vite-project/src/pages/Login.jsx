import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    const onSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <form onSubmit={onSubmit}>
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <button className="btn btn-block">Login</button>
            <p className="message">
                Not Registered? <Link to="/register">Create an account</Link>
            </p>
        </form>
    );
}
