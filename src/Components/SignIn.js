import React, { useState } from "react";
import { Link } from "@reach/router";

import { signInWithGoogle, auth } from "../firebase";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [showEmailForm, setShowEmailForm] = useState(false);

    const emailForm = () => {
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
        
        if (showEmailForm) {
            return (
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
                        onClick={event => {signInWithEmailAndPasswordHandler(event, email, password)}}
                    >
                        Sign In
                    </button>
                    <p>
                        Don't have an account?
                        {" "}
                        <Link to="signUp">
                            Sign Up Here
                        </Link>
                        {" "}
                        <br />{" "}
                        <Link to="passwordReset">
                            Forgot Password?
                        </Link>
                    </p>
                </form>
            );
        } else {
            return null;
        }
    };

    const signInWithEmailAndPasswordHandler = (event, email, password) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password).catch(error => {
            setError(error);
            console.error(error);
        });
    };

    const onChangeHandler = event => {
        const {name, value} = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        } else if (name === "userPassword") {
            setPassword(value);
        }
    };

    return (
        <div>
            
            <div className="ui container">
                <h1>Weight Tracker</h1>
                <p>This is an app that helps you track your weight. Please sign in to get started.</p>
                <div className="ui vertical labeled icon buttons">
                    <button
                        className="ui button"
                        onClick={event => signInWithGoogle(event)}
                    >
                        <i className="google icon"></i>
                        Sign in with Google
                    </button>
                    <button
                        className="ui button"
                        onClick={() => setShowEmailForm(true)}
                    >
                        <i className="envelope outline icon"></i>
                        Sign in with Email
                    </button>
                </div>
            </div>

            <div className="ui divider"></div>
            
            <div className="ui container">
                {emailForm()}
            </div>

        </div>
    );
};

export default SignIn;