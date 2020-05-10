import React from "react";

import { firestore } from "../../firebase";
import { UserContext } from "../../providers/UserProvider";

class Input extends React.Component {
    static contextType = UserContext;

    // I am initializing state with an object, because I want the dates
    // and weights to be locked together.
    state = { entry: { date: "", weight: "" } };
    
    componentDidMount = () => {
        // Calculate today's date and set to default in the form
        const date = new Date();
        const today = date.toISOString().substring(0, 10);
        
        this.setState({ entry: { ...this.state.entry, date: today } });
    };

    onDateChange = event => {
        this.setState({ entry: { ...this.state.entry, date: event.target.value } });
    };

    onWeightChange = event => {
        this.setState({ entry: { ...this.state.entry, weight: event.target.value } });
    };


    // This method passes the Input (child) state into the App (parent)
    // state
    onFormSubmit = event => {
        // This prevents the page from refreshing every time something is
        // submitted
        event.preventDefault();
        
        // Check if there is a date and submit to Tracking
        if (this.state.entry.date) {
            this.props.onSubmit({...this.state.entry});

            // Submit to firestore
            console.log(this.context.email);
            firestore.collection(this.context.email).doc(this.state.entry.date).set({
                weight: this.state.entry.weight
            })

            // Reset form fields to empty
            this.setState({ entry: { date: "", weight: "" } });
        } else {
            window.alert("Please enter a date");
        }
    };

    render() {
        return (
            <div className="ui container">
                <h1>Weight Tracker</h1>
                <div className="ui form">
                    <div className="fields">
                        <form onSubmit={this.onFormSubmit} className="field">
                            <label>Date</label>
                            <input
                                type="date"
                                value={this.state.entry.date}
                                onChange={this.onDateChange}
                            />
                        </form>
                        <form onSubmit={this.onFormSubmit} className="field">
                            <label>Weight</label>
                            <input
                                type="number"
                                step="0.01"
                                value={this.state.entry.weight}
                                onChange={this.onWeightChange}
                            />
                        </form>
                    </div>
                    <div onClick={this.onFormSubmit} className="ui submit button">Submit</div>
                </div>
            </div>
        );
    }
}

export default Input;