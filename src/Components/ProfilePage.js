import React, { useContext } from "react";
import { auth } from "../firebase";

import { UserContext } from "../providers/UserProvider";

const ProfilePage = () => {
    const user = useContext(UserContext);
    
    const { email } = user;

    return (
        <div>
            <div className="ui container">
                <p>{email}</p>
            </div>
            <button
                className="ui button"
                onClick={() => auth.signOut()}
            >
                Sign Out
            </button>
        </div>
    );
};

export default ProfilePage;