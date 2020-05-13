import React from "react";

import Input from "./Input";
import Render from "./Render";
import { auth } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";

class Tracking extends React.Component {
    // Put context into context variable
    static contextType = UserContext;

    render() {
        return (
            <div>
                <div className="ui left vertical inverted sidebar labeled icon menu">
                    <a className="item">
                        <i
                            className="home icon"
                        ></i>
                        Weight Tracker
                    </a>
                </div>

                <div className="ui icon borderless menu">
                    <a className="item">
                        <i className="weight icon"></i>
                    </a>
                    <div className="right menu">
                        <a
                            className="ui item"
                            onClick={() => auth.signOut()}
                        >
                            Sign Out
                        </a>
                    </div>
                </div>
                <div className="ui container" style={{ marginTop: "10px" }}>
                    <Input />
                    <Render />
                </div>
            </div>
        );
    }
}

export default Tracking;