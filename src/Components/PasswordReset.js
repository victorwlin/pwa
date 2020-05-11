import React, { useState } from "react";
import { Link } from "@reach/router";

import { auth } from "../firebase";

const PasswordReset = () => {
    const [email, setEmail] = useState("");
    const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
    const [error, setError] = useState(null);

    const onChangeHandler = event => {
        const { name, value } = event.currentTarget;

        if (name === "userEmail") {
            setEmail(value);
        }
    };

    const sendResetEmail = event => {
        event.preventDefault();

        auth
            .sendPasswordResetEmail(email)
            .then(() => {
                setEmailHasBeenSent(true);
                setTimeout(() => {setEmailHasBeenSent(false)}, 3000);
            })
            .catch(error => {setError(error)});
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

    const emailSentMessage = () => {
        if (emailHasBeenSent) {
            return (
                <div className="ui message green">
                    <div className="header">Success</div>
                    Email has been sent.
                </div>
            );
        }
    };

    return (
        <div className="ui container">
            <h1>Password Reset</h1>
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
                {errorMessage()}
                {emailSentMessage()}
                <button
                    className="ui button"
                    onClick={event => sendResetEmail(event)}
                >
                    Send Me a Reset Link
                </button>
            </form>
            <Link to="/">
                Back to Sign In Page
            </Link>
        </div>
    );
}

export default PasswordReset;