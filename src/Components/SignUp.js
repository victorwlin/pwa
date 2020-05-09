import React, { useState } from "react";
import { Link } from "@reach/router";

import { auth, signInWithGoogle } from "../firebase";

const SignUp = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const createUserWithEmailAndPasswordHandler = async (event, email, password) => {
        event.preventDefault();

        try{
            await auth.createUserWithEmailAndPassword(email, password);
        }
        catch(error){
            setError(error);
        }

        setEmail("");
        setPassword("");
    };

    const errorMessage = () => {
        if (error) {
            return (
                <div className="ui message red">
                    <div className="header">Error</div>
                    {error.message}
                </div>
            );
        } else {
            return null;
        }
    };

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;
        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        }
    };

    return (
        <div className="ui container">
            <h1>Sign Up</h1>
            <form className="ui form">
                <div className="field">
                    <label>Email</label>
                    <input
                        type="email"
                        name="userEmail"
                        value={email}
                        onChange={event => onChangeHandler(event)}
                    />
                </div>
                <div className="field">
                    <label>Password</label>
                    <input
                        type="password"
                        name="userPassword"
                        value={password}
                        onChange={event => onChangeHandler(event)}
                    />
                </div>

                {errorMessage()}

                <button
                    className="ui button"
                    onClick={event => {createUserWithEmailAndPasswordHandler(event, email, password)}}
                >
                    Sign Up
                </button>
                <p>or</p>
                <button
                    className="ui labeled icon button"
                    onClick={signInWithGoogle}
                >
                    <i className="google icon"></i>
                    Sign in with Google
                </button>
                <p>
                    Already have an account?
                    {" "}
                    <Link to="/">
                        Sign In Here
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default SignUp;